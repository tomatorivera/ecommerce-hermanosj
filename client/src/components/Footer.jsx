import "../css/Footer.css";

const Footer = () => {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-contenido">
        <section>
          <p className="footer-marca">Hermanos Jota</p>
          <p className="footer-lema">
            Cada pieza cuenta la historia de manos expertas y materiales nobles.
          </p>
        </section>

        <section>
          <h2 className="footer-titulo">Casa Taller</h2>
          <address>
            Av. San Juan 2847
            <br />
            C1232AAB, San Cristóbal
            <br />
            Ciudad Autónoma de Buenos Aires
          </address>
        </section>

        <section>
          <h2 className="footer-titulo">Horarios</h2>
          <p>Lunes a viernes: 10:00 a 19:00</p>
          <p>Sábados: 10:00 a 14:00</p>
        </section>

        <section>
          <h2 className="footer-titulo">Contacto</h2>
          <ul className="footer-lista">
            <li>
              <a href="mailto:info@hermanosjota.com.ar">info@hermanosjota.com.ar</a>
            </li>
            <li>
              <a href="mailto:ventas@hermanosjota.com.ar">ventas@hermanosjota.com.ar</a>
            </li>
            <li>WhatsApp: +54 11 4567-8900</li>
            <li>
              <a href="https://www.instagram.com/hermanosjota_ba/" target="_blank" rel="noreferrer">
                Instagram: @hermanosjota_ba
              </a>
            </li>
          </ul>
        </section>
      </div>

      <p className="footer-legal">© {anioActual} Hermanos Jota. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
