# Plan de commits detallados — Entrega final MediCitas Popayán

**Proyecto:** MediCitas Popayán — gestor de citas para consultorio médico comunitario  
**Modalidad:** individual (1 integrante), ajustada con permiso del docente  
**Objetivo de este archivo:** dejar un historial Git **claro, balanceado y trazable** que evidencie el trabajo de punta a punta y permita alcanzar la máxima nota en el criterio **Git (0,8)** y en la demostración del video.

> **Importante:** este plan está pensado para el estado final del proyecto en este directorio. No es necesario que cada commit intermedio sea ejecutable; lo que se evalúa es la **trazabilidad**, la **claridad de los mensajes** y la **separación lógica** del trabajo. El estado final sí debe ejecutar correctamente.

---

## 1. Criterios que cubre este plan

| Criterio de la rúbrica | Cómo se evidencia con los commits |
|---|---|
| Servidor: modelos relacionados, migraciones, serializers, viewsets, rutas y CORS (1,2) | Commits 1–8, separados por responsabilidad backend |
| Cliente: listar, crear y eliminar, con estados de carga y error (1,0) | Commits 9–13, con CRUD y manejo de estados |
| Git: repos/carpeta organizada, commits propios y balanceados, mensajes claros (0,8) | 16 commits: 8 backend + 8 frontend/docs, formato `tipo(zona): descripción` |
| Video: flujo completo y demostración (0,8) | El historial permite mostrar `git log` y explicar cada parte |
| Preguntas individuales (1,2) | El código queda dividido por temas fáciles de explicar |
| Bonus: editar con PUT/PATCH (+0,3) | Implementado en los paneles de especialidades y citas |
| Bonus: cámara encendida (+0,2) | Se graba con cámara si es posible |

**Resultado:** 16 commits, con al menos 8 en backend y 8 en frontend/documentación. Supera el mínimo de 6 commits y mantiene el equilibrio exigido.

---

## 2. Antes de empezar (configuración)

Abre una terminal en la raíz del proyecto:

```bash
cd "C:\Users\Admin\Downloads\my-project\my-project"
```

Configura tu identidad real de Git (no uses datos de otra persona):

```bash
git config --global user.name "KEVINDEVELOPERJS"
git config --global user.email "kevin.rivera.h@uniautonoma.edu.co"
```

Verifica que estás en el directorio correcto:

```bash
pwd
git status
```

> Si el directorio **no** es un repositorio Git, inicialízalo una sola vez:
>
> ```bash
> git init
> git branch -M main
> ```

Antes de hacer el primer commit, comprueba que los archivos pesados o ajenos estén ignorados:

```bash
git check-ignore -v node_modules dist .venv backend/db.sqlite3 backend/__pycache__
```

Si algún comando no muestra nada, revisa el `.gitignore` antes de continuar.

> **Regla de oro:** no uses `git add .` ni `git add -A`. Agrega únicamente los archivos indicados en cada commit para evitar subir `node_modules`, `.venv`, `dist`, bases de datos o archivos personales.

---

## 3. Mapa general de commits

| # | Mensaje del commit | Zona | Archivos principales |
|---:|---|---|---|
| 1 | `chore(backend): inicializa estructura del proyecto Django` | Backend | `backend/manage.py`, `backend/consultorio/__init__.py`, `asgi.py`, `wsgi.py` |
| 2 | `feat(backend): crea la app citas y su configuración` | Backend | `backend/citas/__init__.py`, `apps.py` |
| 3 | `feat(backend): agrega modelos Especialidad y CitaMedica con ForeignKey` | Backend | `backend/citas/models.py` |
| 4 | `feat(backend): genera migración inicial de la base de datos` | Backend | `backend/citas/migrations/__init__.py`, `0001_initial.py` |
| 5 | `feat(backend): implementa serializers para la API REST` | Backend | `backend/citas/api/__init__.py`, `serializers.py` |
| 6 | `feat(backend): agrega viewsets con CRUD y borrado protegido` | Backend | `backend/citas/views.py` |
| 7 | `feat(backend): registra endpoints de especialidades y citas con router` | Backend | `backend/citas/api/router.py`, `backend/consultorio/urls.py` |
| 8 | `feat(backend): configura CORS, admin y dependencias del servidor` | Backend | `backend/consultorio/settings.py`, `admin.py`, `requirements.txt`, `.gitignore` |
| 9 | `chore(frontend): configura cliente React con Vite y punto de entrada` | Frontend | `package.json`, `package-lock.json`, `vite.config.js`, `eslint.config.js`, `index.html`, `public/favicon.svg`, `src/main.jsx` |
| 10 | `feat(frontend): crea cliente fetch reutilizable para consumir la API` | Frontend | `src/api/client.js` |
| 11 | `feat(frontend): implementa CRUD de especialidades con carga y error` | Frontend | `src/components/EspecialidadesPanel.jsx` |
| 12 | `feat(frontend): implementa CRUD de citas médicas con relación a especialidad` | Frontend | `src/components/CitasPanel.jsx` |
| 13 | `feat(frontend): integra navegación, estilos y experiencia de usuario` | Frontend | `src/App.jsx`, `src/index.css` |
| 14 | `docs(entrega): documenta requisitos ajustados y ejecución del proyecto` | Docs | `README.md`, `REQUISITOS_AJUSTADOS.md` |
| 15 | `chore(repo): configura .gitignore para excluir dependencias y artefactos` | Repo | `.gitignore` |
| 16 | `docs(entrega): agrega guía de video y plan detallado de commits` | Docs | `GUIA_ENTREGA_VIDEO.md`, `COMMITS_ENTREGA.md` |

