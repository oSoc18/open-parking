from rest_framework import serializers
from .models import ParkingData


class ParkingDataSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""

    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = ParkingData
        fields = ('id', 'name', 'uuid', 'staticDataUrl', 'dynamicDataUrl',
                  'limitedAccess', 'latitude', 'longitude', 'facilityType',
                  'country_code', 'region', 'city', 'province', 'mark', 'usage')

class ParkingStaticDataSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format, plus the static
    data field.
    """

    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = ParkingData
        fields = ('id', 'name', 'uuid', 'staticDataUrl', 'dynamicDataUrl',
            'limitedAccess', 'latitude', 'longitude', 'facilityType',
            'country_code', 'region', 'city', 'province', 'mark', 'usage'
            'staticData')
