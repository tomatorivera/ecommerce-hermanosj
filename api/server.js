require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("./src/middlewares/logger.middleware");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares generales
app.use(logger);
app.use(express.json());
app.use(cors());

// Rutas
const healthRoutes = require("./src/routes/health.routes");
const contactoRoutes = require("./src/routes/contact.routes");
const productosRoutes = require("./src/routes/productos.routes");

app.use("/api", healthRoutes);
app.use("/api/contacto", contactoRoutes);
app.use("/api/ping", healthRoutes);
app.use("/api/productos", productosRoutes);

// Middlewares pa rutas inexistentes
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    path: req.originalUrl,
  });
});

// Middleware centralizado
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    error: "Error interno del servidor",
  });
});

// App
app.listen(PORT, () => {
  console.log(`\n🚀 App corriendo en http://localhost:${PORT}\n`);
});
