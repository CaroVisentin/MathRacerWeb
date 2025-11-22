import './App.css'
import { AuthProvider } from './contexts/AuthContext';
import { AudioProvider } from './contexts/AudioContext';
import { CartProvider } from './contexts/cartContext'
import { EnergyProvider } from './contexts/energyContext';
import { AppRouter } from './router/router'
import { InvitationProvider } from './contexts/invitationContex';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <AuthProvider>
      <AudioProvider>
        <CartProvider>
          <EnergyProvider>
            <InvitationProvider>
              <AppRouter />
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
            </InvitationProvider>
          </EnergyProvider>
        </CartProvider>
      </AudioProvider>
    </AuthProvider>

  )
}

export default App
