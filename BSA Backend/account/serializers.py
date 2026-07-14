from rest_framework import serializers
from .models import AccountDetail






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
    
    