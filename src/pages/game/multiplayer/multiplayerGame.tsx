import { Link } from "react-router-dom";
import { useAudio } from "../../../contexts/AudioContext";
import { useInvitation } from "../../../contexts/invitationContex";
import { useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { AppHeader } from "../../../components/shared/appHeader";

export const Menu = () => {
  const { playButtonSound, playBackSound } = useAudio();
  const { hasInvitation, invitationCount, checkInvitations } = useInvitation();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      checkInvitations();
    }
  }, [user, checkInvitations]);

  return (
    <div className="min-h-screen w-full fondo-city flex flex-col overflow-hidden">
      <AppHeader />

      <div className="flex flex-col flex-grow items-center justify-between py-6">

        {/* Título */}
        <h1 className="text-[#5df9f9] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center tracking-wide drop-shadow-[0_0_10px_#00ffff] px-4">
          Multijugador
        </h1>

        {/* Botones */}
        <div className="rounded-lg p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-11/12 sm:w-4/5 max-w-screen-lg">
          <Link
            to="/crear"
            onClick={playButtonSound}
            className="botonGral text-center text-3xl sm:text-4xl lg:text-5xl tracking-wider transition-all duration-300 ease-out hover:drop-shadow-[0_0_10px_#00ffff]"
          >
            Crear Partida
          </Link>
          <Link
            to="/unirse-partida"
            onClick={playButtonSound}
            className="botonGral text-center text-3xl sm:text-4xl lg:text-5xl hover:drop-shadow-[0_0_10px_#00ffff]"
          >
            Unirse a Partida
          </Link>
          <Link
            to="/invitar-amigo"
            onClick={playButtonSound}
            className="botonGral text-center text-3xl sm:text-4xl lg:text-5xl hover:drop-shadow-[0_0_10px_#00ffff]"
          >
            Invitar a un Amigo
          </Link>
          <Link
            to="/invitaciones"
            onClick={playButtonSound}
            className={`botonGral text-center text-3xl sm:text-4xl lg:text-5xl hover:drop-shadow-[0_0_10px_#00ffff] relative
              ${hasInvitation ? 'botonBrillante' : ''}`}
          >
            Buzón de Invitaciones
            {hasInvitation && invitationCount > 0 && (
              <span className="contador-invitacion">{invitationCount}</span>
            )}
          </Link>
          <Link
            to="/ranking"
            onClick={playButtonSound}
            className="botonGral text-center text-3xl sm:text-4xl lg:text-5xl hover:drop-shadow-[0_0_10px_#00ffff]"
          >
            Ranking
          </Link>
          <Link
            to="/partida-rapida"
            onClick={playButtonSound}
            className="botonGral text-center text-3xl sm:text-4xl lg:text-5xl hover:drop-shadow-[0_0_10px_#00ffff]"
          >
            Partida Competitiva
          </Link>
        </div>

        {/* Volver */}
        <div className="pb-6">
          <Link
            to="/home"
            onClick={playBackSound}
            className="bg-[#00f0ff] text-lg sm:text-xl md:text-2xl border-2 border-white px-4 py-2
              tracking-wider transition-all duration-300 
              hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.3)] 
              hover:shadow-[0_0_20px_rgba(0,217,255,0.6)] 
              disabled:opacity-50"
          >
            <i className="ri-arrow-left-line mr-2"></i> Volver
          </Link>
        </div>
      </div>
    </div>
  );
};


export default Menu;