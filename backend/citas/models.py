from django.db import models
from django.core.validators import RegexValidator


class Especialidad(models.Model):
    """Especialidad médica ofrecida por el consultorio."""

    nombre = models.CharField(max_length=120, unique=True, help_text="Nombre de la especialidad")
    descripcion = models.TextField(blank=True, help_text="Descripción breve de la especialidad")
    activa = models.BooleanField(default=True, help_text="Indica si la especialidad está disponible")
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Especialidad"
        verbose_name_plural = "Especialidades"
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre


class CitaMedica(models.Model):
    """Cita médica agendada en una especialidad."""

    class Estado(models.TextChoices):
        PROGRAMADA = "PROGRAMADA", "Programada"
        ATENDIDA = "ATENDIDA", "Atendida"
        CANCELADA = "CANCELADA", "Cancelada"

    paciente_nombre = models.CharField(max_length=150, help_text="Nombre completo del paciente")
    telefono = models.CharField(
        max_length=20,
        blank=True,
        validators=[RegexValidator(r"^[0-9+\-\s]{7,20}$", "Ingrese un teléfono válido.")],
        help_text="Teléfono de contacto",
    )
    fecha_hora = models.DateTimeField(help_text="Fecha y hora de la cita")
    motivo = models.TextField(help_text="Motivo de la consulta")
    estado = models.CharField(max_length=20, choices=Estado.choices, default=Estado.PROGRAMADA)
    observaciones = models.TextField(blank=True, help_text="Observaciones adicionales")
    especialidad = models.ForeignKey(
        Especialidad,
        on_delete=models.PROTECT,
        related_name="citas",
        help_text="Especialidad asociada a la cita",
    )
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Cita médica"
        verbose_name_plural = "Citas médicas"
        ordering = ["-fecha_hora"]
        indexes = [
            models.Index(fields=["estado"]),
            models.Index(fields=["fecha_hora"]),
        ]

    def __str__(self):
        return f"{self.paciente_nombre} - {self.especialidad.nombre} ({self.fecha_hora:%Y-%m-%d %H:%M})"
