from django.shortcuts import render

# Create your views here.
import json
from django.http import JsonResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
import jwt
import datetime
from .models import User, Message


def hello_world(request):
    return JsonResponse({'message' : 'Hello from Django!'})


## JWT DECODE 
def decode_jwt_token(request):
    auth_header = request.headers.get('Authorization')

    if not auth_header:
        raise Exception("Authorization header missing")

    parts = auth_header.split(' ')
    if len(parts) != 2 or parts[0] != 'Bearer':
        raise Exception("Invalid Authorization header format")

    token = parts[1]

    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise Exception("Token expired")
    except jwt.InvalidTokenError:
        raise Exception("Invalid token")



## USER
# Create new User
@csrf_exempt
def register_user(request):
    print('route hit')
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data['username']
            email = data['email']
            raw_password = data['password']

            hashed_password = make_password(raw_password)

            user = User.objects.create(username=username, email=email, password=hashed_password)

            payload = {
                'user_id': user.id,
                'username': user.username,
                'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(seconds=settings.JWT_EXP_DELTA_SECONDS)
            }
            token = jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)

            return JsonResponse({'message' : 'User created successfully', 'user_id' : user.id, 'token' : token}, status=201)
        
        except KeyError:
            return JsonResponse({'error' : 'Missing required fields'}, status=400)
        except Exception as e:
            return JsonResponse({'error' : str(e)}, status=500)
    
    else:
        return JsonResponse({'error' : 'Only POST method allowed'}, status=405)
    

