import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StarsBackground } from "../../../shared/backgrounds/starBackground";
import { usePlayer } from "../../../hooks/usePlayer";
import { useConnection } from "../../../services/signalR/connection";
import ErrorConnection from "../../../shared/modals/errorConnection";
import { useAudio } from "../../../contexts/AudioContext";
import mathi from "../../../assets/images/mathi.png";
import { getAuth } from "firebase/auth";
export const QuickGame: React.FC = () => {
  const { player } = usePlayer();
  const navigate = useNavigate();
  const { conn, errorConexion, invoke, on, off } = useConnection();
  const { playBackSound } = useAudio();
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [matchFound, setMatchFound] = useState(false);

  useEffect(() => {
    if (!conn) return;

    const handleMatchFound = (gameData: { gameId?: number; GameId?: number; password?: string; Password?: string }) => {
      console.log("¡Partida encontrada!", gameData);
      setMatchFound(true);
      setSearching(false);
      const gid = gameData.gameId || gameData.GameId;
      setTimeout(() => {
        navigate(`/multijugador/${gid}`);
      }, 1500);
    };

    const handleError = (errorMessage: string) => {
      console.error("Error del servidor:", errorMessage);
      setError(errorMessage);
      setShowModal(true);
      setSearching(false);
    };

    on("MatchFound", handleMatchFound);
    on("Error", handleError);

    return () => {
      off("MatchFound", handleMatchFound);
      off("Error", handleError);
    };
  }, [conn, navigate, on, off]);

  const handleFindMatch = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      setError("Debes iniciar sesión para buscar una partida");
      setShowModal(true);
      return;
    }

    try {
      setSearching(true);
      setError(null);
      setMatchFound(false);
      const uid = user.uid;
      console.log(`Buscando partida competitiva matchmaking para UID: ${uid} (nombre: ${player?.name || ""})`);
      
      // Invocar el método FindMatch de SignalR con el UID del jugador (no el nombre)
      await invoke("FindMatchWithMatchmaking", uid);
      
    } catch (err) {
      console.error("Error al buscar partida:", err);
      setError(errorConexion || "No se pudo conectar al servidor de matchmaking");
      setShowModal(true);
      setSearching(false);
    }
  };

  const handleCancelSearch = () => {
    setSearching(false);
    // TODO: Cancelar búsqueda en el servidor si es necesario
  };

  return (
    <div className="h-screen w-screen bg-[#1C092D] flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <StarsBackground />
      </div>
      <img src={mathi} alt="Mathi" className="absolute top-4 left-4 w-20 h-20 z-10 correr-imagen" />

      <div className="w-full max-w-2xl mx-auto bg-black/90 text-[#5df9f9] p-8 rounded-lg shadow-lg relative z-10">
        <h1 className="text-6xl text-[#f95ec8] uppercase text-center mb-10 drop-shadow-[0_0_10px_#00ffff]">
          Partida Competitiva
        </h1>

        <div className="text-center mb-8">
          <p className="text-2xl text-white mb-4">
            Jugador: <span className="text-[#5df9f9] font-bold">{player?.name || "Invitado"}</span>
          </p>
          <p className="text-lg text-gray-300">
            Se te emparejará automáticamente con otro jugador disponible
          </p>
        </div>

        {searching && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-[#5df9f9] mx-auto mb-4"></div>
            <p className="text-2xl text-white animate-pulse">Buscando oponente...</p>
            <p className="text-lg text-gray-400 mt-2">Por favor espera</p>
          </div>
        )}

        {matchFound && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎮</div>
            <p className="text-3xl text-green-400 font-bold animate-pulse">¡Partida Encontrada!</p>
            <p className="text-lg text-white mt-2">Preparando el juego...</p>
          </div>
        )}

        {!searching && !matchFound && (
          <div className="space-y-6">
            <div className="bg-black/70 border-2 border-[#5df9f9] rounded-lg p-6">
              <h3 className="text-2xl text-[#f95ec8] mb-4">Reglas de la Partida Competitiva:</h3>
              <ul className="text-white space-y-2">
                <li>• Matchmaking automático con jugadores en línea</li>
                <li>• Dificultad y configuración aleatoria</li>
                <li>• Gana el primero en completar todas las preguntas correctamente</li>
                <li>• PowerUps habilitados</li>
              </ul>
            </div>

            <div className="flex gap-4 justify-center">
              <Link
                to="/menu"
                onClick={playBackSound}
                className="bg-red-600 text-white border-2 border-white px-8 py-3 rounded text-2xl hover:bg-red-700 hover:drop-shadow-[0_0_10px_#ff0000] transition-all"
              >
                ← Volver
              </Link>
              <button
                onClick={handleFindMatch}
                disabled={!player?.name}
                className={`bg-[#5df9f9] text-black border-2 border-white px-8 py-3 rounded text-2xl transition-all ${
                  !player?.name
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-[#f95ec8] hover:drop-shadow-[0_0_10px_#00ffff]'
                }`}
              >
                Buscar Partida
              </button>
            </div>
          </div>
        )}

        {searching && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleCancelSearch}
              className="bg-red-600 text-white border-2 border-white px-8 py-3 rounded text-2xl hover:bg-red-700 hover:drop-shadow-[0_0_10px_#ff0000] transition-all"
            >
              Cancelar Búsqueda
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <ErrorConnection
          message={error || "Ocurrió un error al buscar la partida"}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};