// En producción la URL de la API llega por la variable de entorno VITE_API_URL (configurada en Vercel)
export const BACKEND_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";
