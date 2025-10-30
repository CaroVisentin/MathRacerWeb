import './App.css'
import { AppRouter } from './router/router'
import { AuthProvider } from './context/auth/AuthContext'

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App
