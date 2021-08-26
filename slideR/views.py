from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from files.models import FeedBack,ContactUs
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from .settings import EMAIL_HOST_USER
from django.core.mail import send_mail
from rest_auth.registration.serializers import SocialLoginSerializer
from allauth.socialaccount.providers.oauth2.client import OAuth2Client


user=get_user_model()
class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client
    serializer_class = SocialLoginSerializer

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)

class Feedbackform(APIView):
    def post(self, request, format=None, *args, **kwargs):
        print(request.data)
        client=user.objects.get(id=request.user.id)
        message=request.data['message']
        email=client.email
        first_name=client.first_name
        last_name=client.last_name
        try:
            FeedBack.objects.create(user=client,email=email,message=message,first_name=first_name,last_name=last_name)
            send_mail(
                    subject='FeedBack',
                    message='Your FeedBack has been recorded . Thank you',
                    from_email=EMAIL_HOST_USER,
                    recipient_list=[email],
                    fail_silently=False,
            )
            return Response("Your FeedBack is successfully recorded.[^_^]",status=status.HTTP_201_CREATED)
        except:
            return Response("something went wrong, please check if user is logged in",status=status.HTTP_400_BAD_REQUEST)

class Contactform(APIView):
    def post(self, request, format=None, *args, **kwargs):
        print(request.data)
        client=user.objects.get(id=request.user.id)
        message=request.data['message']
        email=client.email
        first_name=client.first_name
        last_name=client.last_name
        try:
            ContactUs.objects.create(user=client,email=email,message=message,first_name=first_name,last_name=last_name)
            send_mail(
                    subject='Contact Us',
                    message='Thank you for reaching us. Your request will be processed .',
                    from_email=EMAIL_HOST_USER,
                    recipient_list=[email],
                    fail_silently=False,
            )
            return Response("Your Response is successfully recorded.[^_^]",status=status.HTTP_201_CREATED)
        except:
            return Response("something went wrong, please check if user is logged in",status=status.HTTP_400_BAD_REQUEST)



