import { useState } from "react";
import { BACKEND_BASE_URL } from "../constants.js";

const INITIAL_FORM = { nombre: "", email: "", mensaje: "" };

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const isFormComplete =
    form.nombre.trim() !== "" && form.email.trim() !== "" && form.mensaje.trim() !== "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(`${BACKEND_BASE_URL}/contacto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus({ type: "success", text: data.mensaje });
        setForm(INITIAL_FORM);
      } else {
        setStatus({ type: "error", text: data.error });
      }
    } catch {
      setStatus({ type: "error", text: "No se pudo conectar con el servidor" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-form-card" aria-labelledby="form-title">
      <h2 id="form-title">Escribinos</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
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

        <label htmlFor="mensaje">Mensaje:</label>
        <textarea
          id="mensaje"
          name="mensaje"
          placeholder="Contanos en qué podemos ayudarte..."
          value={form.mensaje}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading || !isFormComplete}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 2 11 13" />
            <path d="M22 2 15 22l-4-9-9-4 20-7z" />
          </svg>
          {loading ? "Enviando..." : "Enviar mensaje"}
        </button>

        {status && (
          <p className={`contact-status contact-status--${status.type}`} role="status">
            {status.text}
          </p>
        )}
      </form>
    </section>
  );
}
