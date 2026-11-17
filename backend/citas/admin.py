from django.contrib import admin
from .models import Especialidad, CitaMedica


@admin.register(Especialidad)
class EspecialidadAdmin(admin.ModelAdmin):
    list_display = ("id", "nombre", "activa", "creado_en")
    search_fields = ("nombre",)


@admin.register(CitaMedica)
class CitaMedicaAdmin(admin.ModelAdmin):
    list_display = ("id", "paciente_nombre", "especialidad", "fecha_hora", "estado")
    list_filter = ("estado", "especialidad")
    search_fields = ("paciente_nombre", "motivo")
