import './App.css'
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/cartContext'
import { EnergyProvider } from './contexts/energyContext';
import { AppRouter } from './router/router'


function App() {
  return (
    <AuthProvider>
        <CartProvider>
          <EnergyProvider>
            <AppRouter />
          </EnergyProvider>
        </CartProvider>
    </AuthProvider>

  )
}

export default App
