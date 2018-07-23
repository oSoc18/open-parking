from django.db import models

class ParkingData(models.Model):
    """This class represents the parkingdata model."""
    name = models.CharField(max_length=255, blank=True, null=True)
    uuid = models.CharField(max_length=255, blank=False, unique=True)
    staticDataUrl = models.CharField(max_length=255, blank=False)
    staticData = models.TextField(blank=True, null=True)
    dynamicDataUrl = models.CharField(max_length=255, blank=True, null=True)
    limitedAccess = models.BooleanField()
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    facilityType = models.CharField(max_length=255, default="offstreet")
    country_code = models.CharField(max_length=10, blank=True, null=True)
    region = models.CharField(max_length=255, blank=True, null=True, default="default")
    province = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    mark = models.CharField(max_length=255, blank=True, null=True)
    usage = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        """Return a human readable representation of the model instance."""
        return self.name
