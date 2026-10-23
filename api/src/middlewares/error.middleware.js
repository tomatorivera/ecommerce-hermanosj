// Manejador centralizado: cualquier error lanzado en una ruta termina acá y se responde en JSON
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  const status = error.status || 500;

  if (status >= 500) console.error(error);

  res.status(status).json({
    error: status < 500 ? error.message : "Error interno del servidor",
  });
};

module.exports = errorHandler;
