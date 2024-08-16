
# Space Reservation System

## Descripción

Space Reservation System es una aplicación web full stack para gestionar reservas de espacios, como salas de reuniones, oficinas compartidas, y más. La aplicación está construida utilizando React con TypeScript para el frontend y Node.js con Express para el backend, y utiliza Supabase como base de datos.

## Estructura del Proyecto

```
/space-reservation-system
│
├── /backend
│   ├── /config
│   │   ├── supabase.js            # Configuración para conectar con Supabase
│   │   └── jwt.js                 # Configuración de JWT
│   ├── /controllers
│   │   ├── authController.js      # Lógica de autenticación (registro, login)
│   │   ├── spaceController.js     # Lógica para manejo de espacios
│   │   └── reservationController.js # Lógica para manejo de reservas
│   ├── /middleware
│   │   ├── authMiddleware.js      # Middleware de autenticación
│   │   └── roleMiddleware.js      # Middleware para roles (admin, user)
│   ├── /models
│   │   └── index.js               # Definición de modelos (si usas ORM) o consultas SQL
│   ├── /routes
│   │   ├── authRoutes.js          # Rutas para autenticación
│   │   ├── spaceRoutes.js         # Rutas para espacios
│   │   └── reservationRoutes.js   # Rutas para reservas
│   ├── /utils
│   │   └── validators.js          # Funciones de validación y utilidad
│   ├── .env                       # Variables de entorno (agrega aquí la configuración de Supabase)
│   ├── server.js                  # Punto de entrada del backend
│   └── package.json               # Dependencias y scripts del backend
│
├── /frontend
│   ├── /public
│   │   └── index.html             # Plantilla HTML principal
│   ├── /src
│   │   ├── /components
│   │   │   ├── SpaceList.js       # Componente para listar espacios
│   │   │   ├── ReservationForm.js # Componente para crear/editar reservas
│   │   │   └── Navbar.js          # Componente de navegación
│   │   ├── /context
│   │   │   └── AuthContext.js     # Contexto para manejar autenticación y estado global
│   │   ├── /pages
│   │   │   ├── LoginPage.js       # Página de inicio de sesión
│   │   │   ├── RegisterPage.js    # Página de registro
│   │   │   ├── Dashboard.js       # Página principal del usuario
│   │   │   ├── SpacePage.js       # Página para ver un espacio en detalle
│   │   │   └── AdminPage.js       # Página de administración (solo para admins)
│   │   ├── /services
│   │   │   ├── api.js             # Módulo para manejar peticiones HTTP al backend
│   │   │   └── auth.js            # Módulo para manejar autenticación y tokens
│   │   ├── /styles
│   │   │   └── main.css           # Estilos globales de la aplicación
│   │   ├── App.js                 # Componente principal de la aplicación
│   │   ├── index.js               # Punto de entrada de React
│   │   ├── routes.js              # Configuración de rutas del frontend
│   │   └── setupTests.js          # Configuración para pruebas unitarias (si aplicable)
│   ├── .env                       # Variables de entorno (configuración de la API y Supabase)
│   ├── package.json               # Dependencias y scripts del frontend
│   └── webpack.config.js          # Configuración de Webpack (opcional, si no usas CRA)
│
├── /shared                        # Directorio para código compartido entre frontend y backend
│   └── /utils
│       └── dateUtils.js           # Funciones compartidas (e.g., formateo de fechas)
│
├── .gitignore                     # Archivos y carpetas que Git debe ignorar
├── README.md                      # Documentación del proyecto
└── package.json                   # Scripts y dependencias compartidas en el monorepo

```

### Requisitos Previos

- **Node.js** (>= 14.x)
- **npm** (>= 6.x) o **yarn** (>= 1.22.x)
- **Supabase**: Crear un proyecto en [Supabase](https://supabase.io/) y obtener la URL de la API y la clave pública (anon/public key).

### Instalación

1. Clonar el repositorio:

    ```bash
    git clone <REPOSITORY_URL>
    cd space-reservation-system
    ```

2. Instalar dependencias:

    - Para el backend:

      ```bash
      cd backend
      npm install
      ```

    - Para el frontend:

      ```bash
      cd ../frontend
      npm install
      ```

3. Crear archivos `.env` en `backend` y `frontend` con la configuración de Supabase y JWT.

    - Ejemplo de `.env` para el backend:

      ```
      SUPABASE_URL=https://your-supabase-url.supabase.co
      SUPABASE_KEY=your-anon-key
      JWT_SECRET=your-jwt-secret
      ```

    - Ejemplo de `.env` para el frontend:

      ```
      REACT_APP_SUPABASE_URL=https://your-supabase-url.supabase.co
      REACT_APP_SUPABASE_KEY=your-anon-key
      ```

4. Ejecutar la aplicación:

    - Para el backend:

      ```bash
      cd backend
      npm start
      ```

    - Para el frontend:

      ```bash
      cd ../frontend
      npm start
      ```

5. Acceder a la aplicación en `http://localhost:3000`.

### Scripts Disponibles

- `npm start`: Inicia la aplicación en modo de desarrollo.
- `npm run build`: Construye la aplicación para producción.

### Estructura de Archivos

#### Backend

- `/config`: Configuraciones para Supabase y JWT.
- `/controllers`: Lógica de negocio para autenticación, espacios y reservas.
- `/middleware`: Middleware de autenticación y roles.
- `/routes`: Rutas para la API.
- `/models`: Modelos de datos.

#### Frontend

- `/components`: Componentes reutilizables como formularios y listas.
- `/context`: Contexto global para autenticación.
- `/pages`: Páginas de la aplicación.
- `/services`: Servicios para manejar peticiones HTTP.
- `/styles`: Estilos globales.

### Despliegue

Para desplegar la aplicación, puedes usar servicios como [Heroku](https://www.heroku.com/) para el backend y [Netlify](https://www.netlify.com/) o [Vercel](https://vercel.com/) para el frontend.

### Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

### Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para cualquier mejora o bug.
