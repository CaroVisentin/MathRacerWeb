import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';


export const usePlayer = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('usePlayer debe usarse dentro de AuthProvider');

  const { player, setPlayer, refreshPlayer } = context;

  return { player, setPlayer, refreshPlayer };
};