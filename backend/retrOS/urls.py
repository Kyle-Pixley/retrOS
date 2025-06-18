from django.urls import path
from . import views

urlpatterns = [
    path('hello/', views.hello_world),
    path('api/register/', views.register_user),
    path('api/login/', views.login_user),
    path('api/finduser/', views.find_user),
]

