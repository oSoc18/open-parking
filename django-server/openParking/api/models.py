from django.db import models

# Create your models here.


class ParkingData(models.Model):
    """This class represents the parkingdata model."""
    name = models.CharField(max_length=255, blank=False, unique=True)
    uuid = models.CharField(max_length=255, blank=False, unique=False)
    staticDataUrl = models.CharField(max_length=255, blank=False, unique=False)
    dynamicDataUrl = models.CharField(max_length=255, blank=True, unique=False)
    limitedAccess = models.BooleanField(
        max_length=6, blank=False, unique=False)
    geoLocation = models.CharField(max_length=255, blank=True, unique=False)

    def __str__(self):
        """Return a human readable representation of the model instance."""
        return "{}".format("self.name")
