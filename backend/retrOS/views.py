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
from .models import User


def hello_world(request):
    return JsonResponse({'message' : 'Hello from Django!'})

## USER
# Create new User
@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data['username']
            email = data['email']
            raw_password = data['password']

            hashed_password = make_password(raw_password)

            user = User.objects.create(username=username, email=email, password=hashed_password)

            return JsonResponse({'message' : 'User created successfully', 'user_id' : user.id}, status=201)
        
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
            
            return JsonResponse({'message' : 'User Logged In Successfully', 'token' : token}, status=201)
            
        except json.JSONDecodeError:
            return JsonResponse({'error' : 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error' : str(e)}, status=500)
        
    else:
        return JsonResponse({'error' : 'Only POST method allowed'}, status=405)