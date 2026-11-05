import {
  useEffect,
  useState,
} from 'react'

import logo from '../assets/logo/jerusalen-logo.svg'
import './Navbar.css'

function Navbar({
  cartCount,
  onCartOpen,
}) {
  const [
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  ] = useState(false)

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener(
      'keydown',
      handleEscape
    )

    return () => {
      window.removeEventListener(
        'keydown',
        handleEscape
      )
    }
  }, [isMobileMenuOpen])

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="navbar">

      <div className="navbar__container container">

        <a
          href="#inicio"
          className="navbar__brand"
          onClick={closeMobileMenu}
        >
          <img
            src={logo}
            alt="Panadería Jerusalén"
            className="navbar__brand-logo"
          />
        </a>

        <nav className="navbar__links">

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

        <div className="navbar__actions">

          <button
            type="button"
            className="navbar__order"
            onClick={() => {
              closeMobileMenu()
              onCartOpen()
            }}
          >
            Pedido

            <span className="navbar__cart-count">
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            className="navbar__menu-button"
            onClick={() =>
              setIsMobileMenuOpen(true)
            }
            aria-label="Abrir menú"
          >
            <span />
            <span />
            <span />
          </button>

        </div>

      </div>

      <div
        className={
          isMobileMenuOpen
            ? 'mobile-menu-overlay mobile-menu-overlay--visible'
            : 'mobile-menu-overlay'
        }
        onClick={closeMobileMenu}
      />

      <aside
        className={
          isMobileMenuOpen
            ? 'mobile-menu mobile-menu--open'
            : 'mobile-menu'
        }
      >

        <div className="mobile-menu__header">

          <img
            src={logo}
            alt="Panadería Jerusalén"
            className="mobile-menu__logo"
          />

          <button
            type="button"
            className="mobile-menu__close"
            onClick={closeMobileMenu}
            aria-label="Cerrar menú"
          >
            ×
          </button>

        </div>

        <nav className="mobile-menu__links">

          <a
            href="#inicio"
            onClick={closeMobileMenu}
          >
            <span>01</span>
            Inicio
          </a>

          <a
            href="#menu"
            onClick={closeMobileMenu}
          >
            <span>02</span>
            Menú
          </a>

          <a
            href="#nosotros"
            onClick={closeMobileMenu}
          >
            <span>03</span>
            Nosotros
          </a>

          <a
            href="#contacto"
            onClick={closeMobileMenu}
          >
            <span>04</span>
            Contacto
          </a>

        </nav>

        <div className="mobile-menu__bottom">

          <span>
            Tradición recién
            salida del horno.
          </span>

        </div>

      </aside>

    </header>
  )
}

export default Navbar