const express = require("express");
const router = express.Router();

// POST  /api/contacto
router.post("/", (req, res) => {
  const { nombre, email, mensaje } = req.body ?? {};

  const faltantes = Object.entries({ nombre, email, mensaje })
    .filter(([, valor]) => typeof valor !== "string" || valor.trim() === "")
    .map(([campo]) => campo);

  if (faltantes.length > 0) {
    return res.status(400).json({
      error: `Faltan campos obligatorios: ${faltantes.join(", ")}`,
    });
  }

  return res.status(201).json({
    mensaje: "Mensaje recibido correctamente",
    data: {
      nombre: nombre.trim(),
      email: email.trim(),
      mensaje: mensaje.trim(),
    },
  });
});

module.exports = router;
