from django.contrib import admin
from django.urls import path,include,re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from files.views import DownloadPDF
from .views import GoogleLogin,Feedbackform,Contactform

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/',include('djoser.urls')),
    path('auth/',include('djoser.urls.jwt')),
    path('rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
    path('api/', include('files.urls')),
    path('download/', DownloadPDF, name='download_pdf'),
    path('feedback/',Feedbackform.as_view(),name='feedback'),
    path('contactus/',Contactform.as_view(),name='contactus'),
]

#urlpatterns += [re_path(r'^.*',TemplateView.as_view(template_name='index.html'))]
#urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