---

## 4. Comandos paso a paso (opción recomendada: monorepo)

> Esta opción es la más simple para el directorio actual: un solo repositorio con `backend/` y el cliente React en la raíz. Si el docente exige dos enlaces separados, usa la **Opción B** del apartado 6.

### Commit 1 — estructura base del backend

```bash
git add backend/manage.py backend/consultorio/__init__.py backend/consultorio/asgi.py backend/consultorio/wsgi.py
git commit -m "chore(backend): inicializa estructura del proyecto Django"
```

**Qué se evidencia:** creación del proyecto servidor y punto de entrada (`manage.py`, ASGI/WSGI).

### Commit 2 — app `citas`

```bash
git add backend/citas/__init__.py backend/citas/apps.py
git commit -m "feat(backend): crea la app citas y su configuración"
```

**Qué se evidencia:** organización modular del servidor (app separada para la lógica de citas).

### Commit 3 — modelos relacionados

```bash
git add backend/citas/models.py
git commit -m "feat(backend): agrega modelos Especialidad y CitaMedica con ForeignKey"
```

**Qué se evidencia:** los dos modelos relacionados (`Especialidad` 1 → N `CitaMedica`), validaciones, estados y `on_delete=PROTECT`.

### Commit 4 — migración inicial

```bash
git add backend/citas/migrations/__init__.py backend/citas/migrations/0001_initial.py
git commit -m "feat(backend): genera migración inicial de la base de datos"
```

**Qué se evidencia:** el paso de modelos a tablas reales; requisito explícito de migración por modelo.

### Commit 5 — serializers

```bash
git add backend/citas/api/__init__.py backend/citas/api/serializers.py
git commit -m "feat(backend): implementa serializers para la API REST"
```

**Qué se evidencia:** transformación modelo ↔ JSON y validaciones de entrada.

### Commit 6 — viewsets y CRUD

```bash
git add backend/citas/views.py
git commit -m "feat(backend): agrega viewsets con CRUD y borrado protegido"
```

**Qué se evidencia:** `ModelViewSet` por cada modelo, filtros de citas y respuesta clara ante `ProtectedError`.

### Commit 7 — router y rutas

```bash
git add backend/citas/api/router.py backend/consultorio/urls.py
git commit -m "feat(backend): registra endpoints de especialidades y citas con router"
```

**Qué se evidencia:** rutas generadas con `DefaultRouter` y conexión desde `urls.py`.

### Commit 8 — CORS, admin y dependencias

```bash
git add backend/consultorio/settings.py backend/citas/admin.py backend/requirements.txt backend/.gitignore
git commit -m "feat(backend): configura CORS, admin y dependencias del servidor"
```

**Qué se evidencia:** `django-cors-headers`, orígenes permitidos para Vite, panel admin y dependencias reproducibles.

### Commit 9 — base del cliente React

```bash
git add package.json package-lock.json vite.config.js eslint.config.js index.html public/favicon.svg src/main.jsx
git commit -m "chore(frontend): configura cliente React con Vite y punto de entrada"
```

**Qué se evidencia:** cliente separado con Vite + React + JSX y punto de montaje (`main.jsx`).

### Commit 10 — cliente fetch

```bash
git add src/api/client.js
git commit -m "feat(frontend): crea cliente fetch reutilizable para consumir la API"
```

**Qué se evidencia:** consumo HTTP con `fetch`, manejo de JSON, errores y métodos GET/POST/PUT/DELETE.

### Commit 11 — CRUD de especialidades

```bash
git add src/components/EspecialidadesPanel.jsx
git commit -m "feat(frontend): implementa CRUD de especialidades con carga y error"
```

**Qué se evidencia:** listar, crear, editar y eliminar especialidades; estados de carga/error.

### Commit 12 — CRUD de citas médicas

```bash
git add src/components/CitasPanel.jsx
git commit -m "feat(frontend): implementa CRUD de citas médicas con relación a especialidad"
```

**Qué se evidencia:** listar, crear, editar y eliminar citas; selector de especialidad (relación FK); estados de carga/error.

### Commit 13 — integración visual

```bash
git add src/App.jsx src/index.css
git commit -m "feat(frontend): integra navegación, estilos y experiencia de usuario"
```

**Qué se evidencia:** navegación entre paneles, estilos, badges de estado y presentación general.

### Commit 14 — documentación funcional

```bash
git add README.md REQUISITOS_AJUSTADOS.md
git commit -m "docs(entrega): documenta requisitos ajustados y ejecución del proyecto"
```

