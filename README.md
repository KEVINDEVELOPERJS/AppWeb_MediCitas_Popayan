# MediCitas Popayán — Entrega final (Django REST Framework + React Vite)

Aplicación web **cliente-servidor** desarrollada para la entrega final, ajustada a **trabajo individual** y con una **propuesta de proyecto distinta**, reutilizando y adaptando la lógica de CRUDs del proyecto base de restaurante.

- **Servidor (backend):** Django + Django REST Framework, API REST con CORS.
- **Cliente (frontend):** React + Vite + JSX, consumo de API con `fetch`.
- **Comunicación:** HTTP/JSON entre `http://127.0.0.1:8000` (API) y `http://localhost:5173` (Vite).

> Ver [REQUISITOS_AJUSTADOS.md](REQUISITOS_AJUSTADOS.md) para el detalle de la adaptación de requisitos (modalidad individual y nueva idea de proyecto).

## Idea de proyecto

**MediCitas Popayán**: gestor de citas para un consultorio médico comunitario.

### Modelos relacionados (ForeignKey)

1. **Especialidad** (1) — especialidad médica disponible en el consultorio.
2. **CitaMedica** (N) — cita agendada para un paciente, asociada a una especialidad.
   - Relación: `CitaMedica.especialidad -> Especialidad` (`ForeignKey`, `on_delete=PROTECT`, `related_name="citas"`).

## Estructura del directorio

```text
.
├── backend/                  # Servidor Django + DRF
│   ├── manage.py
│   ├── requirements.txt
│   ├── consultorio/          # Configuración del proyecto (settings, urls, wsgi/asgi)
│   └── citas/                # App principal
│       ├── models.py         # Modelos Especialidad y CitaMedica
│       ├── views.py          # ViewSets + manejo de borrado protegido
│       ├── admin.py
│       ├── migrations/       # Migraciones
│       └── api/
│           ├── serializers.py
│           └── router.py     # Rutas registradas con DefaultRouter
├── src/                      # Cliente React (Vite)
│   ├── api/client.js         # Cliente fetch (GET/POST/PUT/PATCH/DELETE)
│   ├── components/
│   │   ├── EspecialidadesPanel.jsx
│   │   └── CitasPanel.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
│   └── favicon.svg
├── index.html
├── package.json
├── vite.config.js
├── REQUISITOS_AJUSTADOS.md
├── COMMITS_ENTREGA.md
└── GUIA_ENTREGA_VIDEO.md
```

## Requisitos implementados

### Servidor
- [x] 2 modelos relacionados por `ForeignKey` (`Especialidad` → `CitaMedica`).
- [x] Modelo, migración, serializer, `ModelViewSet`, ruta con `router` y CRUD completo por cada modelo.
- [x] CORS habilitado con `django-cors-headers` para el cliente Vite.
- [x] Respuesta clara ante eliminación protegida (especialidad con citas asociadas).

### Cliente
- [x] Consumo de API con `fetch`.
- [x] Por cada modelo: **listar**, **crear** y **eliminar**.
- [x] Manejo de estados de **carga** y **error**.
- [x] **Bonus:** **editar** registros con `PUT`.

## Endpoints de la API

Base URL: `http://127.0.0.1:8000/api/`

| Recurso | Endpoint | Métodos |
|---|---|---|
| Especialidades | `/api/especialidades/` | GET, POST |
| Especialidad (detalle) | `/api/especialidades/{id}/` | GET, PUT, PATCH, DELETE |
| Citas médicas | `/api/citas/` | GET, POST |
| Cita médica (detalle) | `/api/citas/{id}/` | GET, PUT, PATCH, DELETE |

Rutas generadas automáticamente por `DefaultRouter` de Django REST Framework.

## Cómo ejecutar el proyecto

### 1. Backend (Django + DRF)

```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# Linux/macOS:
# source .venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

API disponible en: `http://127.0.0.1:8000/api/`

(Opcional) crear superusuario para admin: `python manage.py createsuperuser` → `http://127.0.0.1:8000/admin/`

### 2. Frontend (React + Vite)

En otra terminal, desde la raíz del proyecto:

```bash
npm install
npm run dev
```

Cliente disponible en: `http://localhost:5173`

> Asegúrese de que el backend esté en ejecución antes de usar el cliente. La URL base de la API puede configurarse con `VITE_API_URL` (por defecto `http://127.0.0.1:8000/api`).

## Flujo completo (referencia para sustentación)

`Modelo (models.py)` → `Migración (migrations/)` → `Serializer (api/serializers.py)` → `ViewSet (views.py)` → `Ruta/Router (api/router.py, urls.py)` → `CORS (settings.py)` → `fetch en React (src/api/client.js)` → `Renderizado en componentes (src/components/*.jsx)`.

## Autoría y entrega

- **Modalidad:** individual (ajustada con permiso del docente).
- **Integrante:** _(completar nombre completo)_.
- **Proyecto base de referencia lógica CRUD:** `AppWeb_Restaurante_CRUDs` (adaptado a nueva idea y estructura).
- Ver [COMMITS_ENTREGA.md](COMMITS_ENTREGA.md) para el plan detallado de commits (16 commits, comandos y evidencias).
- Ver [GUIA_ENTREGA_VIDEO.md](GUIA_ENTREGA_VIDEO.md) para el guion minuto a minuto del video, demostración y preguntas.
