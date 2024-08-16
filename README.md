
# Space Reservation System

## Descripción
Space Reservation System es una aplicación web full stack para gestionar reservas de espacios, como salas de reuniones, oficinas compartidas, y más. La aplicación está construida utilizando React para el frontend y Node.js con Express para el backend, y utiliza Supabase como base de datos.

## Estructura del Proyecto

```
/space-reservation-system
│
├── /backend
├── /frontend
└── /shared
```

### Requisitos Previos

- **Node.js** (>= 14.x)
- **npm** (>= 6.x) o **yarn** (>= 1.22.x)
- **Supabase**: Crear un proyecto en [Supabase](https://supabase.io/) y obtener la URL de la API y la clave pública (anon/public key).

### Instalación

1. Clonar el repositorio:
    ```bash
    git clone <REP[OSITORY>
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
