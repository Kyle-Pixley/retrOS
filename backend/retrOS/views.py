from django.shortcuts import render

# Create your views here.
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from .models import User


def hello_world(request):
    return JsonResponse({'message' : 'Hello from Django!'})

@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data['username']
            email = data['email']
            raw_password = data['password']

            hashed_password = make_password(raw_password)

            user = User.objects.create(username=username, email=email, password=raw_password)

            return JsonResponse({'message' : 'User created successfully', 'user_id' : user.id}, status=201)
        
        except KeyError:
            return JsonResponse({'error' : 'Missing required fields'}, status=400)
        except Exception as e:
            return JsonResponse({'error' : str(e)}, status=500)
    
    else:
        return JsonResponse({'error' : 'Only POST method allowed'}, status=405)