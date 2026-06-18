from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Boat, DetectionEvent

@api_view(['POST'])
def log_detection(request):
    """
    Endpoint for the edge devices (boats) to log a trash detection event.
    Expected JSON: {"boat_id": 1, "latitude": 40.71, "longitude": -74.00, "trash_count": 2}
    """
    boat_id = request.data.get('boat_id')
    lat = request.data.get('latitude')
    lng = request.data.get('longitude')
    count = request.data.get('trash_count', 1)

    if not all([boat_id, lat, lng]):
        return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        boat = Boat.objects.get(id=boat_id)
        # Update boat's last known position
        boat.last_latitude = lat
        boat.last_longitude = lng
        boat.save()
        
        # Create detection
        DetectionEvent.objects.create(
            boat=boat,
            latitude=lat,
            longitude=lng,
            trash_count=count
        )
        return Response({"status": "Detection logged successfully"}, status=status.HTTP_201_CREATED)
    except Boat.DoesNotExist:
        return Response({"error": "Boat not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_heatmap_data(request):
    """
    Endpoint for the React frontend to fetch heatmap points.
    Returns: [[lat, lng, weight], ...]
    """
    detections = DetectionEvent.objects.all()
    data = []
    for d in detections:
        # Simple normalization for Leaflet heat (0.0 to 1.0)
        weight = min(d.trash_count * 0.2, 1.0) 
        data.append([d.latitude, d.longitude, weight])
        
    return Response(data)
