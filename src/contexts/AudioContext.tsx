import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react';

// Importar los sonidos
import musicaFondo from '../assets/audios/sounds/musciaintro2.mp3';
import botonHome from '../assets/audios/sounds/botonHome.mp3';
import gameOver from '../assets/audios/sounds/game-over-kid-voice-clip-352738.mp3';
import winner from '../assets/audios/sounds/winner-game-sound-404167.mp3';
import volver from '../assets/audios/sounds/volver.mp3';
import compra from '../assets/audios/sounds/compra.mp3';
import agregar from '../assets/audios/sounds/agregar.mp3';
import sacar from '../assets/audios/sounds/sacar.mp3';
import unirseCrear from '../assets/audios/sounds/unirse-crear.mp3';

interface AudioContextType {
  // Volúmenes
  soundVolume: number;
  musicVolume: number;
  setSoundVolume: (volume: number) => void;
  setMusicVolume: (volume: number) => void;
  
  // Funciones para reproducir sonidos
  playButtonSound: () => void;
  playGameOverSound: () => void;
  playWinnerSound: () => void;
  playBackSound: () => void;
  playPurchaseSound: () => void;
  playAddToCartSound: () => void;
  playRemoveFromCartSound: () => void;
  playJoinCreateSound: () => void;
  
  // Control de música de fondo
  playBackgroundMusic: () => void;
  pauseBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;

}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  // Cargar volúmenes desde localStorage o usar valores por defecto
  const [soundVolume, setSoundVolumeState] = useState<number>(() => {
    const saved = localStorage.getItem('soundVolume');
    return saved ? Number(saved) : 50;
  });

  const [musicVolume, setMusicVolumeState] = useState<number>(() => {
    const saved = localStorage.getItem('musicVolume');
    return saved ? Number(saved) : 50;
  });

  // Referencias de audio
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const soundEffectRef = useRef<HTMLAudioElement | null>(null);

  // Inicializar música de fondo una sola vez al montar el provider
  useEffect(() => {
    backgroundMusicRef.current = new Audio(musicaFondo);
    backgroundMusicRef.current.loop = true;
    backgroundMusicRef.current.volume = musicVolume / 100;

    // Iniciar música automáticamente
    const playMusic = async () => {
      try {
        if (musicVolume > 0) {
          await backgroundMusicRef.current?.play();
        }
      } catch (error) {
        console.log('No se pudo reproducir música automáticamente. El usuario debe interactuar primero.');
      }
    };

    playMusic();

    return () => {
      backgroundMusicRef.current?.pause();
      backgroundMusicRef.current = null;
    };
  }, []);

  // Actualizar volumen de música de fondo cuando cambia
  useEffect(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = musicVolume / 100;
      
      // Si el volumen cambia de 0 a algo mayor, reproducir
      if (musicVolume > 0 && backgroundMusicRef.current.paused) {
        backgroundMusicRef.current.play().catch(err => {
          console.log('Error al reproducir música:', err);
        });
      }
      
      // Si el volumen es 0, pausar
      if (musicVolume === 0) {
        backgroundMusicRef.current.pause();
      }
    }
  }, [musicVolume]);

  // Guardar volúmenes en localStorage
  const setSoundVolume = (volume: number) => {
    setSoundVolumeState(volume);
    localStorage.setItem('soundVolume', volume.toString());
  };

  const setMusicVolume = (volume: number) => {
    setMusicVolumeState(volume);
    localStorage.setItem('musicVolume', volume.toString());
  };

  // Función genérica para reproducir efectos de sonido
  const playSoundEffect = (soundPath: string) => {
    if (soundVolume === 0) return;

    // Detener sonido anterior si existe
    if (soundEffectRef.current) {
      soundEffectRef.current.pause();
      soundEffectRef.current.currentTime = 0;
    }

    soundEffectRef.current = new Audio(soundPath);
    soundEffectRef.current.volume = soundVolume / 100;
    soundEffectRef.current.play().catch(err => {
      console.error('Error al reproducir sonido:', err);
    });
  };

  // Funciones específicas para cada sonido
  const playButtonSound = () => playSoundEffect(botonHome);
  const playGameOverSound = () => playSoundEffect(gameOver);
  const playWinnerSound = () => playSoundEffect(winner);
  const playBackSound = () => playSoundEffect(volver);
  const playPurchaseSound = () => playSoundEffect(compra);
  const playAddToCartSound = () => playSoundEffect(agregar);
  const playRemoveFromCartSound = () => playSoundEffect(sacar);
  const playJoinCreateSound = () => playSoundEffect(unirseCrear);

  // Control de música de fondo
  const playBackgroundMusic = () => {
    if (backgroundMusicRef.current && musicVolume > 0) {
      backgroundMusicRef.current.play().catch(err => {
        console.error('Error al reproducir música de fondo:', err);
      });
    }
  };

  const pauseBackgroundMusic = () => {
    backgroundMusicRef.current?.pause();
  };

  const stopBackgroundMusic = () => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause();
      backgroundMusicRef.current.currentTime = 0;
    }
  };

  return (
    <AudioContext.Provider
      value={{
        soundVolume,
        musicVolume,
        setSoundVolume,
        setMusicVolume,
        playButtonSound,
        playGameOverSound,
        playWinnerSound,
        playBackgroundMusic,
        pauseBackgroundMusic,
        stopBackgroundMusic,
        playBackSound,
        playPurchaseSound,
        playAddToCartSound,
        playRemoveFromCartSound,
        playJoinCreateSound,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
