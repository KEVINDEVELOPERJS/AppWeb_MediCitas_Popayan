from rest_framework.routers import DefaultRouter
from citas.views import EspecialidadViewSet, CitaMedicaViewSet

router = DefaultRouter()
router.register(r'especialidades', EspecialidadViewSet, basename='especialidad')
router.register(r'citas', CitaMedicaViewSet, basename='cita')

urlpatterns = router.urls
