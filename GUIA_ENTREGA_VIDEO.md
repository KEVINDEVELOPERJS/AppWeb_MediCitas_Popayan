# Guía de sustentación en video — MediCitas Popayán

**Proyecto:** MediCitas Popayán — gestor de citas para consultorio médico comunitario  
**Modalidad:** individual (1 integrante), ajustada con permiso del docente  
**Duración máxima:** **15:00 minutos**  
**Bonus:** cámara encendida durante toda la exposición (+0,2)  
**Objetivo:** demostrar el flujo completo `modelo → migración → serializer → viewset → router → CORS → fetch → React → navegador`, mostrar la aplicación funcionando y responder 6 preguntas.

> **Regla de oro:** el video debe durar **10 a 15 minutos**. Esta guía trae un guion de **15:00** y una versión compacta de **10:00**. Ensaya con cronómetro y no superes el máximo.

---

## 1. Cómo se cubre la rúbrica (mapa rápido)

| Criterio | Peso | Dónde se demuestra | Minutos |
|---|---:|---|---|
| Servidor: modelos relacionados, migraciones, serializers, viewsets, rutas y CORS | 1,2 | Código del backend + API en navegador | 01:00–06:00 |
| Cliente: listar, crear y eliminar, con estados de carga y error | 1,0 | Paneles React + demo en navegador | 06:00–10:00 |
| Git: repos/carpeta organizada, commits propios y balanceados, mensajes claros | 0,8 | Historial Git + `.gitignore` | 10:00–11:00 |
| Video: explicación del flujo completo y demostración en la web | 0,8 | Todo el video, especialmente 01:00–10:00 | Todo |
| Preguntas individuales (6) | 1,2 | Respuestas 2 servidor + 2 cliente + 2 Git | 11:00–14:00 |
| **Bonus:** editar con PUT/PATCH | +0,3 | Edición de una especialidad o cita | 09:00–10:00 |
| **Bonus:** cámara encendida | +0,2 | Rostro visible durante la exposición | Todo |

**Total base:** 5,0 + bonos.

---

## 2. Antes de grabar: preparación

### 2.1. Checklist técnico

1. **Backend funcionando**
   ```bash
   cd backend
   .venv\Scripts\activate
   python manage.py migrate
   python manage.py runserver
   ```
   Verifica: `http://127.0.0.1:8000/api/` responde JSON.

2. **Frontend funcionando** (otra terminal, desde la raíz)
   ```bash
   npm install
   npm run dev
   ```
   Verifica: `http://localhost:5173` carga la aplicación.

3. **Datos mínimos para la demo:** crea desde la app al menos 2 especialidades y 1 cita antes de grabar, o créalas durante el video. Ten lista una especialidad sin citas para probar el borrado normal y una con citas para probar el borrado protegido.

4. **Pestañas recomendadas abiertas:**
   - Navegador: `http://localhost:5173` (app).
   - Navegador: `http://127.0.0.1:8000/api/especialidades/` (API JSON).
   - Editor: `backend/citas/models.py`, `backend/citas/migrations/0001_initial.py`, `backend/citas/api/serializers.py`, `backend/citas/views.py`, `backend/citas/api/router.py`, `backend/consultorio/urls.py`, `backend/consultorio/settings.py`.
   - Editor: `src/api/client.js`, `src/components/EspecialidadesPanel.jsx`, `src/components/CitasPanel.jsx`, `src/App.jsx`.
   - Terminal: historial Git (`git log --oneline --decorate --graph --all`).
   - Documentos: `README.md`, `REQUISITOS_AJUSTADOS.md`, `COMMITS_ENTREGA.md`.

5. **Equipo:** micrófono probado, cámara encendida, notificaciones silenciadas, zoom del navegador al 110–125 %, cronómetro visible.

6. **Plan de respaldo:** si falla internet, la app es local y funciona; si falla un puerto, reinicia el servidor. Ten capturas de la app y del historial Git por si acaso.

### 2.2. Frases de transición que puedes usar

