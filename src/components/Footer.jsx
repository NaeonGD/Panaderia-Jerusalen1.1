import { business } from '../data/business'
import logo from '../assets/logo/jerusalen-logo.svg'

import './Footer.css'

function Footer() {
  return (
    <footer className="footer">

      <div className="container">

        <div className="footer__top">

          <div className="footer__brand">

            <img
              src={logo}
              alt="Panadería Jerusalén"
              className="footer__brand-logo"
            />

          </div>

          <p className="footer__slogan">
            {business.slogan}
          </p>

        </div>

        <div className="footer__grid">

          <div>

            <span className="footer__label">
              NAVEGACIÓN
            </span>

            <nav className="footer__links">

              <a href="#inicio">
                Inicio
              </a>

              <a href="#menu">
                Menú
              </a>

              <a href="#nosotros">
                Nosotros
              </a>

              <a href="#contacto">
                Contacto
              </a>

            </nav>

          </div>

          <div>

            <span className="footer__label">
              CONTACTO
            </span>

            <div className="footer__links">

              <a href={`tel:${business.phone}`}>
                {business.phone}
              </a>

              <a href={`mailto:${business.email}`}>
                {business.email}
              </a>

            </div>

          </div>

          <div>

            <span className="footer__label">
              SÍGUENOS
            </span>

            <div className="footer__links">

              <a
                href={business.social.instagram}
              >
                Instagram
              </a>

              <a
                href={business.social.facebook}
              >
                Facebook
              </a>

            </div>

          </div>

        </div>

        <div className="footer__bottom">

          <span>
            © {new Date().getFullYear()} {business.name}
          </span>

          <span>
            Todos los derechos reservados
          </span>

        </div>

      </div>

    </footer>
  )
}

export default Footer