# Logs in existing user
@csrf_exempt
def login_user(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            input_username = data.get('username')
            input_password = data.get('password')

            if (not input_username) or (not input_password):
                return JsonResponse({'error' : 'Please provide User Name and Password'}, status=400)
            
            try: 
                found_user = User.objects.get(username=input_username)
            except User.DoesNotExist:
                return JsonResponse({'error' : 'User Not Found'}, staus=404)
            
            if not check_password(input_password, found_user.password):
                return JsonResponse({'error' : 'Password incorrect'}, status=401)
            
            payload = {
                'user_id': found_user.id,
                'username': found_user.username,
                'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(seconds=settings.JWT_EXP_DELTA_SECONDS)
            }
            token = jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
            
            return JsonResponse({'message' : 'User Logged In Successfully', 'token' : token}, status=200)
            
        except json.JSONDecodeError:
            return JsonResponse({'error' : 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error' : str(e)}, status=500)
        
    else:
        return JsonResponse({'error' : 'Only POST method allowed'}, status=405)
    
# Finds User By id
@csrf_exempt
def find_user(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            input_id = data.get('id')

            if not input_id:
                return JsonResponse({'error' : 'Please Provide an ID'}, status=400)
            
            try:
                found_user = User.objects.get(email=input_id)
            except User.DoesNotExist:
                return JsonResponse({'error' : 'User Not Found'}, status=404)
            
            return JsonResponse({
                'message' : 'User found',
                'data': {
                    "id" : found_user.id,
                    "username": found_user.username,
                    'email': found_user.email
                }
            }, status=201)
        
        except json.JSONDecodeError:
            return JsonResponse({'error' : 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error' : str(e)}, status=500)
        
    else:
        return JsonResponse({'error' : 'Only POST method allowed'}, status=405)
    
    ## find user by user name
@csrf_exempt
def find_username(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            input_username = data.get('username')

            if not input_username:
                return JsonResponse({'error' : 'Please Provide Username'}, status=400)
            
            matched_users = User.objects.filter(username__icontains=input_username).order_by('username')[:5]

            if not matched_users.exists():
                return JsonResponse({'error' : 'No users found'}, status=404)
            
            user_data = [{'id': user.id, 'username': user.username} for user in matched_users]

            return JsonResponse({'message' : 'Users found', 'data' : user_data }, status=200)
        
        except json.JSONDecodeError:
            return JsonResponse({'error' : 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error' : str(e)}, status=500)
        
    else:
        return JsonResponse({'error' : 'Only POST method allowed'}, status=405)
    
@csrf_exempt
def send_friend_request(request):
    if request.method == "POST":
        try:
            payload = decode_jwt_token(request)
            sender_id = payload.get('user_id')

            data = json.loads(request.body)
            receiver_id = data.get('receiver_id')

            if not receiver_id:
                return JsonResponse({'error' : 'Please provide reciever_id'}, status=400)
            
            try:
                sender = User.objects.get(id=sender_id)
                receiver = User.objects.get(id=receiver_id)
            except User.DoesNotExist:
                return JsonResponse({'error' : 'Invalid sender or receiver user'}, status=404)
            
            if sender == receiver:
                return JsonResponse({'error' : 'Cannot send friend request to yourself'}, status=400)
            
            if sender in receiver.friend_requests.all():
                return JsonResponse({'error' : 'Friend request already sent'}, status=400)
            
            if sender in receiver.friends.all():
                return JsonResponse({'error' : 'User is already your friend'}, status=400)
            
            receiver.friend_requests.add(sender)
            receiver.save()

            return JsonResponse({'message' : 'Friend request sent'}, status=200)
        
        except json.JSONDecodeError:
            return JsonResponse({'error' : 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error' : str(e)}, status=500)
        
    else: 
        return JsonResponse({'error' : 'Only POST method allowed'}, status=405)
    
    # Accept the friend request
@csrf_exempt
def accept_friend_request(request):
    if request.method == "POST":
        try:
            payload = decode_jwt_token(request)
            sender_id = payload.get("user_id")
            print('sender id ', sender_id)
            data = json.loads(request.body)
            receiver_id = data.get("receiver_id")

            if not receiver_id:
                return JsonResponse({"error" : "No Reciever_id"}, status=400)
            
            try:
                sender = User.objects.get(id=sender_id)
                receiver = User.objects.get(id=receiver_id)
            except User.DoesNotExist:
                return JsonResponse({'error' : 'No sender or receiver'}, status=404)
            
            if sender == receiver:
                return JsonResponse({'error' : 'Cannot send friend requests to self'}, status=400)
            
            if sender in receiver.friends.all():
                return JsonResponse({'error' : 'User already Friend'}, status=400)
            
            if sender in receiver.friend_requests.all():
                receiver.friend_requests.remove(sender)
            
            receiver.friends.add(sender)
            sender.friends.add(receiver)

            receiver.save()
            sender.save()

            return JsonResponse({'message' : f"{sender.username} is now friends with {receiver.username}"})
        
        except json.JSONDecodeError:
            return JsonResponse({'error' : 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error' : str(e)}, status=500)

    else:
        return JsonResponse({'error' : 'Only Post method allowed'}, status=405)
    
    # Delete Friend Request // make sure accept friend request triggers this also 
@csrf_exempt
def delete_friend_request(request):
    if request.method == "DELETE":
        try:
            payload = decode_jwt_token(request)
            user_id = payload.get("user_id")
            data = json.loads(request.body)
            sender_id = data.get("sender_id")

            if not sender_id:
                return JsonResponse({"error" : "No sender id"}, status= 400)

            try:
                user = User.objects.get(id=user_id)
                sender = User.objects.get(id=sender_id)
            except User.DoesNotExist:
                return JsonResponse({"error" : "User not found"}, status=404)
        
            if sender not in user.friend_requests.all():
                return JsonResponse({"error" : "No friend request found"}, status=400)
            
            user.friend_requests.remove(sender)
            user.save()


            return JsonResponse({'message' : f"Friend request from {sender.username} deleted"})
        
        except json.JSONDecodeError:
            return JsonResponse({"error" : "Invalid json"}, status=400)
        except Exception as e:
            return JsonResponse({"error" : str(e)}, status=500)
    else: 
        return JsonResponse({'error' : 'Only DELETE methog allowed'}, status=405)
    
    # get all the friend request the user has already sent
@csrf_exempt
def get_sent_friend_requests(request):
    if request.method == "GET":
        try:
            payload = decode_jwt_token(request)
            user_id = payload.get('user_id')

            if not user_id:
                return JsonResponse({ "error" : "Invalid token" }, status=401)
            
            user = User.objects.get(id=user_id)
           
            from_user_ids = list(User.objects.filter(friend_requests=user).values_list('id', flat=True))

            return JsonResponse({ "from_user_ids": from_user_ids}, status=200)

        
        except Exception as e:
            return JsonResponse({ "error" : "couldnt get friends requests"}, status=500)
    else: 
        return JsonResponse({ 'error' : "Only GET method allowed" }, status=405)
    

    # Get all the friend request sent to the user that is logged in/has a token
@csrf_exempt
def get_friend_requests(request):
    if request.method == "GET":
        try:
            payload = decode_jwt_token(request)
            user_id = payload.get('user_id')
            user = User.objects.get(id=user_id)

            requests = user.friend_requests.all()
            request_data = [{'id' : u.id, 'username': u.username} for u in requests]

            return JsonResponse({'friend_requests' : request_data}, status=200)
        
        except Exception as e:
            return JsonResponse({'error' : str(e)}, status=500)
        
    else:
        return JsonResponse({'error' : 'Only GET method allowed'}, status=405)
    
# Get all Friends 
@csrf_exempt
def get_all_friends(request):
    if request.method == "GET":
        try:
            payload = decode_jwt_token(request)
            user_id = payload.get('user_id')
            user = User.objects.get(id=user_id)

            requests = user.friends.all()
            request_data = [{'id' : u.id, 'username' : u.username} for u in requests]

            return JsonResponse({'Friends' : request_data}, status=200)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only GET method allowed'}, status=405 )
    

## MESSAGES
# Create New Message
@csrf_exempt
def create_message(request):
    if request.method == 'POST':
        try:
            payload = decode_jwt_token(request)
            sender_id = payload.get('user_id')

            data = json.loads(request.body)
            receiver_id = data.get('receiver_id')
            body = data.get('body')
            print(receiver_id, sender_id, body)

            if not receiver_id or not body:
                return JsonResponse({'error' : 'Please Provide recever_id and message body'}, status=400)
            
            try: 
                sender = User.objects.get(id=sender_id)
                receiver = User.objects.get(id=receiver_id)
            except User.DoesNotExist:
                return JsonResponse({'error' : 'Invalid sender or receiver user'}, status=404)
            
            message = Message.objects.create(
                sender_id=sender,
                receiver_id=receiver,
                body=body
            )

            return JsonResponse({
                'message' : 'Message sent',
                'data' : {
                    'sender' : sender.username,
                    'receiver' : receiver.username,
                    'body' : message.body,
                    'timestamp' : message.timestamp.strftime("%Y-%m-%d %H:%M:%S")
                }
            }, status=201)
        
        except json.JSONDecodeError:
            return JsonResponse({'error' : 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error' : str(e)}, status=500)
        
    else:
        return JsonResponse({'error' : 'Only POST method allowed'}, status=405)
    
# Get Messages from and to a User by id 
@csrf_exempt
def get_messages(request, friend_id):
    if request.method == 'GET':
        try:
            payload = decode_jwt_token(request)
            user_id = payload.get('user_id')

            if not friend_id:
                return JsonResponse({"error" : "No friend id"}, status=400)
            
            request_data = list(Message.objects.filter(sender_id=user_id, receiver_id=friend_id).values())
            
            return JsonResponse({'Messages' : request_data}, status=200)
            

        except json.JSONDecodeError:
            return JsonResponse({'error' : 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error' : str(e)}, status=500)
    else:
        return JsonResponse({'error' : 'Only Get method allowd'}, status=405)