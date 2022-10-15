from django.contrib.auth.models import User, Group
from .models import Apartment, Statistics
from rest_framework import serializers
from datetime import datetime

class UserSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = User
        # Tuple of serialized model fields (see link [2])
        fields = [ "email", "username"]
    
class CreateUserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        # Tuple of serialized model fields (see link [2])
        fields = [ "email", "password", ]

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class ApartmentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Apartment
        fields = ['name', 'address', 'rating', 'number_of_reviews', 'gym', 'laundry', 'free_wifi_router', 'free_electricity' ]

class StatisticsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Statistics
        field = ["one_year_data", "two_year_data", "three_year_data"]