from django.urls import path
from . import views

urlpatterns = [
    path('companies/', views.get_all_companies, name='get_all_companies'),
    path('companies/<str:company_id>/', views.get_company_by_id, name='get_company_by_id'),
    path('companies/<str:company_id>/locations/', views.get_locations_by_company_id, name='get_locations_by_company_id'),
]