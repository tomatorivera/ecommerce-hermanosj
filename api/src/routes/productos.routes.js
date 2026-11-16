const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");

// GET /api/productos
router.get("/", async (req, res, next) => {
  try {
    const productos = await Product.find({});
    res.json(productos);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// GET /api/productos/:id
router.get("/:id", async (req, res, next) => {
  try {
    const producto = await Product.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    console.log(error);
    error.status = 400;
    return next(error);
  }
});

// POST /api/productos
router.post("/", async (req, res, next) => {
  try {
    const datosNuevoProducto = req.body;
    console.log(`Nuevo producto: ${JSON.stringify(datosNuevoProducto)}`);

    const nuevoProducto = new Product(datosNuevoProducto);
    const productoGuardado = await nuevoProducto.save();

    res.status(201).json({
      mensaje: "Producto creado",
      producto: productoGuardado,
    });
  } catch (error) {
    console.log(error);
    error.status = 400;
    return next(error);
  }
});

// PUT /api/productos/:id
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const cambios = req.body;

  try {
    const productoActualizado = await Product.findByIdAndUpdate(id, cambios, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!productoActualizado) {
      const error = new Error("Producto no encontrado");
      error.status = 404;
      return next(error);
    }

    res.json(productoActualizado);
  } catch (error) {
    console.log(error);
    error.status = 400;
    return next(error);
  }
});

// DELETE /api/productos/:id
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const productoEliminado = await Product.findByIdAndDelete(id);
    if (!productoEliminado) {
      const error = new Error("Producto no encontrado");
      error.status = 404;
      return next(error);
    }

    res.status(204);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

module.exports = router;
