from django.contrib import admin
from .models import File,Department,Category,FileDepartment,FileCategory,FeedBack,ContactUs

class CategoryInLine(admin.TabularInline):
    model = FileCategory
    extra = 0

class DepartmentInLine(admin.TabularInline):
    model = FileDepartment
    extra = 0

class FileAdmin(admin.ModelAdmin):
    search_fields=('id','document','name','uploaded_at','author')
    list_filter=('uploaded_at','author')
    ordering=('-uploaded_at','name')
    list_display=('id','document','name','uploaded_at','author')
    inlines = [
        CategoryInLine,
        DepartmentInLine,
    ]
class DepartmentAdmin(admin.ModelAdmin):
    search_fields=('name',)
    ordering=('name',)
    list_display=('name',)
    inlines=[
        DepartmentInLine,
    ]
class CategoryAdmin(admin.ModelAdmin):
    search_fields=('name',)
    ordering=('name',)
    list_display=('name',)
    inlines=[
        CategoryInLine,
    ]
class FileCategoryAdmin(admin.ModelAdmin):
    search_fields=('id','file__name','category__name','file__id')
    list_filter=('category__name','file__uploaded_at')
    list_display=('id','file','category','date_uploaded')
    ordering=('category','file','id')
    def date_uploaded(self,obj):
        return obj.file.uploaded_at
class FileDepartmentAdmin(admin.ModelAdmin):
    search_fields=('id','file__name','department__name','file__id')
    list_filter=('department__name','file__uploaded_at')
    list_display=('id','file','department','date_uploaded')
    ordering=('id','department','file')
    def date_uploaded(self,obj):
        return obj.file.uploaded_at
class FeedBackAdmin(admin.ModelAdmin):
    search_fields=('email','first_name','last_name','message')
    list_display=('id','email','first_name','message','time')
    ordering=('id','email','first_name')
    list_filter=('email','time')

class ContactUsAdmin(admin.ModelAdmin):
    search_fields=('email','first_name','last_name','message')
    list_display=('id','email','first_name','message','time')
    ordering=('id','email','first_name')
    list_filter=('email','time')




admin.site.register(File,FileAdmin)
admin.site.register(Department,DepartmentAdmin)
admin.site.register(Category,CategoryAdmin)
admin.site.register(FileDepartment,FileDepartmentAdmin)
admin.site.register(FileCategory,FileCategoryAdmin)
admin.site.register(FeedBack,FeedBackAdmin)
admin.site.register(ContactUs,ContactUsAdmin)