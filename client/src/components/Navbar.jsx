import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import "../css/Navbar.css";

const Navbar = ({ cantidadCarrito }) => {
  return (
    <header className="navbar">
      <nav className="navbar-contenido" aria-label="Navegación principal">
        <Link className="navbar-marca" to="/">
          <img className="navbar-logo" src={logo} alt="Logo de los hermanos jota" />
          <span>Hermanos Jota</span>
        </Link>

        <ul className="navbar-links">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/productos">Productos</Link>
          </li>
          <li>
            <Link to="/contacto">Contacto</Link>
          </li>
        </ul>
        <div className="navbar-auth">
          <Link to="/login">Iniciar sesión</Link>
          <Link to="/registro" className="navbar-registro">
            Crear cuenta
          </Link>
        </div>
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
