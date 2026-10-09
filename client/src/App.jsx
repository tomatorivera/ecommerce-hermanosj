import { useState } from "react";
import ProductList from "./components/ProductList";

import "./css/homepage.css";

function App() {
  // Mock
  const productos = [
    {
      id: "aparador-uspallata",
      nombre: "Aparador Uspallata",
      imagen: "/images/aparador-uspallata.png",
      precio: 40000,
      descripcion:
        "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
      detalles: [
        { titulo: "Medidas", descripcion: "180 x 45 x 75 cm" },
        {
          titulo: "Materiales",
          descripcion: "Nogal macizo FSC®, herrajes de latón",
        },
        { titulo: "Acabado", descripcion: "Aceite natural ecológico" },
        { titulo: "Peso", descripcion: "68 kg" },
        { titulo: "Capacidad", descripcion: "6 compartimentos interiores" },
      ],
    },
    {
      id: "biblioteca-recoleta",
      nombre: "Biblioteca Recoleta",
      precio: 65300,
      imagen: "/images/biblioteca-recoleta.png",
      descripcion:
        "Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro. Perfecta para colecciones y objetos de diseño, su diseño versátil se adapta a cualquier espacio contemporáneo con elegancia funcional.",
      detalles: [
        { titulo: "Medidas", descripcion: "100 x 35 x 200 cm" },
        {
          titulo: "Materiales",
          descripcion: "Estructura de acero, estantes de roble",
        },
        { titulo: "Acabado", descripcion: "Laca mate ecológica" },
        { titulo: "Capacidad", descripcion: "45 kg por estante" },
        { titulo: "Módulos", descripcion: "5 estantes ajustables" },
      ],
    },
    {
      id: "butaca-mendoza",
      nombre: "Butaca Mendoza",
      precio: 45230,
      imagen: "/images/butaca-mendoza.png",
      descripcion:
        "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú. El respaldo curvo abraza el cuerpo y ofrece máximo confort, mientras que su diseño orgánico aporta calidez y sofisticación a cualquier ambiente contemporáneo.",
      detalles: [
        { titulo: "Medidas", descripcion: "80 x 75 x 85 cm" },
        { titulo: "Materiales", descripcion: "Guatambú macizo, tela bouclé" },
        { titulo: "Acabado", descripcion: "Cera vegetal, tapizado premium" },
        { titulo: "Tapizado", descripcion: "Repelente al agua y manchas" },
        { titulo: "Confort", descripcion: "Espuma alta densidad" },
      ],
    },
    {
      id: "sillon-copacabana",
      nombre: "Sillón Copacabana",
      precio: 58999,
      imagen: "/images/sillon-copacabana.png",
      descripcion:
        "Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna. Inspirado en la estética brasilera moderna de los 60, combina comodidad excepcional con un diseño icónico que trasciende tendencias y épocas.",
      detalles: [
        { titulo: "Medidas", descripcion: "90 x 85 x 95 cm" },
        {
          titulo: "Materiales",
          descripcion: "Cuero curtido vegetal, acero pintado",
        },
        { titulo: "Acabado", descripcion: "Cuero anilina premium" },
        { titulo: "Rotación", descripcion: "360° silenciosa y suave" },
        { titulo: "Garantía", descripcion: "10 años en estructura" },
      ],
    },
    {
      id: "mesa-de-centro-araucaria",
      nombre: "Mesa de Centro Araucaria",
      precio: 69850,
      imagen: "/images/mesa-de-centro-araucaria.png",
      descripcion:
        "Mesa de centro con sobre circular de mármol Patagonia y base de tres patas en madera de nogal. Su diseño minimalista se convierte en el punto focal perfecto para cualquier sala de estar contemporánea, combinando la frialdad del mármol con la calidez de la madera.",
      detalles: [
        { titulo: "Medidas", descripcion: "90 x 90 x 45 cm" },
        {
          titulo: "Materiales",
          descripcion: "Sobre de mármol Patagonia, patas de nogal",
        },
        {
          titulo: "Acabado",
          descripcion: "Mármol pulido, aceite natural en madera",
        },
        { titulo: "Peso", descripcion: "42 kg" },
        { titulo: "Carga máxima", descripcion: "25 kg distribuidos" },
      ],
    },
    {
      id: "mesa-de-noche-aconcagua",
      nombre: "Mesa de Noche Aconcagua",
      precio: 48920,
      imagen: "/images/mesa-de-noche-aconcagua.png",
      descripcion:
        "Mesa de noche con cajón oculto y repisa inferior en roble certificado FSC®. Su diseño limpio y funcional permite convivir con diferentes estilos de dormitorio, ofreciendo almacenamiento discreto y elegante para objetos personales.",
      detalles: [
        { titulo: "Medidas", descripcion: "45 x 35 x 60 cm" },
        {
          titulo: "Materiales",
          descripcion: "Roble macizo FSC®, herrajes soft-close",
        },
        { titulo: "Acabado", descripcion: "Barniz mate de poliuretano" },
        { titulo: "Almacenamiento", descripcion: "1 cajón + repisa inferior" },
        { titulo: "Características", descripcion: "Cajón con cierre suave" },
      ],
    },
    {
      id: "sofa-patagonia",
      nombre: "Sofá Patagonia",
      precio: 86700,
      imagen: "/images/sofa-patagonia.png",
      descripcion:
        "Sofá de tres cuerpos tapizado en lino Warm Alabaster con patas cónicas de madera. Los cojines combinan espuma de alta resiliencia con plumón reciclado, ofreciendo comodidad duradera y sostenible para el hogar moderno.",
      detalles: [
        { titulo: "Medidas", descripcion: "220 x 90 x 80 cm" },
        {
          titulo: "Estructura",
          descripcion: "Madera de eucalipto certificada FSC®",
        },
        { titulo: "Tapizado", descripcion: "Lino 100% natural premium" },
        { titulo: "Relleno", descripcion: "Espuma HR + plumón reciclado" },
        { titulo: "Sostenibilidad", descripcion: "Materiales 100% reciclables" },
      ],
    },
    {
      id: "mesa-comedor-pampa",
      nombre: "Mesa Comedor Pampa",
      precio: 45000,
      imagen: "/images/mesa-comedor-pampa.png",
      descripcion:
        "Mesa extensible de roble macizo con tablero biselado y sistema de apertura suave. Su diseño robusto y elegante se adapta perfectamente a reuniones íntimas o grandes celebraciones familiares, extendiéndose de 6 a 10 comensales.",
      detalles: [
        { titulo: "Medidas", descripcion: "160-240 x 90 x 75 cm" },
        {
          titulo: "Materiales",
          descripcion: "Roble macizo FSC®, mecanismo alemán",
        },
        { titulo: "Acabado", descripcion: "Aceite-cera natural" },
        { titulo: "Capacidad", descripcion: "6-10 comensales" },
        { titulo: "Extensión", descripcion: "Sistema de mariposa central" },
      ],
    },
    {
      id: "sillas-cordoba",
      nombre: "Sillas Córdoba",
      precio: 51000,
      imagen: "/images/sillas-cordoba.png",
      descripcion:
        "Set de cuatro sillas apilables en contrachapado moldeado de nogal y estructura tubular pintada en Sage Green. Su diseño ergonómico y materiales de calidad garantizan comodidad y durabilidad en el uso diario, perfectas para comedores contemporáneos.",
      detalles: [
        { titulo: "Medidas", descripcion: "45 x 52 x 80 cm (cada una)" },
        {
          titulo: "Materiales",
          descripcion: "Contrachapado nogal, tubo de acero",
        },
        { titulo: "Acabado", descripcion: "Laca mate, pintura epoxi" },
        { titulo: "Apilado", descripcion: "Hasta 6 sillas" },
        { titulo: "Incluye", descripcion: "Set de 4 sillas" },
      ],
    },
    {
      id: "escritorio-costa",
      nombre: "Escritorio Costa",
      precio: 43300,
      imagen: "/images/escritorio-costa.png",
      descripcion:
        "Escritorio compacto con cajón organizado y tapa pasacables integrada en bambú laminado. Ideal para espacios de trabajo en casa, combina funcionalidad moderna con estética minimalista y sostenible, perfecto para el trabajo remoto.",
      detalles: [
        { titulo: "Medidas", descripcion: "120 x 60 x 75 cm" },
        { titulo: "Materiales", descripcion: "Bambú laminado, herrajes ocultos" },
        { titulo: "Acabado", descripcion: "Laca mate resistente" },
        { titulo: "Almacenamiento", descripcion: "1 cajón con organizador" },
        { titulo: "Cables", descripcion: "Pasacables integrado" },
      ],
    },
    {
      id: "silla-de-trabajo-belgrano",
      nombre: "Silla de Trabajo Belgrano",
      precio: 35220,
      imagen: "/images/silla-de-trabajo-belgrano.png",
      descripcion:
        "Silla ergonómica regulable en altura con respaldo de malla transpirable y asiento tapizado en tejido reciclado. Diseñada para largas jornadas de trabajo con máximo confort y apoyo lumbar, ideal para oficinas en casa y espacios de coworking.",
      detalles: [
        { titulo: "Medidas", descripcion: "60 x 60 x 90-100 cm" },
        { titulo: "Materiales", descripcion: "Malla técnica, tejido reciclado" },
        { titulo: "Acabado", descripcion: "Base cromada, tapizado premium" },
        { titulo: "Regulación", descripcion: "Altura + inclinación respaldo" },
        { titulo: "Certificación", descripcion: "Ergonomía europea EN 1335" },
      ],
    },
  ];

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  return (
    <section className="homepage-delimiter">
      {/* Este estado captura el producto seleccionado */}
      {productoSeleccionado && <p>ID producto seleccionado: {productoSeleccionado}</p>}

      <h1>Mueblería Hermanos Jota</h1>

      <main>
        <h2>Productos</h2>
        <ProductList productos={productos} onSeleccionarProducto={setProductoSeleccionado} />
      </main>
    </section>
  );
}

export default App;