- “Hasta aquí el servidor; ahora veamos cómo el cliente React consume estos endpoints.”
- “Con esto queda demostrado el flujo completo; paso al historial de Git.”
- “Ahora responderé las seis preguntas seleccionadas: dos de servidor, dos de cliente y dos de Git.”
- “Para cerrar, recapitulemos cómo se cubre cada criterio de la rúbrica.”

### 2.3. Verificación técnica rápida

```bash
cd backend
python manage.py check
python manage.py makemigrations --check --dry-run
cd ..
npm run lint
npm run build
```

Si todo está en orden, `check` no reporta problemas, `makemigrations --check` dice “No changes detected”, `lint` termina sin errores y `build` genera `dist/` correctamente.

---

## 3. Mapa del flujo completo (lo que debes explicar)

| Paso | Archivo | Qué explicar |
|---:|---|---|
| 1 | `backend/citas/models.py` | Modelos `Especialidad` y `CitaMedica`, relación `ForeignKey`, `on_delete=PROTECT`, estados y validaciones. |
| 2 | `backend/citas/migrations/0001_initial.py` | Cómo el modelo se convierte en tablas; diferencia entre `makemigrations` y `migrate`. |
| 3 | `backend/citas/api/serializers.py` | Conversión modelo ↔ JSON, campos calculados y validaciones de entrada. |
| 4 | `backend/citas/views.py` | `ModelViewSet` por modelo, CRUD automático, filtros y manejo de `ProtectedError`. |
| 5 | `backend/citas/api/router.py` + `backend/consultorio/urls.py` | Rutas generadas por `DefaultRouter` y conexión con el proyecto. |
| 6 | `backend/consultorio/settings.py` | `corsheaders`, middleware y `CORS_ALLOWED_ORIGINS` para el cliente Vite. |
| 7 | `src/api/client.js` | `fetch`, `Content-Type`, `JSON.stringify`, validación de `res.ok` y manejo de errores. |
| 8 | `src/components/*.jsx` + `src/App.jsx` | `useState`, `useEffect`, renderizado de tablas, formularios, carga y error. |

---

## 4. Guion minuto a minuto — versión completa (15:00)

> Sigue la columna **“Qué decir / mostrar”** como guion. No leas el código línea por línea: explica **qué hace** y **por qué existe**.

