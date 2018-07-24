from django.db import models

class ParkingData(models.Model):
    """This class represents the parkingdata model."""
    name = models.CharField(max_length=255, blank=True, null=True)
    uuid = models.CharField(max_length=255, blank=False, unique=True)
    staticDataUrl = models.CharField(max_length=255, blank=False)
    dynamicDataUrl = models.CharField(max_length=255, blank=True, null=True)
    limitedAccess = models.BooleanField()
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    country_code = models.CharField(max_length=10, blank=True, null=True)
    region = models.CharField(max_length=255, blank=True, null=True, default="default")
    province = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    mark = models.CharField(max_length=255, blank=True, null=True)
    usage = models.CharField(max_length=255, blank=True, null=True)
    accessPoints = models.BooleanField(default=False)
    capacity = models.IntegerField(blank=True, null=True)
    tariffs = models.BooleanField(default=False)
    minimumHeightInMeters = models.FloatField(blank=True, null=True)
    openingTimes = models.BooleanField(default=False)
    contactPersons = models.BooleanField(default=False)

    def __str__(self):
        """Return a human readable representation of the model instance."""
        return self.name
