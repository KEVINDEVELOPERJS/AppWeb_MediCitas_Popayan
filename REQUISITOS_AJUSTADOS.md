# Requisitos ajustados de la entrega final

**Documento original:** `entrega-final-django-react.docx`  
**Ajuste solicitado:** adaptación a **un solo integrante** y a **una propuesta de proyecto distinta**, con permiso del docente.

## 1. Información general (ajustada)

| Campo | Versión original | Versión ajustada |
|---|---|---|
| Modalidad | Parejas | **Individual (1 integrante)**, por permiso del docente |
| Fecha límite | 17 de noviembre | **17 de noviembre** (sin cambios, salvo indicación docente) |
| Medio de entrega | Moodle (enlaces a 2 repositorios y video) | Moodle: enlaces al repositorio del **servidor** y del **cliente** y enlace al **video** (si el docente lo requiere). Si se entrega desde un monorepo, incluir rutas/carpetas claras (`backend/` y `frontend` en raíz). |
| Integrantes | 2 personas | **1 persona** |

## 2. Propósito

Construir de forma individual una aplicación web con **servidor (Django REST Framework)** y **cliente (React + Vite + JSX)** en proyectos separados (o claramente separados en carpetas), comunicados por HTTP, evidenciando el flujo completo desde la base de datos hasta la interfaz en el navegador.

## 3. Propuesta de proyecto distinta

**Proyecto:** *MediCitas Popayán* — Gestor de citas para un consultorio médico comunitario.

> Propuesta distinta a las ideas sugeridas en el documento original y distinta al proyecto base de restaurante usado como referencia de lógica CRUD.

### Modelos relacionados (mínimo 2, con `ForeignKey`)

1. **Especialidad**
   - Representa una especialidad médica del consultorio (ej. Medicina general, Pediatría, Odontología).
   - Campos principales: `nombre` (único), `descripcion`, `activa`, marcas de tiempo.

2. **CitaMedica**
   - Representa una cita agendada para un paciente en una especialidad.
   - Relación: `especialidad = ForeignKey(Especialidad, on_delete=PROTECT, related_name="citas")`.
   - Campos principales: `paciente_nombre`, `telefono`, `fecha_hora`, `motivo`, `estado` (Programada/Atendida/Cancelada), `observaciones`, marcas de tiempo.

La relación **Especialidad (1) → CitaMedica (N)** cumple el requisito de dos modelos relacionados entre sí mediante `ForeignKey`.

## 4. Qué se debe construir

### Repositorio / carpeta 1: servidor (`backend/`, Django + DRF)
- Mínimo **2 modelos relacionados** (cumplido: `Especialidad` y `CitaMedica`).
- Por cada modelo: **modelo, migración, serializer, ViewSet, ruta registrada con router y CRUD completo**.
- **CORS habilitado** con `django-cors-headers` para permitir peticiones desde el cliente Vite (`http://localhost:5173` / `http://127.0.0.1:5173`).
- Manejo seguro de eliminación protegida (respuesta clara cuando una especialidad tiene citas asociadas).

### Repositorio / carpeta 2: cliente (raíz React + Vite + JSX)
- Consume la API del servidor con **`fetch`**.
- Por cada modelo:
  - **Listar** (tabla).
  - **Crear** (formulario).
  - **Eliminar** (con confirmación).
- Manejo de estados de **carga y error**.
- **Bonus implementado:** **editar** registros con `PUT` (actualización completa desde el formulario).

## 5. Trabajo en Git (ajustado a individual)

- Se mantienen **dos repositorios** (servidor y cliente) o, si el docente lo permite, un repositorio con separación clara de carpetas; en este directorio se entrega la implementación completa (`backend/` y cliente React en la raíz).
- Al ser **un solo integrante**, los commits son del **único autor**.
- Recomendación para máxima calificación: **mínimo 6 commits** en total (idealmente **≥3 en backend y ≥3 en frontend**) con mensajes claros en formato `tipo(zona): descripción`.
  - Ejemplos: `feat(backend): agrega modelos Especialidad y CitaMedica con migración`, `feat(backend): configura CORS y rutas de la API`, `feat(frontend): crea panel de especialidades con listar y crear`, `fix(frontend): maneja estados de carga y error en fetch`.
- No usar mensajes genéricos ("cambios", "listo", "avance").
- Cada parte debe tener `.gitignore` adecuado (sin `node_modules`, `venv`, `.venv`, `db.sqlite3`, `__pycache__`, etc.).
- Plan detallado de commits y comandos: ver [COMMITS_ENTREGA.md](COMMITS_ENTREGA.md).

## 6. Video explicativo (ajustado a individual)

- Duración sugerida: **10 a 15 minutos**.
- **Participación individual:** explicación completa realizada por el único integrante (reemplaza la exigencia de voz de ambos integrantes). La cámara es opcional (bonus según rúbrica original).
- **Parte A – Flujo completo:** explicar y mostrar el recorrido `modelo → migración → serializer → viewset → router/ruta → CORS → fetch en React → renderizado`. Demostrar en el navegador: listar y crear un registro desde el formulario comprobando que aparece (y, si se muestra, editar/eliminar).
- **Parte B – Preguntas:** responder **6 preguntas** seleccionadas del banco (2 de servidor, 2 de cliente, 2 de Git), como equivalente individual al reparto original por pareja.
- Guion minuto a minuto (15:00 y versión compacta de 10:00): ver [GUIA_ENTREGA_VIDEO.md](GUIA_ENTREGA_VIDEO.md).

## 7. Entrega en Moodle

- Enlace al repositorio/carpeta del **servidor**.
- Enlace al repositorio/carpeta del **cliente**.
- Enlace al **video** con acceso abierto a quien tenga el enlace.
- Nombre completo del integrante: **(completar por el estudiante)**.

## 8. Rúbrica de evaluación (referencia)

Se mantiene la rúbrica original (total 5,0) como referencia de calidad:

| Criterio | Nota |
|---|---:|
| Servidor: modelos relacionados, migraciones, serializers, viewsets, rutas y CORS | 1,2 |
| Cliente: listar, crear y eliminar, con estados de carga y error | 1,0 |
| Git: repos/carpeta organizada, commits propios y balanceados, mensajes claros | 0,8 |
| Video: explicación del flujo completo y demostración en la web | 0,8 |
| Preguntas individuales (6) | 1,2 |
| **Total** | **5,0** |
| Bonus: editar con PUT o PATCH | +0,3 |
| Bonus: cámara encendida en el video | +0,2 |

> **Nota de ajuste:** el criterio de preguntas se interpreta de forma individual (6 preguntas en total). La evaluación de Git se adapta a autoría individual manteniendo buenas prácticas de commits y estructura.
