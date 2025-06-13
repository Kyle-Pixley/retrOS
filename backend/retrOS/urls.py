from django.urls import path
from .views import register_user
from . import views

urlpatterns = [
    path('hello/', views.hello_world),
    path('api/register/', register_user),
]

