from django.db import models

class Boat(models.Model):
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    last_latitude = models.FloatField(null=True, blank=True)
    last_longitude = models.FloatField(null=True, blank=True)
    battery_level = models.FloatField(null=True, blank=True)
    last_seen = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class DetectionEvent(models.Model):
    boat = models.ForeignKey(Boat, on_delete=models.CASCADE, related_name='detections')
    timestamp = models.DateTimeField(auto_now_add=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    trash_count = models.IntegerField(default=1)

    def __str__(self):
        return f"Detection by {self.boat.name} at {self.timestamp}"
