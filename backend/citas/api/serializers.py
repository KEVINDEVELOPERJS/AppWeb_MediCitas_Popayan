from rest_framework import serializers
from ..models import Especialidad, CitaMedica


class EspecialidadSerializer(serializers.ModelSerializer):
    total_citas = serializers.SerializerMethodField()

    class Meta:
        model = Especialidad
        fields = ["id", "nombre", "descripcion", "activa", "total_citas", "creado_en", "actualizado_en"]
        read_only_fields = ["id", "creado_en", "actualizado_en"]

    def get_total_citas(self, obj):
        return obj.citas.count()


class CitaMedicaSerializer(serializers.ModelSerializer):
    especialidad_nombre = serializers.CharField(source="especialidad.nombre", read_only=True)

    class Meta:
        model = CitaMedica
        fields = [
            "id",
            "paciente_nombre",
            "telefono",
            "fecha_hora",
            "motivo",
            "estado",
            "observaciones",
            "especialidad",
            "especialidad_nombre",
            "creado_en",
            "actualizado_en",
        ]
        read_only_fields = ["id", "creado_en", "actualizado_en"]

    def validate_paciente_nombre(self, value):
        if len(value.strip()) < 3:
            raise serializers.ValidationError("El nombre del paciente debe tener al menos 3 caracteres.")
        return value.strip()
