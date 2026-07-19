from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import RegisterSerializer,LoginSerializer,RegisterSerializerShop,ProfileSerializer,LogoutSerializer,ProfileUpdateSerializer,ChangePasswordSerializer
from rest_framework.generics import GenericAPIView
from rest_framework.serializers import Serializer
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.permissions import IsAuthenticated
from django.template.context_processors import request
# Create your views here.


class RegisterView(GenericAPIView):
    serializer_class  = RegisterSerializer
    
    
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully."}, status=201)
        return Response(serializer.errors, status=400)
    

    
class RegisterSerializerShopView(GenericAPIView):
    serializer_class = RegisterSerializerShop
    def post(self,request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            return Response({
                "message": "You are successfully registered",
                "user": {
                    "username": user.username,
                    "shop_name":user.shop_name
                }
            })

        return Response(serializer.errors, status=400)
        return Response(serializer.errors,status=400)
            
class LoginView(GenericAPIView):
    serializer_class = LoginSerializer
    
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            return Response({"message": "Login successful.", "user":{
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "phone": user.phone,
                "shop_name": user.shop_name,
                "shop_address": user.shop_address,
                "middle_name": user.middle_name,
            
            }, 
                             "token":{
                                 "refresh": str(refresh),
                                 "access": str(refresh.access_token)
                             }}, status=200)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
    
class ProfileView(GenericAPIView):
    serializer_class = ProfileSerializer
    permission_classes  = [IsAuthenticated]
    def get(self,request):
        return Response({
            "user":{
                "id" : request.user.id,
                "username":request.user.username,
                "email":request.user.email,
                "first_name":request.user.first_name,
                "middle_name":request.user.middle_name,
                "last_name":request.user.last_name,
                "phone":request.user.phone,
                "shop_name":request.user.shop_name,
                "shop_address":request.user.shop_address,
                "profile_picture": (
                    request.user.profile_picture.url
                    if request.user.profile_picture
                    else None),
                

                
            }
        })
class ProfileUpdate(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileUpdateSerializer
    def patch(self,request):
        serializer = self.get_serializer(
            request.user,
            data = request.data,
            partial = True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {
                'message':"Profile Update successfully",
                "user": serializer.data
            },
         
        )
        
class ChangePasswordView(GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer

    def patch(self,request):
        serializers = self.get_serializer(data=request.data)
        serializers.is_valid(raise_exception=True)
        user = request.user
        user.set_password(serializers.validated_data['new_password'])
        user.save()
        return Response({
            "message":"Password changed successfully"
        })

        
class LogoutView(GenericAPIView):
    serializer_class =LogoutSerializer
    permission_classes = [IsAuthenticated]
    
    def post(self,request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response({"message":"Logout Successfully"})
        
    