**Qué se evidencia:** justificación del ajuste individual, nueva idea de proyecto, endpoints y pasos de ejecución.

### Commit 15 — `.gitignore`

```bash
git add .gitignore
git commit -m "chore(repo): configura .gitignore para excluir dependencias y artefactos"
```

**Qué se evidencia:** repositorio limpio, sin `node_modules`, `.venv`, `db.sqlite3`, `dist`, `__pycache__` ni archivos ajenos.

### Commit 16 — guía de video y plan de commits

```bash
git add GUIA_ENTREGA_VIDEO.md COMMITS_ENTREGA.md
git commit -m "docs(entrega): agrega guía de video y plan detallado de commits"
```

**Qué se evidencia:** preparación de la sustentación, cobertura de la rúbrica y guion minuto a minuto.

---

## 5. Verificación y evidencias para el video

### 5.1. Revisar el historial

```bash
git log --oneline --decorate --graph --all
git log --stat --oneline
```

Debes ver **16 commits** con mensajes claros. Para la cámara del video, muestra esta salida y explica que separaste backend, frontend y documentación.

### 5.2. Verificar archivos versionados

```bash
git ls-files
```

Confirma que **no** aparecen:

- `node_modules/`
- `dist/`
- `.venv/`
- `backend/db.sqlite3`
- `backend/**/__pycache__/`
- `*.pptx`, `*.pdf`, `*.docx` ni archivos personales

### 5.3. Verificar el estado final

```bash
git status
```

Idealmente debe decir `nothing to commit, working tree clean` (o solo archivos locales ignorados).

### 5.4. Evidencia de autoría individual

```bash
git log --format="%h %an <%ae> %s" --reverse
```

Todos los commits deben tener **tu nombre y tu correo**. Esto sustenta la autoría individual ante el docente.

### 5.5. Publicar el repositorio

```bash
git remote add origin https://github.com/TU-USUARIO/medicitas-popayan.git
git push -u origin main
```

Si el repositorio es privado, compártelo con el docente o hazlo público antes de la entrega.

---

## 6. Opción B: dos repositorios separados (solo si el docente lo exige)

El enunciado original pide dos repositorios. Si el docente **no** acepta monorepo, haz lo siguiente **antes de crear commits**:

### 6.1. Repositorio del servidor (`backend/`)

```bash
cd backend
git init
git branch -M main
```

Aplica los commits 1–8 de este documento, pero **quitando el prefijo `backend/`** de las rutas. Ejemplo:

```bash
git add manage.py consultorio/__init__.py consultorio/asgi.py consultorio/wsgi.py
git commit -m "chore(backend): inicializa estructura del proyecto Django"
```

Al final:

```bash
git remote add origin https://github.com/TU-USUARIO/medicitas-backend.git
git push -u origin main
```

### 6.2. Repositorio del cliente (raíz del proyecto)

Vuelve a la raíz y evita que el repositorio del cliente incluya la carpeta `backend/` (que ya tiene su propio `.git`):

```bash
cd ..
git init
git branch -M main
```

Oculta `backend/` solo en este repositorio local:

```bash
Add-Content .git/info/exclude "`n/backend/"
```

Luego aplica los commits 9–16 con las mismas rutas del cliente. Al final:

```bash
git remote add origin https://github.com/TU-USUARIO/medicitas-frontend.git
git push -u origin main
```

> Si usas Git Bash en lugar de PowerShell, el comando equivalente es:
>
> ```bash
> printf "\n/backend/\n" >> .git/info/exclude
> ```

---

## 7. Reglas de oro para no perder puntos

1. **No uses mensajes genéricos** como “cambios”, “listo”, “avance” o “asdf”.
2. **No hagas un solo commit gigante** con todo el proyecto.
3. **No subas** `node_modules`, `.venv`, `venv`, `db.sqlite3`, `__pycache__`, `dist` ni archivos personales.
4. **No falsees fechas** ni autores con variables de entorno; el historial debe ser real y tuyo.
5. **Haz commits pequeños y coherentes**: un commit debe contar una idea.
6. **Antes de cada commit**, revisa qué vas a incluir:

   ```bash
   git status --short
   git diff --cached --stat
   ```

7. **Después del último commit**, verifica que el proyecto siga funcionando:

   ```bash
   cd backend
   python manage.py check
   python manage.py makemigrations --check --dry-run
   cd ..
   npm run lint
   npm run build
   ```

---

## 8. Relación con la guía del video

Para la sustentación, usa:

- **`GUIA_ENTREGA_VIDEO.md`**: guion minuto a minuto (15 minutos máximos), versión compacta de 10 minutos, checklist de demostración y respuestas de las 6 preguntas.
- **`REQUISITOS_AJUSTADOS.md`**: justificación del cambio a modalidad individual y a la nueva idea de proyecto.

Con este plan de commits y la guía de video cubres los **5,0 puntos** de la rúbrica y los **bonos** de edición (+0,3) y cámara (+0,2).
