from django.shortcuts import render 
from django.contrib.auth.models import User, Group
import json
from django.http import Http404

from django.core import serializers

from .serializers import ApartmentSerializer
from .models import Apartment, LeaseData, Statistics
from .choices import FLAT_TYPE_CHOICES_LIST, LEASE_TERM_CHOICES, FLAT_TYPE_CHOICES
from rest_framework import viewsets
from rest_framework import permissions
from main.serializers import UserSerializer, CreateUserSerializer, LeaseDataSerializer, ApartmentGeneralSerializer
from rest_framework.decorators import action
from rest_framework.response import Response


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    permission_classes = [permissions.AllowAny]

    
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
        if 'email' not in request.GET or not User.objects.filter(email=request.GET['email']).exists():
            raise Http404
        else:
            user = User.objects.get(email=request.GET['email'])
        
        serializer = self.get_serializer(user)

        current_term = LEASE_TERM_CHOICES[0][0]
        current_lease = LeaseData.objects.filter(user = user, lease_term = current_term).exists()

        response_dict = {}
        response_dict.update(serializer.data)
        response_dict["current_term"] = current_lease

        return Response(response_dict)

    @action(detail=False, methods=['post'])
    def create_user(self, request):
        """
        Create New User (no duplicate email)
        """
        user_email, user_password = request.POST['email'], request.POST['password']
        username = user_email.split('@')[0]

        user = User.objects.create_user(username=username, email=user_email, password=user_password)
                                
        serializer = self.get_serializer(user)
        return Response(serializer.data)

class ApartmentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Apartments to be viewed or edited.
    """
    queryset = Apartment.objects.all()
    serializer_class = ApartmentSerializer
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.action == "create_lease_data":
            return LeaseDataSerializer
        return ApartmentSerializer

    # simple get apartment
    # pk, aptname, rooms, addresses, price

    @action(detail=False, methods=['get'])
    def get_apartment_info(self, request):
        apartments = Apartment.objects.all()
        response_dict = {'info': []}

        lease_data = LeaseData.objects.all().filter(lease_term=LEASE_TERM_CHOICES[0][0])

        apartment_flat_dict = {}
        for lease in lease_data:
            lease_dict = lease.__dict__
            print(lease_dict['flat_type'])
            if lease_dict['apartment_id'] not in apartment_flat_dict:
                apartment_flat_dict[lease_dict['apartment_id']] = [lease_dict['flat_type']]
            elif lease_dict['flat_type'] not in apartment_flat_dict[lease_dict['apartment_id']]:
                apartment_flat_dict[lease_dict['apartment_id']].append(lease_dict['flat_type'])
        
        for key in apartment_flat_dict:
            
            flat_type_list = apartment_flat_dict[key]
            apt_info = Apartment.objects.get(pk=key).__dict__

            for cur_flat_type in flat_type_list:
                res = {}
                res['pk'] = apt_info['id']
                res['aptName'] = apt_info['name']
                res['address'] = apt_info['address']
                res['rooms'] = cur_flat_type
                specific_lease_data = LeaseData.objects.all().filter(apartment=key, flat_type=cur_flat_type, lease_term=LEASE_TERM_CHOICES[0][0])
                price_sum = 0
                for lease in specific_lease_data:
                    lease_dict = lease.__dict__
                    price_sum += lease_dict["price"]
                res['price'] = price_sum / len(specific_lease_data)
                response_dict['info'].append(ApartmentGeneralSerializer(res).data)

        return Response(response_dict)

    @action(detail=False, methods=['get'])
    def get_apartment_detail(self, request):
        """
        Get all necessary information for apartment detail
        """

        # Check if GET query is correct
        if "flat_type" in request.GET and "id" in request.GET:
            flat_type = request.GET['flat_type']
            pk = request.GET['id']
        else:
            raise Http404

        # Serializing apartment information
        apartment = Apartment.objects.get(pk=pk)
        serializer = self.get_serializer(apartment)
        response_dict = {}
        response_dict.update(serializer.data)

        # Serializing statistics
        stat = Statistics.objects.get(apartment=pk, flat_type=flat_type).__dict__
        response_dict['one_year_data'] = stat['one_year_data']
        response_dict['two_year_data'] = stat['two_year_data']
        response_dict['three_year_data'] = stat['three_year_data']

        # Calculating current year average price + serializing lease data
        lease_data = LeaseData.objects.all().filter(apartment=pk, flat_type=flat_type, lease_term=LEASE_TERM_CHOICES[0][0])
        if not lease_data.exists():
            raise Http404

        price_sum = 0
        response_dict['lease_data'] = []
        for lease in lease_data:
            lease_dict = lease.__dict__
            price_sum += lease_dict["price"]
            response_dict['lease_data'].append(LeaseDataSerializer(lease_dict).data)
        
        current_average_price = price_sum / len(lease_data)
        response_dict['current_price_data'] = current_average_price
        
        return Response(response_dict)

    @action(detail=False, methods=['post'])
    def create_lease_data(self, request):
        """
        Create Lease Data
        """
        pass
        # print(request.POST['user_pk'])

        # user_pk = request.POST['user_pk']

                                
        # # serializer = self.get_serializer(user)
        # pass
        # return Response(serializer.data)
        