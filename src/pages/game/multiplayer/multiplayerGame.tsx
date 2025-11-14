import { Link } from "react-router-dom";
import { StarsBackground } from "../../../shared/backgrounds/starBackground";
import { useAudio } from "../../../contexts/AudioContext";
import mathi from "../../../assets/images/mathi.png";
export const Menu = () => {
  const { playButtonSound, playBackSound } = useAudio();

  return (
    // Contenedor principal
    <div className="h-screen w-screen bg-[#1C092D] flex flex-col items-center justify-between p-4 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <StarsBackground />
      </div>
      <img src={mathi} alt="Mathi" className="absolute top-4 left-4 w-20 h-20 z-10 " />

      <h1 className="text-pink-400 text-8xl text-center uppercase tracking-wide mb-12 drop-shadow-[0_0_10px_#00ffff]">
        Multijugador
      </h1>

      <div className=" rounded-lg p-8 grid grid-cols-2 gap-6 w-4/5 max-w-screen-lg">
        
        <Link
          to="/crear"
          onClick={playButtonSound}
          className="botonGral uppercase tracking-wider transition-all duration-300 ease-out hover:drop-shadow-[0_0_10px_#00ffff] text-center text-5xl"
        >
          Crear Partida
        </Link>

        <Link
          to="/unirse-partida"
          onClick={playButtonSound}
          className="botonGral uppercase hover:drop-shadow-[0_0_10px_#00ffff] text-center text-5xl"
        >
          Unirse a Partida
        </Link>

        <Link
          to="/invitar-amigo"
          onClick={playButtonSound}
          className="botonGral uppercase hover:drop-shadow-[0_0_10px_#00ffff] text-center text-5xl"
        >
          Invitar a un Amigo
        </Link>

        <Link
          to="/ranking"
          onClick={playButtonSound}
          className="botonGral uppercase hover:drop-shadow-[0_0_10px_#00ffff] text-center text-5xl"
        >
          Ranking
        </Link>

        <Link
          to="/partida-rapida"
          onClick={playButtonSound}
          className="botonGral uppercase hover:drop-shadow-[0_0_10px_#00ffff] text-center col-span-2 justify-self-center w-1/2 text-5xl"
        >
          Partida Competitiva
        </Link>
      </div>

      <div className="m-16">
        <Link
          to="/home"
          onClick={playBackSound}
          className="bg-[#00f0ff] text-2xl border-2 border-white px-3 py-1
                tracking-wider transition-all duration-300 
                 hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.3)] 
                 hover:shadow-[0_0_20px_rgba(0,217,255,0.6)]
                 disabled:opacity-50"
        >
          Volver
        </Link>
      </div>
      
    </div>
  );
};

export default Menu;