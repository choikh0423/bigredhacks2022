from django.contrib.auth.models import User, Group
from rest_framework import serializers
from datetime import datetime

class UserSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = User
        # Tuple of serialized model fields (see link [2])
        fields = ( "email", "password", )
    


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']