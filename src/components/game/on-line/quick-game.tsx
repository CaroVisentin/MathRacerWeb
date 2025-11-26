import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { usePlayer } from "../../../hooks/usePlayer";
import { useConnection } from "../../../services/signalR/connection";
import ErrorConnection from "../../../shared/modals/errorConnection";
import { useAudio } from "../../../contexts/AudioContext";
import { getAuth } from "firebase/auth";
import { MultiplayerMatchmaking } from "../multiplayer/multiplayerMatchmaking";
import type { GameUpdateDto } from "../../../models/domain/signalR/gameUpdateDto";

export const QuickGame: React.FC = () => {
  const { player } = usePlayer();
  const { conn, errorConexion, invoke, on, off } = useConnection();
  const { playBackSound } = useAudio();
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const [gameIdFound, setGameIdFound] = useState<number | null>(null);
  const [initialGameData, setInitialGameData] = useState<GameUpdateDto | null>(null);
  const fallbackTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!conn) return;

    const handleMatchFound = (gameData: { gameId?: number; GameId?: number; password?: string; Password?: string }) => {
      const gid = gameData.gameId || gameData.GameId;


      if (gid) {
        setMatchFound(true);
        setSearching(false);
        if (fallbackTimerRef.current) {
          clearTimeout(fallbackTimerRef.current);
        }
      }
    };

    const handleError = (errorMessage: string) => {
      console.error("❌ Error del servidor:", errorMessage);
      setError(errorMessage);
      setShowModal(true);
      setSearching(false);
    };

    // Listener para GameUpdate
    const handleGameUpdate = (data: GameUpdateDto) => {

      const gid = data.gameId;
      const status = data.status;
      const players = data.players || [];
      const playerCount = players.length;

      // Iniciar juego si el status es InProgress O si hay 2 jugadores
      if (status === "InProgress" || playerCount >= 2) {
        setInitialGameData(data);
        setGameIdFound(gid);
        setMatchFound(true);
        setSearching(false);
        if (fallbackTimerRef.current) {
          clearTimeout(fallbackTimerRef.current);
        }
      }
    };


    on("MatchFound", handleMatchFound);
    on("Error", handleError);

    // Registrar todas las variantes de GameUpdate
    on("GameUpdate", handleGameUpdate);
    on("gameUpdate", handleGameUpdate);
    on("game-update", handleGameUpdate);
    on("gameupdate", handleGameUpdate);

    return () => {

      if (!gameIdFound) {
        off("GameUpdate", handleGameUpdate);
        off("gameUpdate", handleGameUpdate);
        off("game-update", handleGameUpdate);
        off("gameupdate", handleGameUpdate);
      }
      off("MatchFound", handleMatchFound);
      off("Error", handleError);
    };
  }, [conn, on, off, fallbackTimerRef, gameIdFound]);

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
      await invoke("FindMatchWithMatchmaking", uid);



    } catch {

      setError(errorConexion || "No se pudo conectar al servidor de matchmaking");
      setShowModal(true);
      setSearching(false);
    }
  };

  const handleCancelSearch = () => {
    setSearching(false);
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
    }

  };

  // Si ya encontramos partida, mostrar el componente de juego
  if (gameIdFound) {
    return <MultiplayerMatchmaking gameIdProp={gameIdFound} initialData={initialGameData || undefined} />;
  }

  return (
    <div className="h-screen w-screen fondo-city flex items-center justify-center p-4 overflow-hidden">

      <div className="w-full max-w-6xl mx-auto bg-black/60 text-[#5df9f9] p-8 rounded-lg shadow-lg relative z-10">
        {/* <h1 className="text-8xl text-[#5df9f9]  text-center mb-10 drop-shadow-[0_0_8px_#00ffff]">
          Partida Competitiva
        </h1> */}

        <div className="text-center mb-8">
          {/* <p className="text-5xl text-white mb-4 ">
            Jugador: <span className="text-[#5df9f9] ">{player?.name || "Invitado"}</span>
          </p> */}

          <p className="text-lg text-gray-300">
            Se te emparejará automáticamente con otro jugador disponible
          </p>
        </div>

        {searching && (
          <div className="flex flex-col justify-center items-center py-8 text-center">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-[#5df9f9] mb-4"></div>
            <p className="text-2xl text-white animate-pulse">Buscando oponente...</p>
            <p className="text-lg text-gray-400 mt-2">Buscando partidas disponibles</p>
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
          <div className="space-y-6 pt-4 ">
            {/* <div className="bg-black/70 border-2 border-[#5df9f9] rounded-lg p-6">
              <h3 className="text-4xl text-[#f95ec8] mb-4">Reglas de la Partida Competitiva:</h3>
              <ul className="text-white text-2xl space-y-2">
                <li>• Matchmaking automático con jugadores en línea</li>
                <li>• Dificultad y configuración aleatoria</li>
                <li>• Gana el primero en completar todas las preguntas correctamente</li>
                <li>• PowerUps habilitados</li>
              </ul>
            </div> */}

            <div className="flex gap-4 justify-center pt-4">
              <Link
                to="/menu"
                onClick={playBackSound}
                className="bg-red-600 text-white border-2 border-white px-8 py-3 rounded text-2xl hover:bg-red-700 hover:drop-shadow-[0_0_10px_#ff0000] transition-all"
              >
                <i className="ri-arrow-left-line mr-2"></i> Volver
              </Link>
              <button
                onClick={handleFindMatch}
                disabled={!player?.name}
                className={`bg-[#5df9f9] text-black border-2 border-white px-8 py-3 rounded text-2xl transition-all ${!player?.name
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