from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),  # Root URL
    path('home/', views.home_view, name='home'),  # /home/ URL
    path('chat/', views.chat_view, name='chat'),
    path('about/', views.about_view, name='about'),
    path('images/', views.images_view, name='images'),
] 