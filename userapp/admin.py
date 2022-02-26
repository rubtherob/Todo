from django.contrib import admin

# Register your models here.
from userapp.models import User

admin.site.register(User)