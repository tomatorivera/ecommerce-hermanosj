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

app.use("/api", healthRoutes);
app.use("/api/contacto", contactoRoutes);

// App
app.listen(PORT, () => {
  console.log(`\n🚀 App corriendo en http://localhost:${PORT}\n`);
});
