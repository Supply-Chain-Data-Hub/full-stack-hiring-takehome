from django.shortcuts import render

# Create your views here.
# views.py
import csv
import os
from django.http import JsonResponse
from django.conf import settings
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class FileNotFoundError(Exception):
    pass

class InvalidDataError(Exception):
    pass

def load_csv_data(file_name):
    csv_path = os.path.join(settings.BASE_DIR, 'data', file_name)
    try:
        with open(csv_path, 'r') as file:
            csv_reader = csv.DictReader(file)
            return list(csv_reader)
    except FileNotFoundError:
        raise FileNotFoundError(f"CSV file not found: {file_name}")
    except csv.Error as e:
        raise InvalidDataError(f"Error reading CSV file {file_name}: {str(e)}")

@swagger_auto_schema(
    method='get',
    operation_description="Get a list of all companies",
    responses={
        200: openapi.Response('List of companies', schema=openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'company_id': openapi.Schema(type=openapi.TYPE_STRING),
                    'name': openapi.Schema(type=openapi.TYPE_STRING),
                    'address': openapi.Schema(type=openapi.TYPE_STRING),
                    'latitude': openapi.Schema(type=openapi.TYPE_STRING),
                    'longitude': openapi.Schema(type=openapi.TYPE_STRING),
                }
            ),
            example=[
                {
                    'company_id': '1',
                    'name': 'Acme Corporation',
                    'address': '123 Main St, Anytown, USA',
                    'latitude': '40.7128',
                    'longitude': '-74.0060'
                },
                {
                    'company_id': '2',
                    'name': 'Globex Corporation',
                    'address': '456 Oak Ave, Somewhere, USA',
                    'latitude': '37.7749',
                    'longitude': '-122.4194'
                }
            ]
        )),
        500: openapi.Response('Internal Server Error', schema=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING)
            },
            example={
                'error': 'CSV file not found: companies.csv'
            }
        ))
    }
)
@api_view(['GET'])
def get_all_companies(request):
    try:
        companies = load_csv_data('companies.csv')
        return JsonResponse(companies, safe=False)
    except (FileNotFoundError, InvalidDataError) as e:
        return JsonResponse({'error': str(e)}, status=500)

@swagger_auto_schema(
    method='get',
    operation_description="Get details of a specific company",
    manual_parameters=[
        openapi.Parameter('company_id', openapi.IN_PATH, description="ID of the company", type=openapi.TYPE_INTEGER),
    ],
    responses={
        200: openapi.Response('Company details', schema=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'company_id': openapi.Schema(type=openapi.TYPE_STRING),
                'name': openapi.Schema(type=openapi.TYPE_STRING),
                'address': openapi.Schema(type=openapi.TYPE_STRING),
                'latitude': openapi.Schema(type=openapi.TYPE_STRING),
                'longitude': openapi.Schema(type=openapi.TYPE_STRING),
            },
            example={
                'company_id': '1',
                'name': 'Acme Corporation',
                'address': '123 Main St, Anytown, USA',
                'latitude': '40.7128',
                'longitude': '-74.0060'
            }
        )),
        404: openapi.Response('Not Found', schema=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING)
            },
            example={
                'error': 'Company not found'
            }
        )),
        500: openapi.Response('Internal Server Error', schema=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING)
            },
            example={
                'error': 'CSV file not found: companies.csv'
            }
        ))
    }
)
@api_view(['GET'])
def get_company_by_id(request, company_id):
    try:
        companies = load_csv_data('companies.csv')
        company = next((c for c in companies if c['company_id'] == str(company_id)), None)
        if company:
            return JsonResponse(company)
        else:
            return JsonResponse({'error': 'Company not found'}, status=404)
    except (FileNotFoundError, InvalidDataError) as e:
        return JsonResponse({'error': str(e)}, status=500)

@swagger_auto_schema(
    method='get',
    operation_description="Get all locations for a specific company",
    manual_parameters=[
        openapi.Parameter('company_id', openapi.IN_PATH, description="ID of the company", type=openapi.TYPE_INTEGER),
    ],
    responses={
        200: openapi.Response('List of company locations', schema=openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'location_id': openapi.Schema(type=openapi.TYPE_STRING),
                    'company_id': openapi.Schema(type=openapi.TYPE_STRING),
                    'name': openapi.Schema(type=openapi.TYPE_STRING),
                    'address': openapi.Schema(type=openapi.TYPE_STRING),
                    'latitude': openapi.Schema(type=openapi.TYPE_STRING),
                    'longitude': openapi.Schema(type=openapi.TYPE_STRING),
                }
            ),
            example=[
                {
                    'location_id': '1',
                    'company_id': '1',
                    'name': 'Acme HQ',
                    'address': '123 Main St, Anytown, USA',
                    'latitude': '40.7128',
                    'longitude': '-74.0060'
                },
                {
                    'location_id': '2',
                    'company_id': '1',
                    'name': 'Acme Branch Office',
                    'address': '456 Oak Ave, Othertown, USA',
                    'latitude': '37.7749',
                    'longitude': '-122.4194'
                }
            ]
        )),
        404: openapi.Response('Not Found', schema=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING)
            },
            example={
                'error': 'No locations found for this company'
            }
        )),
        500: openapi.Response('Internal Server Error', schema=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'error': openapi.Schema(type=openapi.TYPE_STRING)
            },
            example={
                'error': 'CSV file not found: locations.csv'
            }
        ))
    }
)
@api_view(['GET'])
def get_locations_by_company_id(request, company_id):
    try:
        locations = load_csv_data('locations.csv')
        company_locations = [loc for loc in locations if loc['company_id'] == str(company_id)]
        if company_locations:
            return JsonResponse(company_locations, safe=False)
        else:
            return JsonResponse({'error': 'No locations found for this company'}, status=404)
    except (FileNotFoundError, InvalidDataError) as e:
        return JsonResponse({'error': str(e)}, status=500)