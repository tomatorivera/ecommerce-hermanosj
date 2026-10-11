// Registra en la terminal el método y la URL de cada petición
const logger = (req, res, next) => {
  const fecha = new Date().toLocaleString("es-AR");

  console.log(`[${fecha}] ${req.method} ${req.originalUrl}`);
  next();
};

module.exports = logger;
