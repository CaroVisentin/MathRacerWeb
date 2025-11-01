import './App.css'
import { AuthProvider } from './contexts/AuthContext';

import { CartProvider } from './contexts/cartContext'
import { StoryModeGameProvider } from './contexts/storyModeGameContext'
import { AppRouter } from './router/router'


function App() {
  return (
    <AuthProvider>
    <CartProvider>
      <StoryModeGameProvider>
        <AppRouter />
      </StoryModeGameProvider>
    </CartProvider>
    </AuthProvider>
  )
}

export default App
