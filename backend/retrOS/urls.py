from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello_world),
    path('api/register/', views.register_user),
    path('api/login/', views.login_user),
    path('api/finduser/', views.find_user),
    path('api/findusername/', views.find_username),
    path('api/send_friend_request/', views.send_friend_request),
    path('api/get_friend_requests/', views.get_friend_requests),
    path('api/accept_friend_request/', views.accept_friend_request),
    path('api/delete_friend_request/', views.delete_friend_request),
    path('api/get_all_friends/',views.get_all_friends),
    path('api/create_message/', views.create_message),
]

