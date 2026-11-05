import {
  useEffect,
  useState,
} from 'react'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductsSection from './components/ProductsSection'
import CartDrawer from './components/CartDrawer'
import MarqueeStrip from './components/MarqueeStrip'
import AboutSection from './components/AboutSection'
import DailySpecial from './components/DailySpecial'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import CheckoutPanel from './components/CheckoutPanel'
import Toast from './components/Toast'

function App() {
  const [cart, setCart] = 
  useState(() => {
    try {
      const savedCart =
        localStorage.getItem(
          'panaderia-jerusalen-cart'
        )

      return savedCart
        ? JSON.parse(savedCart)
        : []
    } catch (error) {
      console.error(
        'No se pudo recuperar el carrito:',
        error
      )

      return []
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(
        'panaderia-jerusalen-cart',
        JSON.stringify(cart)
      )
    } catch (error) {
      console.error(
        'No se pudo guardar el carrito:',
        error
      )
    }
  }, [cart])
  const clearCart = () => {
    setCart([])
  }
  const [isCartOpen, setIsCartOpen] =
    useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] =
    useState(false)
  const [
    toastMessage,
    setToastMessage,
  ] = useState('')
  const addToCart = (
    product,
    quantity = 1
  ) => {
    setCart((currentCart) => {

      const existingProduct =
        currentCart.find(
          (item) =>
            item.id === product.id
        )

      if (existingProduct) {

        return currentCart.map(
          (item) =>
            item.id === product.id
              ? {
                  ...item,

                  quantity:
                    item.quantity +
                    quantity,
                }
              : item
        )

      }

      return [
        ...currentCart,

        {
          ...product,
          quantity,
        },
      ]
    })

    const quantityText =
      quantity > 1
        ? `${quantity} × ${product.name}`
        : product.name

    setToastMessage(
      quantityText
    )
  }

  const openCheckout = () => {
    if (cart.length === 0) {
      return
    }

    setIsCartOpen(false)

    setIsCheckoutOpen(true)
  }

  const backToCart = () => {
    setIsCheckoutOpen(false)

    setIsCartOpen(true)
  }

  const increaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    )
  }

  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    )
  }

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== productId
      )
    )
  }

  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  )

  return (
    <>
      <Navbar
        cartCount={cartCount}
        onCartOpen={() =>
          setIsCartOpen(true)
        }
      />

      <main>

        <Hero />

        <ProductsSection
          onAddToCart={addToCart}
        />

        <MarqueeStrip />

        <AboutSection />

        <DailySpecial
          onAddToCart={addToCart}
        />
        <ContactSection />

      </main>

      <Footer />

      <Toast
        message={toastMessage}
        onClose={() =>
          setToastMessage('')
        }
      />

      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        onClose={() =>
          setIsCartOpen(false)
        }
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeFromCart}
        onCheckout={openCheckout}
      />

      <CheckoutPanel
      isOpen={isCheckoutOpen}
      cart={cart}
      onClose={() =>
        setIsCheckoutOpen(false)
      }
      onBackToCart={backToCart}
      onOrderSuccess={() => {
        clearCart()
        setIsCheckoutOpen(false)
      }}
      />

    </>
  )
}

export default App