from django.http.response import JsonResponse
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework import status
from rest_framework import generics
from django.contrib.auth import get_user_model

from .models import Department,Category,File,FileCategory,FileDepartment

from .serializers import FileSerializer,FileCategorySerializer,FileDepartmentSerializer,CategorySerializer,DepartmentSerializer,GetUserFiles,ProfileSerializer

@api_view(['GET', 'POST'])
def home(request):
    return Response({"data": "hello world"})


class UploadFileView(APIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def post(self, request, format=None, *args, **kwargs):
        print(request.data)
        document=request.data['document']
        name=request.data['name']
        author=request.user
        print(author)
        #try:
        f=File.objects.create(document=document,name=name,author=author)
        #except:
        #return Response("unable to upload file", status=status.HTTP_400_BAD_REQUEST)
        catdata={}
        hashtags=request.data['hashtags'].split(",")
        departments=request.data['department'].split(",") 
        hashtags=list(set(hashtags))
        departments=list(set(departments))
        print(hashtags)
        print(departments)
        for i in range(len(hashtags)):
            print(hashtags[i])
            cat=Category.objects.get(name=hashtags[i].strip())
            print(cat)
            try:
                c=FileCategory.objects.create(file=f,category=cat)
            except:
                return Response("some problem at file category",status=status.HTTP_400_BAD_REQUEST)

        depdata={}
        for i in range(len(departments)):
            depart=Department.objects.get(name=departments[i].strip())
            try:
                d=FileDepartment.objects.create(file=f,department=depart)
            except:
                return Response("some problem in file department",status=status.HTTP_400_BAD_REQUEST)
        return Response("successfully uploaded",status=status.HTTP_201_CREATED)

#class FileDetailsView(generics.RetrieveAPIView):
#    queryset=File.objects.get(id=pk)
#    serializer_class=FileSerializer

class FilesView(generics.ListAPIView):
    def post(self,request,format=None, *args, **kwargs):
        order_by=request.data['order_by']
        page_factor=int(request.data['page_factor'])
        page_number=int(request.data['page_number'])
        if(page_factor==0):
            query_set=File.objects.order_by(order_by)
            fileset=FileSerializer(query_set,many=True)
            return Response(fileset.data)
        base_index=(page_number-1)*page_factor
        end_index=(page_number)*page_factor
        length=File.objects.all().count()
        if(base_index<length):
            if(end_index<=length):   
                query_set=File.objects.order_by(order_by)[(page_number-1)*page_factor:(page_number)*page_factor]
                fileset=FileSerializer(query_set,many=True)
                return Response(fileset.data)
            query_set=File.objects.order_by(order_by)[(page_number-1)*page_factor:(page_number)*page_factor]
            fileset=FileSerializer(query_set,many=True)
            return Response(fileset.data)
        response="There are only "+str(length)+" files upto "+str((length//page_number)+1)+" pages"
        return Response(response)
class CategoryView(generics.ListAPIView):
    queryset=Category.objects.order_by("name")
    serializer_class=CategorySerializer
class DepartmentView(generics.ListAPIView):
    queryset=Department.objects.order_by("name")
    serializer_class=DepartmentSerializer
class GetCategoryView(APIView):
    def post(self,request,format=None, *args, **kwargs):
        name=request.data['category']
        catset=FileCategory.objects.filter(category__name=name)
        l=[]
        for i in catset:
            l.append(i.fileid())
        query_set=File.objects.filter(id__in=l)
        fileset=FileSerializer(query_set,many=True)
        return Response(fileset.data)
class GetDepartmentView(APIView):
    def post(self,request,format=None, *args, **kwargs):
        name=request.data['department']
        depset=FileDepartment.objects.filter(department__name=name)
        l=[]
        for i in depset:
            l.append(i.fileid())
        query_set=File.objects.filter(id__in=l)
        fileset=FileSerializer(query_set,many=True)
        return Response(fileset.data)

@api_view(['GET'])
def GetUploadedFiles(request):
        user=get_user_model()
        query_set=user.objects.get(id=request.user.id)
        fileset=GetUserFiles(query_set)
        return Response(fileset.data['files'])

@api_view(['GET'])
def GetUserData(request):
        user=get_user_model()
        print(request.user)
        query_set=user.objects.get(id=request.user.id)
        UserInfo=ProfileSerializer(query_set)
        return Response(UserInfo.data)




@api_view(['POST'])
def DownloadPDF(self,request):
    path_to_file =MEDIA_ROOT+request.data['filename']
    f = open(path_to_file, 'rb')
    pdfFile = File(f)
    response = HttpResponse(pdfFile.read())
    response['Content-Disposition'] = 'inline'
    return response


