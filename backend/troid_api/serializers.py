from rest_framework import serializers
from .models import Boat, DetectionEvent

class DetectionEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetectionEvent
        fields = ['id', 'boat', 'timestamp', 'latitude', 'longitude', 'trash_count']
