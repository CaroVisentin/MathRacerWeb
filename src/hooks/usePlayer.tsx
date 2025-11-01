import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';


export const usePlayer = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('usePlayer debe usarse dentro de AuthProvider');

  const { player, setPlayer } = context;

  return { player, setPlayer };
};