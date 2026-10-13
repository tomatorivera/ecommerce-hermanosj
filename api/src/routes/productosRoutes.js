const express = require("express");
const router = express.Router();

const productos = require("../../data/productos.js");

// GET /api/productos
router.get("/", (req, res) => {
  res.json(productos);
});
router.get("/:id", (req, res, next) => {
  const producto = productos.find((u) => u.id === parseInt(req.params.id));
  if (!producto) {
    const error = new Error("Producto no Encontrado");
    error.status = 404;
    return next(error);
  }
  res.json({ message: `Obteniendo información del producto con ID: ${req.params.id}` });
});

module.exports = router;
