# Generated manually for initial schema
import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='Especialidad',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(help_text='Nombre de la especialidad', max_length=120, unique=True)),
                ('descripcion', models.TextField(blank=True, help_text='Descripción breve de la especialidad')),
                ('activa', models.BooleanField(default=True, help_text='Indica si la especialidad está disponible')),
                ('creado_en', models.DateTimeField(auto_now_add=True)),
                ('actualizado_en', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Especialidad',
                'verbose_name_plural': 'Especialidades',
                'ordering': ['nombre'],
            },
        ),
        migrations.CreateModel(
            name='CitaMedica',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('paciente_nombre', models.CharField(help_text='Nombre completo del paciente', max_length=150)),
                ('telefono', models.CharField(blank=True, help_text='Teléfono de contacto', max_length=20, validators=[django.core.validators.RegexValidator('^[0-9+\\-\\s]{7,20}$', 'Ingrese un teléfono válido.')])),
                ('fecha_hora', models.DateTimeField(help_text='Fecha y hora de la cita')),
                ('motivo', models.TextField(help_text='Motivo de la consulta')),
                ('estado', models.CharField(choices=[('PROGRAMADA', 'Programada'), ('ATENDIDA', 'Atendida'), ('CANCELADA', 'Cancelada')], default='PROGRAMADA', max_length=20)),
                ('observaciones', models.TextField(blank=True, help_text='Observaciones adicionales')),
                ('creado_en', models.DateTimeField(auto_now_add=True)),
                ('actualizado_en', models.DateTimeField(auto_now=True)),
                ('especialidad', models.ForeignKey(help_text='Especialidad asociada a la cita', on_delete=django.db.models.deletion.PROTECT, related_name='citas', to='citas.especialidad')),
            ],
            options={
                'verbose_name': 'Cita médica',
                'verbose_name_plural': 'Citas médicas',
                'ordering': ['-fecha_hora'],
            },
        ),
        migrations.AddIndex(
            model_name='citamedica',
            index=models.Index(fields=['estado'], name='citas_citam_estado_265a7e_idx'),
        ),
        migrations.AddIndex(
            model_name='citamedica',
            index=models.Index(fields=['fecha_hora'], name='citas_citam_fecha_h_ece9e6_idx'),
        ),
    ]
