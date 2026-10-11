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

app.use("/api", healthRoutes);

// Middlewares pa rutas inexistentes
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada", 
    path: req.originalUrl
  });
})

// Middleware centralizado
app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    error: "Error interno del servidor"
  });
})

// App
app.listen(PORT, () => {
  console.log(`\n🚀 App corriendo en http://localhost:${PORT}\n`);
});
