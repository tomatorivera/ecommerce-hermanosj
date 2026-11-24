
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../constants.js";

import "../css/registro.css";

const INITIAL_FORM = {
    nombre: "",
    email: "",
    password: "",
    confirmarPassword: "",
};

export default function RegisterPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState(INITIAL_FORM);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
        ...prev,
        [name]: value,
        }));
    };


const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus(null);

    // Comprobar que las contraseñas coincidan
    if (form.password !== form.confirmarPassword) {
        setStatus({
        type: "error",
        text: "Las contraseñas no coinciden",
        });
        return;
    }

    setLoading(true);

    try {
        const res = await fetch(`${BACKEND_BASE_URL}/auth/registro`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombre: form.nombre,
            email: form.email,
            password: form.password,
        }),
        });

        const data = await res.json();

        if (res.ok) {
            setStatus({ type: "success", text: data.mensaje });
            setForm(INITIAL_FORM);

            navigate("/login");

        } else {
            setStatus({
                type: "error",
                text: data.error || "No se pudo completar el registro",
            });
        }
    } catch {
        setStatus({
        type: "error",
        text: "No se pudo conectar con el servidor",
        });
    } finally {
        setLoading(false);
    }
};

    return (
        <main className="registro-page">
        <section className="card registro-card">
            <h1>Crear cuenta</h1>
            <p>Registrate en Hermanos Jota y disfrutá de nuestros productos.</p>

            <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="nombre">Nombre completo:</label>
            <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Tu nombre"
                value={form.nombre}
                onChange={handleChange}
                required
            />

            <label htmlFor="email">Correo electrónico:</label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="tu@email.com"
                value={form.email}
                onChange={handleChange}
                required
            />

            <label htmlFor="password">Contraseña:</label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Mínimo 6 caracteres"
                value={form.password}
                onChange={handleChange}
                minLength={6}
                required
            />

            <label htmlFor="confirmarPassword">Confirmar contraseña:</label>
            <input
                type="password"
                id="confirmarPassword"
                name="confirmarPassword"
                placeholder="Repetí tu contraseña"
                value={form.confirmarPassword}
                onChange={handleChange}
                required
            />

            <button type="submit" className="btn btn-primary" disabled={loading} >
                {loading ? "Registrando..." : "Crear cuenta"}
            </button>

            {status && (
            <p className={`alert alert--${status.type}`} role="status">
                {status.text}
            </p>
            )}

            </form>

            <p className="registro-login">
            ¿Ya tenés una cuenta? <Link to="/login">Iniciá sesión</Link>
            </p>
        </section>
        </main>
    );
}
