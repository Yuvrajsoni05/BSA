from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import RegisterSerializer
from rest_framework.generics import GenericAPIView
# Create your views here.
class RegisterView(GenericAPIView):
    serializer_class  = RegisterSerializer
    
    
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully."}, status=201)
        return Response(serializer.errors, status=400)
    
    
    