from rest_framework import serializers
from .models import AccountDetail

from django.contrib.auth import authenticate
from rest_framework.serializers import ModelSerializer
from django.db import models
from rest_framework.generics import GenericAPIView

from rest_framework_simplejwt.tokens import RefreshToken
# from BSA.BSA Backend.account.serializers import ProfileSerializer


# class AccountDetailSerializer(serializers.ModelSerializer):
    # confirm_password = serializers.CharField(write_only=True, required=True)
    # class Meta:

    #     model = AccountDetail
    #     fields = ['id', 'username', 'email', 'phone', 'shop_name', 'shop_address', 'middle_name', 'is_email_verified',  'is_phone_verified', 'role', 'profile_picture', 'created_at', 'updated_at' , 'confirm_password' ,'password']

class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = AccountDetail
        fields = ['first_name','middle_name','last_name','username','email','phone','shop_name','shop_address','profile_picture','role','password','confirm_password']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data
    


    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = AccountDetail.objects.create_user(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class RegisterSerializerShop(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = AccountDetail
        fields = ['first_name','middle_name' , 'last_name', 'username','email' ,'phone','shop_name' ,'shop_address','profile_picture','password','confirm_password']
    
    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = AccountDetail.objects.create_user(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        user = authenticate(
            username=data.get("username"),
            password=data.get("password")
        )

        if user is None:
            raise serializers.ValidationError({
                "detail": "Invalid username or password."
            })

        data["user"] = user
        return data


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    
    def validate(self, attrs):
        self.token = attrs["refresh"]
        return attrs
    def save(self):
        try:
            RefreshToken(self.token).blacklist()
        except Exception as e:
            print("Logout Error:", e)
            raise serializers.ValidationError({
                "refresh": str(e)
            })


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountDetail
        fields = [
            'id','username','first_name','last_name','email','phone_number','role','profile_picture'
            
        ]

class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountDetail
        fields = [
            "first_name",
            "middle_name",
            "last_name",
            "phone",
            "shop_name",
            "shop_address",
            "profile_picture",
        ]



class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)

    def validate(self, data):
        user = self.context['request'].user
        if not user.check_password(data['old_password']):
           raise serializers.ValidationError("Incorrect old password.")
        if data['new_password'] != data['confirm_password']:
           raise serializers.ValidationError("Passwords do not match.")
        return data
        


    
    