from django.db import models
from rest_framework import serializers
from .models import File,Department,Category,FileDepartment,FileCategory
from django.contrib.auth import get_user_model

User=get_user_model()

class FileCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=FileCategory
        fields=['file','category']

class FileDepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=FileDepartment
        fields=['file','department']

class FileSerializer(serializers.ModelSerializer):
    filecat=FileCategorySerializer(many=True)
    filedep=FileDepartmentSerializer(many=True)
    class Meta:
        model = File
        fields = ['document','name','filedep','filecat']
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields=['name']
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Department
        fields=['name']
class GetUserFiles(serializers.ModelSerializer):
    files=FileSerializer(many=True)
    class Meta:
        model=User
        fields=['files']
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['email','first_name','last_name','phone','country','category']