| Minuto | Sección | Qué mostrar | Qué decir / explicar | Rúbrica |
|---|---|---|---|---|
| **00:00–01:00** | Apertura | Cámara encendida y app abierta | “Buenos días. Soy **[tu nombre]**. Presento **MediCitas Popayán**, mi entrega final individual, ajustada con permiso del docente. Es una propuesta distinta al proyecto de restaurante: un gestor de citas para un consultorio médico comunitario. Usé **Django REST Framework** en el servidor y **React + Vite** en el cliente, con dos modelos relacionados. Voy a mostrar el flujo completo, la app funcionando, el historial de Git y responderé seis preguntas.” | Video / presentación |
| **01:00–02:00** | Problema e idea | `backend/citas/models.py` | “El problema es que un consultorio pequeño agenda citas de forma manual y pierde información. La solución tiene dos entidades: **Especialidad** y **CitaMedica**. Una especialidad tiene muchas citas: relación **1 a N** con `ForeignKey`. Usé `on_delete=PROTECT` para no borrar una especialidad que tenga citas. Cada cita tiene paciente, teléfono, fecha y hora, motivo, estado y observaciones.” | Servidor: modelos relacionados |
| **02:00–03:00** | Modelo y migración | `models.py` y `migrations/0001_initial.py` | “En el modelo `Especialidad` tengo nombre único, descripción y estado activo. En `CitaMedica` tengo la relación `especialidad`, los datos del paciente y estados **Programada, Atendida y Cancelada**. `makemigrations` detectó estos modelos y generó `0001_initial.py`; `migrate` aplicó ese archivo y creó las tablas en SQLite. Así el modelo pasa de código Python a base de datos real.” | Servidor: modelos y migraciones |
| **03:00–04:00** | Serializer | `backend/citas/api/serializers.py` | “El **serializer** es el puente entre el modelo y el JSON. Para salida convierte instancias a JSON; para entrada valida los datos y crea o actualiza el objeto. En `EspecialidadSerializer` agregué `total_citas`, un campo calculado con `SerializerMethodField`. En `CitaMedicaSerializer` agregué `especialidad_nombre` para mostrar el nombre y no solo el id, y una validación para que el nombre del paciente tenga al menos 3 caracteres.” | Servidor: serializers |
| **04:00–05:00** | ViewSet y router | `views.py`, `router.py`, `urls.py` | “Cada modelo tiene su **ModelViewSet**, que ya trae listar, crear, consultar, actualizar y eliminar. Además creé `ProtectedDeleteMixin`, que captura `ProtectedError` y devuelve un **400** con un mensaje claro en vez de un error 500. En `router.py` registré `especialidades` y `citas` con `DefaultRouter`; en `urls.py` incluí esas rutas bajo `/api/`. El router genera automáticamente `/api/especialidades/` y `/api/especialidades/{id}/`, y lo mismo para citas.” | Servidor: viewsets y rutas |
| **05:00–06:00** | CORS y prueba de API | `settings.py` y navegador con `/api/especialidades/` | “El cliente está en `localhost:5173` y el servidor en `127.0.0.1:8000`: son orígenes distintos. Por eso habilité **CORS** con `django-cors-headers`, agregué el middleware y configuré `CORS_ALLOWED_ORIGINS`. Sin esto, el navegador bloquearía la respuesta por la política de mismo origen. Aquí está la API respondiendo en JSON: puedo ver los campos y la relación con la especialidad.” | Servidor: CORS y API |
| **06:00–07:00** | Cliente React y fetch | `src/api/client.js`, `src/App.jsx`, `src/main.jsx` | “El cliente está en React con Vite y JSX. En `client.js` centralicé el consumo con `fetch`: una URL base configurable, cabecera `Content-Type: application/json`, `JSON.stringify` para el cuerpo, validación de `res.ok` y traducción de errores del servidor a mensajes legibles. `App.jsx` tiene dos pestañas: Especialidades y Citas. `main.jsx` monta la aplicación.” | Cliente: consumo de API |
| **07:00–08:00** | Demo: listar y crear especialidad | App en `localhost:5173` → pestaña Especialidades | “Al cargar, `useEffect` con arreglo vacío ejecuta una sola vez la consulta y muestra el estado de carga. El listado viene de la API y se guarda con `useState`. Creo una especialidad, por ejemplo **Pediatría**, con descripción y activa. Al enviar, se hace un `POST`, se actualiza la tabla y aparece la nueva fila con `total_citas = 0`. Así se cumple listar y crear.” | Cliente: listar y crear |
| **08:00–09:00** | Demo: listar y crear cita | Pestaña Citas médicas | “Ahora creo una cita para **Ana Pérez**, teléfono, especialidad **Pediatría**, fecha y hora, motivo y estado. El formulario envía el **id** de la especialidad; el serializer devuelve también `especialidad_nombre`, y por eso la tabla muestra el nombre. Con esto se evidencia la relación entre los dos modelos también en el cliente. El `POST` usa `fetch` con método POST, cabecera JSON y cuerpo serializado.” | Cliente: listar/crear + relación |
| **09:00–10:00** | Demo: editar, eliminar, carga y error | Misma app + terminal del backend | “Voy a **editar** la cita y cambiar su estado a **Atendida**; se envía un `PUT` y la tabla se actualiza. Este es el **bonus de edición**. Luego **elimino** una cita con confirmación. Si intento eliminar **Pediatría**, que tiene citas, el backend responde **400** con el mensaje de borrado protegido; eso demuestra el manejo de `PROTECT`. Para mostrar el **estado de error**, detengo el backend y recargo: la app muestra un mensaje de error en lugar de romperse. Al reiniciar, vuelve a cargar.” | Cliente: eliminar, carga/error + bonus |
| **10:00–11:00** | Historial Git | Terminal: `git log`, `git status`, `git ls-files` | “Este es el historial: **16 commits**, **8 de backend** y **8 de frontend/documentación**, con mensajes en formato `tipo(zona): descripción`. Todos son de mi autoría. Separé modelos, migración, serializers, viewsets, rutas, CORS, cliente fetch, paneles y documentación. El `.gitignore` excluye `node_modules`, `dist`, `.venv`, `db.sqlite3`, `__pycache__` y archivos personales. Aquí está `git status` limpio y `git ls-files` sin dependencias.” | Git: historial y organización |
| **11:00–11:30** | Pregunta servidor 1 | `models.py` / migraciones | **¿Qué hace `makemigrations` y qué hace `migrate`?** “`makemigrations` compara los modelos con las migraciones existentes y genera un archivo que describe los cambios. `migrate` aplica esas migraciones pendientes a la base de datos, creando o alterando tablas. En el proyecto, `makemigrations` generó `0001_initial.py` y `migrate` creó las tablas de especialidades y citas.” | Preguntas: servidor |
| **11:30–12:00** | Pregunta servidor 2 | `serializers.py` | **¿Qué función cumple el serializer entre el modelo y la respuesta JSON?** “Convierte instancias del modelo a datos nativos/JSON para la respuesta, y valida/transforma el JSON de entrada para crear o actualizar el modelo. También permite campos calculados y validaciones, como `total_citas`, `especialidad_nombre` y la longitud mínima del nombre del paciente.” | Preguntas: servidor |
| **12:00–12:30** | Pregunta cliente 1 | `EspecialidadesPanel.jsx` / `CitasPanel.jsx` | **¿Para qué sirve `useEffect` con el arreglo `[]` al consultar la API?** “Se ejecuta una sola vez después del primer render, es decir, al montar el componente. Sirve para cargar los datos iniciales sin repetir la petición en cada render. Si no se controla, se pueden producir bucles o peticiones innecesarias.” | Preguntas: cliente |
| **12:30–13:00** | Pregunta cliente 2 | `src/api/client.js` | **¿Cómo se envía un POST con `fetch`? ¿Qué encabezado y qué cuerpo lleva?** “Se usa `fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos) })`. El encabezado indica que el cuerpo es JSON; el cuerpo lleva los datos serializados. Luego se valida `res.ok` y se parsea la respuesta.” | Preguntas: cliente |
| **13:00–13:30** | Pregunta Git 1 | Terminal | **¿Qué diferencia hay entre `add`, `commit` y `push`?** “`add` prepara los cambios en el staging area; `commit` crea un snapshot en el historial local con un mensaje; `push` sube esos commits al repositorio remoto. En el proyecto usé `add` selectivo para no subir dependencias y commits separados por responsabilidad.” | Preguntas: Git |
| **13:30–14:00** | Pregunta Git 2 | `.gitignore` | **¿Para qué sirve `.gitignore` y qué no debería subirse?** “Define archivos y carpetas que Git debe ignorar. No deben subirse dependencias ni artefactos generados o sensibles: `node_modules`, `.venv`, `dist`, `db.sqlite3`, `__pycache__`, `.env` y archivos personales. Así el repositorio queda limpio y reproducible.” | Preguntas: Git |
| **14:00–15:00** | Cierre | App + resumen en pantalla | “En resumen: el **servidor** tiene dos modelos relacionados, migración, serializers, viewsets, rutas y CORS; el **cliente** lista, crea, elimina y edita con `fetch`, con estados de carga y error; el **Git** tiene commits claros y balanceados; y respondí las **seis preguntas**. Quedo atento. Muchas gracias.” | Cierre / rúbrica completa |

