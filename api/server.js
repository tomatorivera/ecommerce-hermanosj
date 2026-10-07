require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares generales
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Rutas
const healthRoutes = require("./src/routes/health.routes");

app.use("/api", healthRoutes);

// App
app.listen(PORT, () => {
  console.log(`\n🚀 App corriendo en http://localhost:${PORT}\n`);
});
