import './App.css'
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/cartContext'
// import { PlayerProvider } from './contexts/playerContext';
import { StoryModeGameProvider } from './contexts/storyModeGameContext'
import { AppRouter } from './router/router'


function App() {
  return (
    <AuthProvider>
      {/* <PlayerProvider> */}
        <CartProvider>
          <StoryModeGameProvider>
            <AppRouter />
          </StoryModeGameProvider>
        </CartProvider>
      {/* </PlayerProvider> */}
    </AuthProvider>

  )
}

export default App
