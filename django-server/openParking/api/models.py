from django.db import models

# Create your models here.


class ParkingData(models.Model):
    """This class represents the parkingdata model."""
    name = models.CharField(max_length=255, blank=True,
                            null=True, unique=False)
    uuid = models.CharField(max_length=255, blank=False, unique=True)
    staticDataUrl = models.CharField(max_length=255, blank=False, unique=False)
    dynamicDataUrl = models.CharField(
        max_length=255, blank=True, null=True, unique=False)
    limitedAccess = models.BooleanField(
        max_length=6, blank=False, unique=False)
    latitude = models.FloatField(blank=True, null=True, unique=False)
    longitude = models.FloatField(blank=True, null=True, unique=False)
    facilityType = models.CharField(
        max_length=255, blank=False, null=False, unique=False, default="offstreet")
    country_code = models.CharField(
        max_length=10, blank=True, null=True, unique=False)
    region = models.CharField(
        max_length=255, blank=True, null=True, unique=False, default="default")
    province = models.CharField(
        max_length=255, blank=True, null=True, unique=False)
    city = models.CharField(max_length=255, blank=True,
                            null=True, unique=False)

    def __str__(self):
        """Return a human readable representation of the model instance."""
        return "{}".format("self.name")
