
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAvailableGames } from "../../../services/game/multiplayer-mode/onlineService";
import type { AvailableGameDto } from "../../../models/domain/signalR/availbleGameDto";
import ErrorConnection from "../../../shared/modals/errorConnection";
import { useAudio } from "../../../contexts/AudioContext";
import { AppHeader } from '../../shared/appHeader';


export default function JoinGame() {
  const navigate = useNavigate();
  const { playBackSound } = useAudio();

  const [games, setGames] = useState<AvailableGameDto[]>([]);
  const [filteredGames, setFilteredGames] = useState<AvailableGameDto[]>([]);
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [privacy, setPrivacy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState<AvailableGameDto | null>(null);
  const [password, setPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Cargar partidas disponibles al montar el componente
  useEffect(() => {
    console.log("=== JOIN GAME COMPONENT MOUNTED ===");
    console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAvailableGames(false); // false para incluir privadas
      setGames(response.games);
      setFilteredGames(response.games);
    } catch (err) {
      console.error("Error al cargar partidas:", err);
      setError("No se pudieron cargar las partidas disponibles");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar partidas cuando cambien los filtros
  useEffect(() => {
    const filtered = games.filter(g =>
      g.gameName.toLowerCase().includes(search.toLowerCase()) &&
      (difficulty ? g.difficulty === difficulty : true) &&
      (privacy ? (privacy === 'Pública' ? !g.isPrivate : g.isPrivate) : true)
    );
    setFilteredGames(filtered);
    setCurrentPage(1); // Resetear a la primera página al filtrar
  }, [search, difficulty, privacy, games]);

  const gamesPerPage = 4;
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const displayedGames = filteredGames.slice((currentPage - 1) * gamesPerPage, currentPage * gamesPerPage);

  const handleJoinClick = (game: AvailableGameDto) => {
    if (game.isFull) {
      setError("Esta partida ya está llena");
      setShowModal(true);
      return;
    }

    if (game.requiresPassword) {
      setSelectedGame(game);
      setShowPasswordModal(true);
    } else {
      handleJoinGame(game.gameId);
    }
  };

  const handleJoinGame = async (gameId: number, pwd?: string) => {
    try {
      setLoading(true);
      console.log("=== HANDLE JOIN GAME ===");
      console.log("GameId:", gameId);
      console.log("Password:", pwd);

      // NO hacer petición HTTP, solo navegar al juego
      // El componente multiplayer.tsx se encargará de hacer JoinGame por SignalR
      console.log("Navegando a multiplayer para unirse por SignalR...");

      // Navegar a la pantalla del juego multijugador con el gameId
      // Pasar la contraseña en el state si existe
      navigate(`/multijugador/${gameId}`, {
        state: { password: pwd }
      });

    } catch (err) {
      console.error("Error al unirse a la partida:", err);
      const error = err as { response?: { data?: { error?: string } }; message?: string };
      setError(error.response?.data?.error || error.message || "No se pudo unir a la partida");
      setShowModal(true);
    } finally {
      setLoading(false);
      setShowPasswordModal(false);
      setPassword('');
    }
  };

  const handlePasswordSubmit = () => {
    if (!selectedGame) return;
    handleJoinGame(selectedGame.gameId, password);
  };

  return (
    <div className="h-screen w-screen fondo-city flex flex-col items-center justify-start overflow-hidden">
      <AppHeader />
      <div className="pt-5 w-full flex flex-col items-center flex-1 overflow-auto ">
        <div className="w-full max-w-5xl mx-auto bg-black/50 text-[#5df9f9] p-6 pb-2 rounded-lg shadow-lg mt-4">
          <h1 className="text-6xl text-[#5df9f9]  text-center mb-10 pb-5 drop-shadow-[0_0_10px_#00ffff] ">
            Unirse a partida
          </h1>

          <div className="grid grid-cols-3 gap-4 mb-4 mt-2.5">
            <input
              type="text"
              placeholder="Nombre"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full mt-1 p-2 rounded bg-black/90 border border-gray-600"
            />
            <select
              value={difficulty}
              onChange={e => setDifficulty(e.target.value)}
              className="w-full mt-1 p-2 rounded bg-black/90 border border-gray-600"
            >
              <option value="">Todas las dificultades</option>
              <option value="Facil">Fácil</option>
              <option value="Medio">Media</option>
              <option value="Dificil">Difícil</option>
            </select>
            <select
              value={privacy}
              onChange={e => setPrivacy(e.target.value)}
              className="w-full mt-1 p-2 rounded bg-black/90 border border-gray-600"
            >
              <option value="">Todas</option>
              <option value="Pública">Pública</option>
              <option value="Privada">Privada</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-8 text-white">Cargando partidas...</div>
          ) : (
            <>
              <table className="w-full text-left border border-white" style={{ marginTop: '20px' }}>
                <thead className="bg-cyan-300 text-black drop-shadow-[0_0_10px_#00ffff]">
                  <tr>
                    <th className="p-2">Nombre</th>
                    <th className="p-2">Jugadores</th>
                    <th className="p-2">Dificultad</th>
                    <th className="p-2">Privacidad</th>
                    <th className="p-2">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedGames.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-white">
                        No hay partidas disponibles
                      </td>
                    </tr>
                  ) : (
                    displayedGames.map((game) => (
                      <tr key={game.gameId} className="border-t border-cyan-500">
                        <td className="p-2">{game.gameName}</td>
                        <td className="p-2">{game.currentPlayers}/{game.maxPlayers}</td>
                        <td className="p-2">{game.difficulty}</td>
                        <td className="p-2">{game.isPrivate ? '🔒 Privada' : '🌐 Pública'}</td>
                        <td className="p-2">
                          <button
                            onClick={() => handleJoinClick(game)}
                            disabled={game.isFull}
                            className={`bg-[#00f0ff] text-black text-2xl border-2 border-white
                tracking-wider transition-all duration-300 
                 hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.3)] 
                 hover:shadow-[0_0_20px_rgba(0,217,255,0.6)]
                 font-extralight w-17 px-2 text-xl leading-relaxed ${game.isFull
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-[#f95ec8] hover:drop-shadow-[0_0_10px_#00ffff]'
                              }`}
                          >
                            {game.isFull ? 'Llena' : 'Unirse'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              <div className="flex justify-around items-center text-2xl mt-10 space-x-4 text-white hover:drop-shadow-[0_0_10px_#00ffff] hover:text-[#f95ec8]">
                <button
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className={currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  &lt;-
                </button>
                <span>Página {currentPage} de {totalPages || 1}</span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={currentPage === totalPages || totalPages === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  &gt;
                </button>
              </div>
            </>
          )}

          <div className="flex justify-between mt-3 pt-2 ">
            <Link
              to="/menu"
              onClick={playBackSound}
              className="bg-[#00f0ff] text-black text-2xl border-2 border-white px-3 py-1
                tracking-wider transition-all duration-300 
                 hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.3)] 
                 hover:shadow-[0_0_20px_rgba(0,217,255,0.6)]
                 disabled:opacity-50"
              style={{ marginTop: '20px', marginBottom: '20px' }}
            >
              <i className="ri-arrow-left-line mr-2"></i> Volver
            </Link>
            <button
              onClick={loadGames}
              className="bg-[#00f0ff] text-black text-2xl border-2 border-white px-3 py-1
                tracking-wider transition-all duration-300 
                 hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.3)] 
                 hover:shadow-[0_0_20px_rgba(0,217,255,0.6)]
                 disabled:opacity-50"
              style={{ marginTop: '20px', marginBottom: '20px' }}
            >
              Actualizar
            </button>
          </div>
        </div>

        {/* Modal para contraseña */}
        {showPasswordModal && selectedGame && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 rounded w-full max-w-md mx-4 flex flex-col gap-4 border border-gray-800">
              <h2 className="text-white text-center text-2xl">Partida Privada</h2>
              <p className="text-gray-200 text-center">
                Esta partida requiere contraseña
              </p>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Ingresa la contraseña"
                className="p-2 rounded w-full bg-gray-800 text-white border border-gray-700"
              />
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4 sm:justify-center">
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPassword('');
                  }}
                  className="w-full sm:w-auto text-red-500 hover:text-red-600"
                >
                  Cancelar
                </button>
                <button
                  onClick={handlePasswordSubmit}
                  className="w-full sm:w-auto bg-[#00f0ff] text-slate-950 border-2 border-white px-6 py-2
                text-xl tracking-wider transition-all duration-300 
                 hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.3)] 
                 hover:shadow-[0_0_20px_rgba(0,217,255,0.6)]
                 disabled:opacity-50"
                  disabled={!password.trim()}
                >
                  Unirse
                </button>
              </div>
            </div>
          </div>

        )}

      </div>
      {/* Modal de error */}
      {showModal && (
        <ErrorConnection
          message={error || "Ocurrió un error"}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};


