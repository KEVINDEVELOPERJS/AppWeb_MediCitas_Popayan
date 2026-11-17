from django.db.models import ProtectedError
from rest_framework import viewsets, status
from rest_framework.response import Response

from citas.models import Especialidad, CitaMedica
from citas.api.serializers import EspecialidadSerializer, CitaMedicaSerializer


class ProtectedDeleteMixin:
    """Evita error 500 por PROTECT y responde con mensaje claro."""

    def destroy(self, request, *args, **kwargs):
        try:
            return super().destroy(request, *args, **kwargs)
        except ProtectedError as error:
            relacionados = error.protected_objects
            conteo = {}
            for obj in relacionados:
                label = obj._meta.verbose_name_plural
                conteo[label] = conteo.get(label, 0) + 1
            detalle = ", ".join(f"{label}: {cantidad}" for label, cantidad in conteo.items())
            if not detalle:
                detalle = "registros relacionados"
            return Response(
                {
                    "detail": (
                        "No se puede eliminar porque tiene registros asociados "
                        f"({detalle}). Elimínelos o reasígnelos primero."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


class EspecialidadViewSet(ProtectedDeleteMixin, viewsets.ModelViewSet):
    queryset = Especialidad.objects.all().order_by("nombre")
    serializer_class = EspecialidadSerializer


class CitaMedicaViewSet(ProtectedDeleteMixin, viewsets.ModelViewSet):
    queryset = CitaMedica.objects.select_related("especialidad").all().order_by("-fecha_hora")
    serializer_class = CitaMedicaSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        especialidad_id = self.request.query_params.get("especialidad")
        estado = self.request.query_params.get("estado")
        if especialidad_id:
            queryset = queryset.filter(especialidad_id=especialidad_id)
        if estado:
            queryset = queryset.filter(estado=estado)
        return queryset
