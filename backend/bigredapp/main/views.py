from django.shortcuts import render 
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from main.serializers import UserSerializer, CreateUserSerializer, GroupSerializer
from rest_framework.decorators import action
from rest_framework.response import Response


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    permission_classes = [permissions.IsAuthenticated]

    
    def get_serializer_class(self):
        if self.action == "get_current_user":
            return UserSerializer
        elif self.action == "create_user":
            return CreateUserSerializer
        return CreateUserSerializer

    @action(detail=False, methods=['get'])
    def get_current_user(self, request):
        """
        Get Current User
        """
        print(request.GET)
        user = User.objects.get(email=request.GET['email'])
        serializer = self.get_serializer(user)

        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def create_user(self, request):
        """
        Create New User (no duplicate email)
        """
        user_email, user_password = request.POST['email'], request.POST['password']

        username = user_email.split('@')[0]

        user = User.objects.create_user(username=username,
                                 email=user_email,
                                 password=user_password)
                                
        serializer = self.get_serializer(user)
        return Response(serializer.data)

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]