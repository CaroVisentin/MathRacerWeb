import { Link } from "react-router-dom";
import { StarsBackground } from "../../../shared/backgrounds/starBackground";
export const Menu = () => {
  return (
    // Contenedor principal
    <div className="h-screen w-screen bg-[#1C092D] flex flex-col items-center justify-between p-4 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <StarsBackground />
      </div>

      <h1 className="text-pink-400 text-8xl text-center uppercase tracking-wide mb-12 drop-shadow-[0_0_10px_#00ffff]">
        Multijugador
      </h1>

      <div className=" rounded-lg p-8 grid grid-cols-2 gap-6 w-4/5 max-w-screen-lg">
        
        <Link
          to="/crear"
          className="botonGral uppercase tracking-wider transition-all duration-300 ease-out hover:drop-shadow-[0_0_10px_#00ffff] text-center text-5xl"
        >
          Crear Partida
        </Link>

        <Link
          to="/unirse-partida"
          className="botonGral uppercase hover:drop-shadow-[0_0_10px_#00ffff] text-center text-5xl"
        >
          Unirse a Partida
        </Link>

        <Link
          to="/invitar-amigo"
          className="botonGral uppercase hover:drop-shadow-[0_0_10px_#00ffff] text-center text-5xl"
        >
          Invitar a un Amigo
        </Link>

        <Link
          to="/ranking"
          className="botonGral uppercase hover:drop-shadow-[0_0_10px_#00ffff] text-center text-5xl"
        >
          Ranking
        </Link>

        <Link
          to="/partida-rapida"
          className="botonGral uppercase hover:drop-shadow-[0_0_10px_#00ffff] text-center col-span-2 justify-self-center w-1/2 text-5xl"
        >
          Partida Competitiva
        </Link>
      </div>

      <div className="m-16">
        <Link
          to="/home"
          className="botonGral uppercase hover:drop-shadow-[0_0_10px_#00ffff] text-xl py-2 px-4 mb-3"
        >
          Volver
        </Link>
      </div>
      
    </div>
  );
};

export default Menu;