require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("./src/middlewares/logger.middleware");
const notFound = require("./src/middlewares/not-found.middleware");
const errorHandler = require("./src/middlewares/error.middleware");

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

app.use("/api/contacto", contactoRoutes);
app.use("/api/ping", healthRoutes);
app.use("/api/productos", productosRoutes);

// Manejo de errores: van después de las rutas
app.use(notFound);
app.use(errorHandler);

// App
app.listen(PORT, () => {
  console.log(`\n🚀 App corriendo en http://localhost:${PORT}\n`);
});
