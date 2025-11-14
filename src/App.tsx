import './App.css'
import { AuthProvider } from './contexts/AuthContext';
import { AudioProvider } from './contexts/AudioContext';
import { CartProvider } from './contexts/cartContext'
import { EnergyProvider } from './contexts/energyContext';
import { AppRouter } from './router/router'


function App() {
  return (
    <AuthProvider>
      <AudioProvider>
        <CartProvider>
          <EnergyProvider>
            <AppRouter />
          </EnergyProvider>
        </CartProvider>
      </AudioProvider>
    </AuthProvider>

  )
}

export default App
