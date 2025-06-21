from django.db import models

# Create your models here.
# User Model
class User(models.Model):
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    friends = models.ManyToManyField('self', blank=True)
    friend_requests = models.ManyToManyField('self', blank=True)

    def __str__(self):
        return self.username
    
# Message Model
class Message(models.Model):
    sender_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiver_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recieved_messages')
    id_read = models.BooleanField(default=False)
    body = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"From {self.sender} to {self.receiver} at {self.timestamp}"