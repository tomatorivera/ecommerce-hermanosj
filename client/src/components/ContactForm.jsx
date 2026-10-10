import { useState } from "react";
import "../css/ContactForm.css";
import { BACKEND_BASE_URL } from "../constants.js";
const INITIAL_FORM = { nombre: "", email: "", mensaje: "" };

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

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
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Nombre
        <input name="nombre" value={form.nombre} onChange={handleChange} />
      </label>

      <label>
        Email
        <input type="email" name="email" value={form.email} onChange={handleChange} />
      </label>

      <label>
        Mensaje
        <textarea name="mensaje" value={form.mensaje} onChange={handleChange} />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Enviar"}
      </button>

      {status && (
        <p className={`contact-status contact-status--${status.type}`} role="status">
          {status.text}
        </p>
      )}
    </form>
  );
}