> **Control de tiempo:** si a las 14:30 aún no has cerrado, di el cierre corto: “Con esto cubro servidor, cliente, Git y preguntas. Gracias.” No superes 15:00.

---

## 5. Versión compacta (10:00) — solo si el docente limita el tiempo

| Minuto | Contenido |
|---|---|
| 00:00–00:40 | Presentación, proyecto individual, stack y objetivo. |
| 00:40–01:50 | Modelos, relación FK, migración y serializer (sin leer todo el código). |
| 01:50–02:50 | ViewSets, router, URLs y CORS (mostrar API JSON). |
| 02:50–03:40 | `client.js`: fetch, POST, `res.ok`, manejo de errores. |
| 03:40–05:20 | Demo: listar/crear especialidad y cita (mostrar relación). |
| 05:20–06:30 | Demo: editar (bonus), eliminar, borrado protegido y estado de error. |
| 06:30–07:15 | Historial Git, `.gitignore`, autoría y balance de commits. |
| 07:15–09:30 | 6 preguntas (2 servidor, 2 cliente, 2 Git), ~20–25 s cada una. |
| 09:30–10:00 | Cierre y recap de rúbrica. |

---

## 6. Preguntas elegidas y respuestas modelo (30–40 s cada una)

### Servidor 1 — ¿Qué hace `makemigrations` y qué hace `migrate`?

