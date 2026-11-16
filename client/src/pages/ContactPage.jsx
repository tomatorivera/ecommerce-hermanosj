import ContactForm from "../components/ContactForm.jsx";
import ContactIcon from "../components/ContactIcon.jsx";

import "../css/contacto.css";

const CONTACTOS = [
  {
    texto: "info@hermanosjota.com.ar",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
  },
  {
    texto: "ventas@hermanosjota.com.ar",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
  },
  {
    texto: "+54 11 4567-8900 (WhatsApp)",
    icon: (
      <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11 11 0 0 0 3.5.56 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11 11 0 0 0 .56 3.5 1 1 0 0 1-.25 1z" />
    ),
  },
  {
    texto: "@hermanosjota_ba",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" />
      </>
    ),
  },
  {
    texto: "www.hermanosjota.com.ar",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
      </>
    ),
  },
];

export default function ContactPage() {
  return (
    <main>
      <section className="contact-columns">
        <article className="contact-details">
          <h2 className="section-title">Casa Taller</h2>

          <address className="info-row">
            <span className="icon-circle">
              <ContactIcon>
                <path d="M12 21s7-7.58 7-12a7 7 0 1 0-14 0c0 4.42 7 12 7 12z" />
                <circle cx="12" cy="9" r="2.5" />
              </ContactIcon>
            </span>
            <div>
              <p className="info-title">Av. San Juan 2847</p>
              <p>C1232AAB — Barrio de San Cristóbal</p>
              <p>Ciudad Autónoma de Buenos Aires, Argentina</p>
            </div>
          </address>

          <section className="info-row">
            <span className="icon-circle">
              <ContactIcon>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </ContactIcon>
            </span>
            <div>
              <p className="info-title">Horarios</p>
              <p>Lunes a viernes: 10:00 — 19:00</p>
              <p>Sábados: 10:00 — 14:00</p>
            </div>
          </section>

          <h2 className="section-title">Contacto digital</h2>
          <address>
            <ul className="contact-list">
              {CONTACTOS.map(({ texto, icon }) => (
                <li key={texto}>
                  <ContactIcon>{icon}</ContactIcon>
                  {texto}
                </li>
              ))}
            </ul>
          </address>
        </article>

        <ContactForm />
      </section>
    </main>
  );
}
