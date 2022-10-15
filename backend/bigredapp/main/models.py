from argparse import ONE_OR_MORE
from django.db import models
from django.contrib.auth.models import User
from .choices import LEASE_TERM_CHOICES, LEASE_TYPE_CHOICES, FLAT_TYPE_CHOICES, RATING_CHOICES, LAUNDRY_CHOICES
import datetime


#apartment data
class Apartment(models.Model):
  name = models.CharField(max_length=50, null=True)
  address = models.CharField(max_length=200, null=True)
  rating = models.FloatField(default = 5.0, max_value=5.0, min_value=1.0)
  number_of_reviews = models.IntegerField(default=0, min_value=0)
  gym = models.BooleanField(default=False)
  laundry = models.CharField(default="No Laundry", choices=LAUNDRY_CHOICES)
  complimentary_wifi_router = models.BooleanField(default=False)
  electricity = models.BooleanField(default=False)

  # name, address, rating (# of reviews, 아파트별로), amenity (하나씩: gym (true/false),
  # laundry (in house/shared/none), complimentary wifi router (true/false), electricity (true/false),)
  # 연도별로 lease data 나누지 말고, 일단 한꺼번에 다 넣기

# class LeaseData(models.Model):
#   user = models.ForeignKey('auth.user', on_delete=models.CASCADE)
#   lease_term = models.CharField(max_length=20, choices=LEASE_TERM_CHOICES, default= "2022-2023")
#   contract_date = models.DateField(default=datetime.date.today, blank=True, null=True)
#   lease_type = models.CharField(max_length=20, choices=LEASE_TYPE_CHOICES, default="One Year Lease")
#   price = models.IntegerField(default=0)
#   flat_type = models.CharField(max_length=20, choices=FLAT_TYPE_CHOICES, default="Studio")
#   apartment = models.ForeignKey(Apartment, on_delete=models.CASCADE, null=True, related_name='apartment')

# class Statistics(models.Model):
#   apartment = models.ForeignKey(Apartment, on_delete=models.CASCADE, null=True, related_name='apartment')


# statistics model: 일단 지난 4년 데이타 기반으로 정해놓음, 아파트 > bed 별로, 그냥 previous stats을 계산해서 frontend에 보내주기
# 아파트, flat type, 지난 3년 연도별 데이터를 각각 따로 정리해놓기 , 아파트/플랫 연결시키기
# 지난 스탯을 더미로 넣는다