**Respuesta:** `makemigrations` compara los modelos con el historial de migraciones y genera un archivo que describe los cambios de esquema (tablas, campos, relaciones). `migrate` aplica esas migraciones pendientes a la base de datos real, creando o alterando las tablas. En este proyecto, `makemigrations` generó `citas/migrations/0001_initial.py` con `Especialidad` y `CitaMedica`, y `migrate` creó las tablas en SQLite.

### Servidor 2 — ¿Qué función cumple el serializer entre el modelo y la respuesta JSON?

**Respuesta:** Es el intermediario. En salida, toma instancias del modelo y las convierte a tipos nativos/JSON, incluyendo campos calculados como `especialidad_nombre` y `total_citas`. En entrada, valida el JSON, convierte tipos y crea o actualiza el objeto del modelo. También aplica validaciones, por ejemplo que el nombre del paciente tenga al menos 3 caracteres.

### Cliente 1 — ¿Para qué sirve `useEffect` con el arreglo `[]` al consultar la API?

**Respuesta:** Ejecuta el efecto una sola vez después del primer render, al montar el componente. Sirve para cargar los datos iniciales con `fetch` sin repetir la petición en cada render. Si se omiten las dependencias, se ejecutaría en cada render y podría causar bucles; si se agregan dependencias, se reejecuta cuando cambian.

### Cliente 2 — ¿Cómo se envía un POST con `fetch`? ¿Qué encabezado y qué cuerpo lleva?

**Respuesta:** Se llama `fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos) })`. El encabezado indica que el cuerpo es JSON y el cuerpo lleva los datos serializados. Después se valida `res.ok` y se parsea la respuesta; si hay error, se lanza una excepción para mostrarla en la interfaz.

### Git 1 — ¿Qué diferencia hay entre `add`, `commit` y `push`?

**Respuesta:** `add` prepara los cambios en el staging area; `commit` crea un snapshot en el historial local con un mensaje; `push` envía esos commits al repositorio remoto. En el proyecto usé `add` selectivo para no subir `node_modules` ni `.venv`, y commits separados por responsabilidad para que el historial sea claro.

### Git 2 — ¿Para qué sirve `.gitignore` y qué no debería subirse?

**Respuesta:** `.gitignore` define patrones que Git debe ignorar. No deben subirse dependencias ni artefactos generados o sensibles: `node_modules`, `.venv`, `dist`, `db.sqlite3`, `__pycache__`, `.env` y archivos personales. Así el repositorio queda limpio, liviano y reproducible.

---

## 7. Banco completo de preguntas (respuestas de repuesto)

> Si el docente pregunta algo distinto a las 6 seleccionadas, aquí tienes respuestas breves. Las preguntas marcadas con ✅ son las elegidas para el video.

### Servidor

