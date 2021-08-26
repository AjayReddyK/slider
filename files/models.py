from django.db import models
from multiselectfield import MultiSelectField
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _ 

User=get_user_model()
class File(models.Model):
    document = models.FileField(upload_to="documents/")
    name=models.CharField(max_length=300)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    author=models.ForeignKey(User,related_name='files',default=None,on_delete=models.CASCADE)
    def __str__(self):
        return "FileId="+str(self.id)+"  name="+self.name
    def __unicode__(self):
        return u'FileID: %s, name-%s, document-%s, uploaded_at-%s' % (str(self.pk), str(self.name),self.document,self.uploaded_at)

class Category(models.Model):
    name=models.CharField(max_length=30,primary_key=True)
    def __str__(self):
        return self.name

class Department(models.Model):
    name=models.CharField(max_length=100,primary_key=True)
    def __str__(self):
        return self.name

class FileDepartment(models.Model):
    file=models.ForeignKey(File,related_name='filedep',on_delete=models.CASCADE)
    department=models.ForeignKey(Department,related_name='dep',on_delete=models.CASCADE)
    def __str__(self):
        return str(self.file)+"  "+self.department.name
    def fileid(self):
        return self.file.id


class FileCategory(models.Model):
    file=models.ForeignKey(File,related_name='filecat',on_delete=models.CASCADE)
    category=models.ForeignKey(Category,related_name='cat',on_delete=models.CASCADE)
    def __str__(self):
        return str(self.file)+"  "+self.category.name
    def fileid(self):
        return self.file.id

class FeedBack(models.Model):
    user=models.ForeignKey(User,related_name='feedback',default=None,on_delete=models.CASCADE)
    email=models.EmailField(_('email address'))
    first_name=models.CharField(max_length=100)
    message=models.CharField(max_length=2000)
    last_name=models.CharField(max_length=100)
    time=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.message[:50]+"...."

class ContactUs(models.Model):
    user=models.ForeignKey(User,related_name='contactus',default=None,on_delete=models.CASCADE)
    email=models.EmailField(_('email address'))
    first_name=models.CharField(max_length=100)
    message=models.CharField(max_length=2000)
    last_name=models.CharField(max_length=100)
    time=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.message[:50]+"...."






