import './App.css'
import { AuthProvider } from './contexts/AuthContext';
import { AudioProvider } from './contexts/AudioContext';
import { EnergyProvider } from './contexts/energyContext';
import { AppRouter } from './router/router'
import { initMercadoPago } from '@mercadopago/sdk-react';
import { InvitationProvider } from './contexts/invitationContex';

initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY); 

function App() {
  return (
    <AuthProvider>
      <AudioProvider>
          <EnergyProvider>
            <InvitationProvider>
            <AppRouter />
            </InvitationProvider>
          </EnergyProvider>
      </AudioProvider>
    </AuthProvider>

  )
}

export default App
