import logo from "../assets/logo.svg";
import "../css/Navbar.css";

const Navbar = ({ cantidadCarrito }) => {
  return (
    <header className="navbar">
      <nav className="navbar-contenido" aria-label="Navegación principal">
        <a className="navbar-marca" href="#">
          <img className="navbar-logo" src={logo} alt="" />
          <span>Hermanos Jota</span>
        </a>

        <ul className="navbar-links">
          <li>
            <a href="#productos">Productos</a>
          </li>
          <li>
            <a href="#contacto">Contacto</a>
          </li>
        </ul>

        <div className="navbar-carrito" aria-live="polite">
          <svg
            className="navbar-carrito-icono"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 7h12l1 13H5L6 7z" />
            <path d="M9 7V5a3 3 0 0 1 6 0v2" />
          </svg>
          <span className="navbar-carrito-contador">{cantidadCarrito}</span>
          <span className="navbar-texto-oculto">productos en el carrito</span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
