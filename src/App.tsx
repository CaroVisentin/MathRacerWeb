import './App.css'
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/cartContext'
import { EnergyProvider } from './contexts/energyContext';
import { AppRouter } from './router/router'
import { initMercadoPago } from '@mercadopago/sdk-react';

initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY); 

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
