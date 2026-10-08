require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares generales
app.use(express.json());
app.use(cors());

// Rutas
const healthRoutes = require("./src/routes/health.routes");
const productosRoutes = require("./src/routes/producto.routes");

app.use("/api/ping", healthRoutes);
app.use("/api/productos", productosRoutes);

// App
app.listen(PORT, () => {
  console.log(`\n🚀 App corriendo en http://localhost:${PORT}\n`);
});