- ✅ **¿Qué hace `makemigrations` y qué hace `migrate`?** Ver respuesta modelo arriba.
- ✅ **¿Qué función cumple el serializer entre el modelo y la respuesta JSON?** Ver respuesta modelo arriba.
- **¿Qué rutas genera el router al registrar un ViewSet?** `DefaultRouter` genera el listado y creación en `/recurso/`, y el detalle, actualización y eliminación en `/recurso/{pk}/`; también genera la raíz de la API y rutas para acciones `@action`. En el proyecto: `/api/especialidades/`, `/api/especialidades/{id}/`, `/api/citas/`, `/api/citas/{id}/`.
- **¿Por qué falla el `fetch` desde React si no está habilitado CORS?** Por la política de mismo origen del navegador: el cliente y el servidor tienen orígenes distintos. Sin cabeceras `Access-Control-Allow-Origin` que permitan el origen de Vite, el navegador bloquea la lectura de la respuesta por seguridad.
- **¿Qué diferencia hay entre `ModelViewSet` y `APIView`?** `ModelViewSet` implementa el CRUD completo a partir de `queryset` y `serializer_class`, con acciones `list`, `create`, `retrieve`, `update`, `partial_update` y `destroy`. `APIView` es una clase base más manual: tú defines `get`, `post`, etc. Usé `ModelViewSet` porque el CRUD es estándar y reduce código repetido.

### Cliente

- ✅ **¿Para qué sirve `useEffect` con el arreglo `[]` al consultar la API?** Ver respuesta modelo arriba.
- **¿Por qué se usa `useState` y qué pasa si se modifica la lista directamente?** `useState` guarda estado reactivo; al usar el setter, React vuelve a renderizar. Si se muta la lista directamente, cambia el contenido pero no la referencia, y React puede no detectar el cambio; por eso se usan actualizaciones inmutables y el setter.
- **¿Para qué sirve la `key` al usar `map`?** Permite que React identifique cada elemento de la lista, conserve su estado y evite re-renderizados innecesarios. Debe ser un identificador estable, como el `id` del registro, no el índice si la lista puede reordenarse.
- ✅ **¿Cómo se envía un POST con `fetch`? ¿Qué encabezado y qué cuerpo lleva?** Ver respuesta modelo arriba.
- **¿Para qué sirve validar `respuesta.ok` y usar `try/catch/finally`?** `fetch` no rechaza la promesa en errores HTTP 4xx/5xx; `res.ok` permite detectarlos y lanzar un error. `try/catch` maneja fallos de red o de parseo; `finally` se usa para apagar el estado de carga siempre, haya éxito o error.

### Git

- ✅ **¿Qué diferencia hay entre `add`, `commit` y `push`?** Ver respuesta modelo arriba.
- **¿Cómo se ve quién hizo un cambio (`git log`, `git blame`)?** `git log` muestra autor, fecha y mensaje de cada commit; `git blame archivo` muestra el último autor por línea; `git shortlog -sne` resume commits por autor.
- **¿Por qué importa escribir mensajes de `commit` claros?** Facilitan entender el historial, revisar cambios, depurar regresiones y evidenciar el trabajo. Un mensaje como `feat(backend): agrega modelos...` dice qué y dónde cambió; “cambios” o “listo” no aportan información.
- ✅ **¿Para qué sirve `.gitignore` y qué no debería subirse?** Ver respuesta modelo arriba.
- **¿Cómo traes a tu equipo los cambios que subió tu compañero (`git pull`)?** `git pull` descarga los cambios del remoto y los integra en la rama local (fetch + merge, o rebase con `--rebase`). En trabajo individual se usa antes de empezar y antes de hacer push para evitar conflictos.

---

## 8. Demostración en el navegador: guion exacto

### 8.1. Especialidades

1. Abre `http://localhost:5173`.
2. Muestra el estado de carga al recargar (si es muy rápido, menciona que existe y que se ve en el código).
3. En el formulario, crea:
   - Nombre: `Pediatría`
   - Descripción: `Atención médica para niños y adolescentes`
   - Activa: sí
4. Haz clic en **Crear**. Verifica que aparece en la tabla con `total_citas = 0`.
5. Crea una segunda especialidad, por ejemplo `Medicina general`, para tener variedad.

### 8.2. Citas médicas

