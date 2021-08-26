from django.contrib import admin
from .models import Sliders
from django.contrib.auth.admin import UserAdmin
from files.models import File,FeedBack,ContactUs

class FileInline(admin.TabularInline):
	model=File
	extra=0
class FeedBackInline(admin.TabularInline):
	model=FeedBack
	extra=0
class ContactUsInline(admin.TabularInline):
	model=ContactUs
	extra=0
class UserAdminConfig(UserAdmin):
	search_fields=('email','first_name','last_name','phone')
	list_filter=('email','is_active','is_staff','first_name')
	ordering=('-register_date',)
	list_display=('email','first_name','last_name','phone','is_active','is_staff')
	fieldsets=(
		(None,{'fields':('email','first_name','last_name')}),
		('Permissions',{'fields':('is_staff','is_active')}),
		('Personal',{'fields':('phone','category','country','register_date')})
	)
	add_fieldsets=(
		(None,{
			'classes':('wide',),
			'fields':('email','first_name','last_name','password1','password2','is_active','is_staff')
			}),

	)
	inlines = [
       FileInline,
       FeedBackInline,
       ContactUsInline,
    ]

admin.site.register(Sliders,UserAdminConfig)
