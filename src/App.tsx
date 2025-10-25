import './App.css'
import { CartProvider } from './contexts/cartContext'
import { AppRouter } from './router/router'

function App() {

  return (
    <CartProvider>
      <AppRouter />
    </CartProvider>
  )
}

export default App
