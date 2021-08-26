from django.urls import path
from .views import home, UploadFileView,FilesView,CategoryView,DepartmentView,GetCategoryView,GetDepartmentView,GetUserData,GetUploadedFiles #,FileDetailsView

urlpatterns = [
    path('', home, name="home"),
    path('upload/', UploadFileView.as_view(), name="upload"),
    path('files/',FilesView.as_view(),name="recent"),
    path('category/',CategoryView.as_view(),name='category'),
    path('department/',DepartmentView.as_view(),name='department'),
    path('getcategory/',GetCategoryView.as_view(),name='getcategory'),
    path('getdepartment/',GetDepartmentView.as_view(),name='getdepartment'),
    path('userdata/',GetUserData,name='userdata'),
    path('uploadedfiles/',GetUploadedFiles,name='uploadedfiles'),
    #path('details/<str:pk>',FileDetailsView.as_view(),name="filedetails"),
]