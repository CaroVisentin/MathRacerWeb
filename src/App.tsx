import './App.css'
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/cartContext'
import { EnergyProvider } from './contexts/energyContext';
// import { PlayerProvider } from './contexts/playerContext';
// import { StoryModeGameProvider } from './contexts/storyModeGameContext'
import { AppRouter } from './router/router'


function App() {
  return (
    <AuthProvider>
      {/* <PlayerProvider> */}
        <CartProvider>
          <EnergyProvider>
            <AppRouter />
          </EnergyProvider>
        </CartProvider>
      {/* </PlayerProvider> */}
    </AuthProvider>

  )
}

export default App