1. Cambia a la pestaña **Citas médicas**.
2. Crea una cita:
   - Paciente: `Ana Pérez`
   - Teléfono: `3123456789`
   - Especialidad: `Pediatría`
   - Fecha y hora: una fecha futura
   - Motivo: `Control de crecimiento`
   - Estado: `Programada`
3. Verifica que la tabla muestra el nombre de la especialidad (no solo el id).
4. Crea una segunda cita en `Medicina general` para mostrar la relación 1 a N.

### 8.3. Bonus de edición (PUT)

1. Haz clic en **Editar** sobre una cita.
2. Cambia el estado a `Atendida` y/o el motivo.
3. Guarda y muestra que la fila se actualizó.
4. Di: “Este es el bonus de edición con `PUT`”.

### 8.4. Eliminar y borrado protegido

1. Elimina una cita y confirma.
2. Intenta eliminar `Pediatría`, que tiene citas.
3. Muestra el mensaje de error claro del backend (400) y explica `on_delete=PROTECT`.
4. Elimina primero las citas asociadas y luego la especialidad, si quieres mostrar el flujo completo.

### 8.5. Estado de error

1. Detén el backend con `Ctrl + C`.
2. Recarga la app o intenta crear un registro.
3. Muestra el mensaje de error en pantalla (no un pantallazo roto).
4. Reinicia el backend y recarga para volver a la normalidad.

---

## 9. Historial Git: qué mostrar y qué decir

Ejecuta en la terminal:

```bash
git log --oneline --decorate --graph --all
git log --stat --oneline
git status
git ls-files
```

Qué destacar:

- **16 commits**: 8 backend + 8 frontend/documentación.
- Mensajes en formato `tipo(zona): descripción`.
- Todos los commits con tu nombre y correo.
- `.gitignore` funcionando: no aparecen `node_modules`, `dist`, `.venv`, `db.sqlite3` ni `__pycache__`.
- Si entregas dos repositorios, muestra el `git log` de cada uno y aclara que el autor es el mismo.

> El plan detallado de commits está en **`COMMITS_ENTREGA.md`**.

---

## 10. Errores comunes y plan de contingencia

| Problema | Causa probable | Solución rápida |
|---|---|---|
| La app muestra error de red | Backend apagado o URL incorrecta | Verifica `runserver` y `VITE_API_URL`; recarga. |
| Error de CORS | Origen no permitido | Revisa `CORS_ALLOWED_ORIGINS` y el puerto de Vite. |
| Tabla vacía | No hay datos o migraciones pendientes | Crea datos en la app; ejecuta `migrate`. |
| No deja eliminar una especialidad | `on_delete=PROTECT` | Elimina o reasigna las citas; muestra el mensaje como evidencia. |
| `npm run dev` falla | Dependencias o Node | Ejecuta `npm install`; revisa la versión de Node. |
| `python manage.py runserver` falla | Entorno virtual o dependencias | Activa `.venv` y ejecuta `pip install -r requirements.txt`. |
| Se acaba el tiempo | Demasiada explicación de código | Prioriza demo + preguntas + Git; usa la versión de 10 min. |

---

## 11. Checklist final antes de subir el video

- [ ] El video dura **entre 10 y 15 minutos** (ideal: 14–15).
- [ ] Se ve tu rostro (bonus de cámara) y se escucha tu voz con claridad.
- [ ] Se muestra la app **funcionando**: listar, crear, editar y eliminar.
- [ ] Se muestra al menos un **estado de carga** y un **estado de error**.
- [ ] Se muestra el **borrado protegido** (especialidad con citas).
- [ ] Se explica el flujo completo: modelo → migración → serializer → viewset → router → CORS → fetch → React.
- [ ] Se muestra el **historial Git** y el `.gitignore`.
- [ ] Se responden **6 preguntas** (2 servidor, 2 cliente, 2 Git).
- [ ] Se mencionan los **enlaces de los repositorios** y tu **nombre completo**.
- [ ] El video tiene **acceso abierto** (YouTube no listado o Drive con permiso de lectura).
- [ ] Pruebas el enlace en una ventana de incógnito antes de subirlo a Moodle.
