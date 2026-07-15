from .views import RegisterView,LoginView,RegisterSerializerShopView,ProfileView,LogoutView
from django.urls import path

# from BSA.BSA Backend.account.views import ProfileView
urlpatterns = [

    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("register/shop/",RegisterSerializerShopView.as_view(),name='register_shop'),
    path("profile/",ProfileView.as_view(),name='profile-view') ,
    path("logout/",LogoutView.as_view(),name='logout')

    
    
 ]
