from django.shortcuts import render 
from django.contrib.auth.models import User, Group

from .serializers import ApartmentSerializer
from .models import Apartment, LeaseData, Statistics
from .choices import LEASE_TERM_CHOICES
from rest_framework import viewsets
from rest_framework import permissions
from main.serializers import UserSerializer, CreateUserSerializer, GroupSerializer, StatisticsSerializer
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

class ApartmentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Apartments to be viewed or edited.
    """
    queryset = Apartment.objects.all()
    serializer_class = ApartmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['get'])
    def get_apartment_info(self, request, pk):

        if "flat_type" in request.GET:
            flat_type = request.GET['flat_type']
            print(flat_type)

        apartment = Apartment.objects.get(pk=pk)
        serializer = self.get_serializer(apartment)
        response_dict = {}
        response_dict.update(serializer.data)

        stat = Statistics.objects.get(apartment=pk, flat_type=flat_type).__dict__
        response_dict['one_year_data'] = stat['one_year_data']
        response_dict['two_year_data'] = stat['two_year_data']
        response_dict['three_year_data'] = stat['three_year_data']

        print(LEASE_TERM_CHOICES[0])
        lease_data = LeaseData.objects.all().filter(apartment=pk, flat_type=flat_type, lease_term=LEASE_TERM_CHOICES[0][0])

        price_sum = 0
        for lease in lease_data:
            lease_dict = lease.__dict__
            price_sum += lease_dict["price"]
        
        current_average_price = price_sum / len(lease_data)

        response_dict['current_price_data'] = current_average_price

        
        
        return Response(response_dict)

    @action(detail=True, methods=['get'])
    def get_lease_info(self, request, pk):
        pass
