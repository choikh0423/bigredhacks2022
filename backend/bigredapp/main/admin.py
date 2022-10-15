from tracemalloc import Statistic
from django.contrib import admin
from .models import Apartment, LeaseData, Statistics

# Register your models here.
admin.site.register(Apartment)
admin.site.register(LeaseData)
admin.site.register(Statistics)