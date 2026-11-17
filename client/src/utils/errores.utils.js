// fetch rechaza con TypeError cuando no hay conexión con la API (por ejemplo, si está apagada)
// lo usan homepage y el fetch de detalle de producto
export const mensajeDeError = (err) =>
  err instanceof TypeError ? "No se pudo conectar con el servidor" : err.message;
