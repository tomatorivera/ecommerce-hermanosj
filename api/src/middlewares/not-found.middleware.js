// Responde 404 en JSON cuando ninguna ruta coincide con la petición
const notFound = (req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    path: req.originalUrl,
  });
};

module.exports = notFound;
