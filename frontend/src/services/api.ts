import axios from 'axios';
import { User } from '../types/types';

// Define la URL base de la API, que puede venir de una variable de entorno
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Configura la instancia de Axios con la URL base
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Middleware de Axios para añadir el token JWT a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuestas para manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Puedes manejar los errores globalmente aquí
    if (error.response) {
      // Errores de respuesta de la API
      if (error.response.status === 401) {
        // Por ejemplo, redirigir al login si el token expira
        window.location.href = '/login';
      }
      if (error.response.status === 403) {
        // Manejar errores de autorización
        console.error('No tienes permiso para realizar esta acción.');
      }
    } else if (error.request) {
      // Errores de solicitud sin respuesta
      console.error(
        'No se recibió respuesta del servidor. Verifica tu conexión.'
      );
    } else {
      // Errores de configuración u otros
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);
// Login del usuario
export const login = async (email: string, password: string) => {
  return await api.post('/auth/login', { email, password });
};

// Registro del usuario
export const register = async (
  email: string,
  password: string,
  fullName: string
) => {
  return await api.post('/auth/register', { email, password, fullName });
};

// Obtener lista de espacios
export const getSpaces = async () => {
  return await api.get('/spaces');
};

// Crear un nuevo espacio
export const createSpace = async (spaceData: {
  name: string;
  description?: string;
}) => {
  return await api.post('/spaces/space', spaceData);
};

// Actualizar un espacio existente
export const updateSpace = async (
  spaceId: number,
  spaceData: { name?: string; description?: string }
) => {
  return await api.put(`/spaces/space/${spaceId}`, spaceData);
};

// Eliminar un espacio
export const deleteSpace = async (spaceId: number) => {
  return await api.delete(`/spaces/space/${spaceId}`);
};

// Obtener reservas del usuario autenticado
export const getUserReservations = async () => {
  return await api.get('/reservations');
};

// Crear una nueva reserva
export const createReservation = async (reservationData: {
  spaceId: number;
  startTime: string;
  endTime: string;
  userId: string;
}) => {
  return await api.post('/reservations/reservation', reservationData);
};

// Cancelar una reserva
export const cancelReservation = async (reservationId: number) => {
  return await api.delete(`/reservations/reservation/${reservationId}`);
};

// Obtener reservas por usuario (nueva función)
export const getReservationByUser = async (userId: string) => {
  return await api.get(`/reservations/user/${userId}`);
};

function parseJwt(token: string) {
  if (!token) {
    return;
  }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');

  if (!token) return null;
  const decodedToken = parseJwt(token);

  return decodedToken.userId;
};

// Obtener todos los usuarios
export const getAllUsers = async () => {
  return await api.get('/users');
};

// Eliminar un usuario
export const deleteUser = async (userId: number) => {
  return await api.delete(`/users/user/${userId}`);
};

export const updateUser = async (userId: number, userData: User) => {
  return await api.put(`/users/user/${userId}`, userData);
};
