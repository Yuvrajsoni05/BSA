from django.db import models
import uuid
from   django.contrib.auth.models import AbstractUser
# Create your models here.
class AccountDetail(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('user', 'User'),
        ('shop_owner', 'Shop Owner'),
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    phone = models.IntegerField(unique=True, null=True, blank=True)
    shop_name = models.CharField(max_length=255, null=True, blank=True)
    shop_address = models.TextField(null=True, blank=True)
    middle_name = models.CharField(max_length=30, blank=True)
    
    is_email_verified = models.BooleanField(default=False)
    is_phone_verified = models.BooleanField(default=False)
    
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='shop_owner')
    
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    