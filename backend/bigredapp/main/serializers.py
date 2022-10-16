from django.contrib.auth.models import User, Group
from .models import Apartment, LeaseData, Statistics
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

class ApartmentGeneralSerializer(serializers.Serializer):
    pk = serializers.CharField()
    aptName = serializers.CharField()
    rooms = serializers.IntegerField()
    address = serializers.CharField()
    price = serializers.IntegerField()

    class Meta:
        model = Apartment
        fields = ['pk', 'name', 'address', ]

class ApartmentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Apartment
        fields = ['pk', 'name', 'address', 'rating', 'number_of_reviews', 'gym', 'laundry', 'free_wifi_router', 'free_electricity' ]

class LeaseDataSerializer(serializers.Serializer):
    # initialize fields
    contract_date = serializers.DateField()
    lease_term = serializers.CharField()
    lease_type = serializers.CharField()
    price = serializers.IntegerField()