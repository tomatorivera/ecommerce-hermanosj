import { Link } from "react-router-dom";

import "../css/home.css";

const VALORES = [
  {
    titulo: "Manos expertas",
    texto: "Cada pieza cuenta la historia de manos expertas y materiales nobles.",
  },
  {
    titulo: "Maderas nativas",
    texto: "Algarrobo, quebracho y caldén de bosques responsables argentinos.",
  },
  {
    titulo: "Hechos para quedarse",
    texto: "Muebles que envejecen con gracia y se heredan, con 10 años de garantía.",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="home-hero">
        <h1 className="home-hero__titulo">Muebles con historia</h1>
        <p className="home-hero__texto">
          Redescubrimos el arte de crear piezas que no solo sirven, sino que alimentan el alma.
          Calidez de otra época, pensada para vivir hoy.
        </p>
        <Link to="/productos" className="home-hero__cta">
          Ver productos
        </Link>
      </section>

      <section className="home-valores">
        {VALORES.map(({ titulo, texto }) => (
          <article key={titulo} className="home-valor">
            <h2 className="home-valor__titulo">{titulo}</h2>
            <p>{texto}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
