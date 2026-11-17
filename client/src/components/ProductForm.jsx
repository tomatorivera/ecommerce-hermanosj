import { useState } from "react";
import { mensajeDeError } from "../utils/errores.utils.js";
import "../css/ProductForm.css";

// A partir de los datos de un producto, lo transforma en su state inicial.
// Sin producto devuelve el state de un formulario vacío.
const toFormState = (producto) => ({
  nombre: producto?.nombre ?? "",
  descripcion: producto?.descripcion ?? "",
  precio: producto?.precio?.toString() ?? "",
  stock: producto?.stock?.toString() ?? "0",
  imagenUrl: producto?.imagenUrl ?? "",
});

// Devuelve la lista de errores de validación (vacía si el formulario es válido)
const validar = (form) => {
  const errores = [];
  const precio = Number(form.precio);
  const stock = Number(form.stock);

  if (form.nombre.trim() === "") errores.push("El nombre es obligatorio");

  if (form.precio.trim() === "") errores.push("El precio es obligatorio");
  else if (!Number.isFinite(precio) || precio < 0)
    errores.push("El precio debe ser un número mayor o igual a 0");

  if (form.stock.trim() !== "" && (!Number.isInteger(stock) || stock < 0))
    errores.push("El stock debe ser un número entero mayor o igual a 0");

  return errores;
};

export default function ProductForm({
  product,
  btnText = "Guardar producto",
  onSubmit,
  resetOnSubmit = false,
}) {
  const [form, setForm] = useState(() => toFormState(product));
  const [errores, setErrores] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const erroresValidacion = validar(form);
    setErrores(erroresValidacion);
    if (erroresValidacion.length > 0) {
      return;
    }

    setLoading(true);

    try {
      await onSubmit({
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim(),
        precio: Number(form.precio),
        stock: form.stock.trim() === "" ? 0 : Number(form.stock),
        imagenUrl: form.imagenUrl.trim(),
      });

      if (resetOnSubmit) {
        setForm(toFormState());
      }
    } catch (err) {
      setErrores([mensajeDeError(err)]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="nombre">Nombre:</label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        placeholder="Ej.: Mesa de roble"
        value={form.nombre}
        onChange={handleChange}
      />

      <label htmlFor="descripcion">Descripción:</label>
      <textarea
        id="descripcion"
        name="descripcion"
        placeholder="Contá materiales, medidas y detalles del producto..."
        value={form.descripcion}
        onChange={handleChange}
      />

      <div className="product-form-row">
        <div>
          <label htmlFor="precio">Precio (ARS):</label>
          <input
            type="number"
            id="precio"
            name="precio"
            placeholder="0"
            min="0"
            step="any"
            value={form.precio}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            placeholder="0"
            min="0"
            step="1"
            value={form.stock}
            onChange={handleChange}
          />
        </div>
      </div>

      <label htmlFor="imagenUrl">Imagen (ruta):</label>
      <input
        type="text"
        id="imagenUrl"
        name="imagenUrl"
        placeholder="/images/mesa-roble.png"
        value={form.imagenUrl}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Procesando..." : btnText}
      </button>

      {errores.length > 0 && (
        <div className="product-form-error" role="alert">
          {errores.length === 1 ? (
            errores[0]
          ) : (
            <ul>
              {errores.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </form>
  );
}
