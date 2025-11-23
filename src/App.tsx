import './App.css'
import { AuthProvider } from './contexts/AuthContext';
import { AudioProvider } from './contexts/AudioContext';
import { CartProvider } from './contexts/cartContext'
import { EnergyProvider } from './contexts/energyContext';
import { AppRouter } from './router/router'
import { initMercadoPago } from '@mercadopago/sdk-react';
import { InvitationProvider } from './contexts/invitationContex';

initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY); 

function App() {
  return (
    <AuthProvider>
      <AudioProvider>
        <CartProvider>
          <EnergyProvider>
            <InvitationProvider>
            <AppRouter />
            </InvitationProvider>
          </EnergyProvider>
        </CartProvider>
      </AudioProvider>
    </AuthProvider>

  )
}

export default App
