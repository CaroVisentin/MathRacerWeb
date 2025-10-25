import './App.css'
import { CartProvider } from './contexts/cartContext'
import { StoryModeGameProvider } from './contexts/storyModeGameContext'
import { AppRouter } from './router/router'

function App() {

  return (
    <CartProvider>
      <StoryModeGameProvider>
        <AppRouter />
      </StoryModeGameProvider>
    </CartProvider>
  )
}

export default App
