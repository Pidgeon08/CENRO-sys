from django.urls import path
from . import views

urlpatterns = [
    path('log-detection/', views.log_detection, name='log-detection'),
    path('heatmap/', views.get_heatmap_data, name='get-heatmap'),
]
