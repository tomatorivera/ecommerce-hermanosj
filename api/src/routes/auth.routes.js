const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

// POST /api/auth/registro
router.post("/registro", async (req, res, next) => {
    try {
        const { nombre, email, password } = req.body;

        // Validar campos obligatorios
        if (!nombre || !email || !password) {
            return res.status(400).json({
                error: "Todos los campos son obligatorios",
            });
        }

        // Validar contraseña
        if (password.length < 6) {
            return res.status(400).json({
                error: "La contraseña debe tener al menos 6 caracteres",
            });
        }

        // Verificar si el email ya existe
        const usuarioExistente = await User.findOne({
            email: email.trim().toLowerCase(),
        });

        if (usuarioExistente) {
            return res.status(409).json({
                error: "El email ya está registrado",
            });
        }

        // Hashear contraseña
        const passwordHasheada = await bcrypt.hash(password, 10); // hasheo la contraseña

        // Crear usuario
        const nuevoUsuario = new User({
            nombre,
            email,
            password: passwordHasheada,
        });

        const usuarioGuardado = await nuevoUsuario.save();

        // Responder sin exponer la contraseña
        res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            usuario: {
                id: usuarioGuardado._id,
                nombre: usuarioGuardado.nombre,
                email: usuarioGuardado.email,
            },
        });
    } catch (error) {
        // Manejar email duplicado
        if (error.code === 11000) {
            return res.status(409).json({
                error: "El email ya está registrado",
            });
        }

        console.log(error);
        error.status = 400;
        return next(error);
    }
});

module.exports = router;
