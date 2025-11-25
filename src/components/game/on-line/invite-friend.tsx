
import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { friendshipService } from "../../../services/friendship/friendshipService";
import { gameInvitationService } from "../../../services/game/gameInvitationService";
import { friendMapper } from "../../../models/mappers/friendMapper";
import { useAuth } from "../../../hooks/useAuth";
import type { Friend } from "../../../models/ui/profile/friends/friend";
import type { FriendDto } from "../../../models/domain/profile/friends/friendDto";
import Spinner from "../../../shared/spinners/spinner";
import { useAudio } from "../../../contexts/AudioContext";
import { AppHeader } from "../../shared/appHeader";

export default function InviteFriends() {
  const { player } = useAuth();
  const navigate = useNavigate();
  const { playBackSound } = useAudio();

  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sendingTo, setSendingTo] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Medio");
  const [selectedExpectedResult, setSelectedExpectedResult] = useState("Mayor");

  const fetchFriends = useCallback(async () => {
    if (!player?.id) return;
    setLoading(true);
    setError(null);

    try {
      const data: FriendDto[] = await friendshipService.getFriends(player.id);
      const mappedFriends = friendMapper.fromDtoList(data);
      setFriends(mappedFriends);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Error al obtener lista de amigos.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [player]);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  const handleInvite = async (friendId: number) => {
    if (!player?.id) return;

    setSendingTo(friendId);
    setError(null);

    try {
      
      const response = await gameInvitationService.sendInvitation({
        invitedFriendId: friendId,
        difficulty: selectedDifficulty,
        expectedResult: selectedExpectedResult,
      });

      console.log("Invitación enviada:", response);

      // Navegar directamente al juego con el gameId devuelto
      navigate(`/multijugador/${response.gameId}`, {
        state: { password: null } // La partida por invitación no usa password
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al enviar invitación.";
      setError(errorMessage);
      setSendingTo(null);
    }
  };

  // Filtrar amigos por nombre o email
  const filteredFriends = friends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (friend.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
  );

  return (
    <div className="h-screen w-screen fondo-city flex flex-col items-center justify-start">
    <AppHeader />
      <div className="w-full max-w-5xl mx-auto bg-black/60 text-[#5df9f9] px-6 py-3 rounded-lg shadow-lg overflow-auto custom-scrollbar">
        <h1 className="text-6xl text-[#5df9f9]  text-center mb-10 pb-5 drop-shadow-[0_0_10px_#00ffff]">
          Invitar amigo
        </h1>

        <div className="text-center mb-6">
          <p className="text-cyan-400 text-lg">
            Seleccioná la dificultad y el resultado esperado, luego elegí un amigo para invitarlo
          </p>
        </div>

        {/* Selectores de configuración del juego */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-cyan-400 text-xl mb-2">Dificultad:</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full p-3 rounded bg-black/60 border-2 border-cyan-400 text-white text-xl"
            >
              <option value="Facil">Fácil</option>
              <option value="Medio">Medio</option>
              <option value="Dificil">Difícil</option>
            </select>
          </div>

          <div>
            <label className="block text-cyan-400 text-xl mb-2">Resultado esperado:</label>
            <select
              value={selectedExpectedResult}
              onChange={(e) => setSelectedExpectedResult(e.target.value)}
              className="w-full p-3 rounded bg-black/60 border-2 border-cyan-400 text-white text-xl"
            >
              <option value="Mayor">Mayor</option>
              <option value="Menor">Menor</option>
              <option value="Igual">Igual</option>
            </select>
          </div>
        </div>

        {/* Buscador */}
        <div className="mb-4 pt-4 pb-4">
          <input
            type="text"
            placeholder="Buscar amigo por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded bg-black/60 border-2 border-cyan-400 text-white text-xl placeholder-gray-500"
          />
        </div>

        {loading && (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        )}

        {error && (
          <div className="text-red-400 p-4 text-center bg-red-500/10 border border-red-500 rounded mb-4">
            {error}
          </div>
        )}

        {!loading && !error && friends.length === 0 && (
          <div className="text-gray-400 p-8 text-center text-xl">
            No tenés amigos agregados.
            <br />
            Agregá amigos desde tu perfil para poder invitarlos.
          </div>
        )}

        {!loading && !error && friends.length > 0 && (
          <table className="w-full text-left border border-white ">
            <thead className="bg-cyan-300 text-black text-2xl drop-shadow-[0_0_10px_#00ffff]">
              <tr>
                <th className="p-2">Avatar</th>
                <th className="p-2">Nombre</th>
                <th className="p-2">Score</th>
                <th className="p-2">Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredFriends.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-400 text-xl">
                    No se encontraron amigos con ese nombre
                  </td>
                </tr>
              ) : (
                filteredFriends.map((friend) => (
                  <tr key={friend.id} className="border-t border-cyan-500">
                    <td className="p-2 text-xl">
                      <img
                        src={friend.avatarUrl}
                        alt={friend.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400"
                      />
                    </td>
                    <td className="p-2 text-xl">{friend.name}</td>
                    <td className="p-2 text-xl">{friend.points}</td>
                    <td className="p-2 text-xl">
                      <button
                        onClick={() => handleInvite(friend.id)}
                        disabled={sendingTo === friend.id}
                        title="Invitar a jugar"
                        className="bg-[#5df9f9] text-black font-extralight hover:bg-[#f95ec8] w-24 h-8 py-1 rounded text-xl leading-relaxed hover:drop-shadow-[0_0_10px_#00ffff] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {sendingTo === friend.id ? "..." : "Invitar"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        <div className="flex justify-center mt-3 pt-2 border-t border-gray-700">
          <Link
            to="/menu"
            onClick={playBackSound}
            className="bg-[#00f0ff] text-black text-2xl border-2 border-white px-3 py-1
                tracking-wider transition-all duration-300 
                 hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.3)] 
                 hover:shadow-[0_0_20px_rgba(0,217,255,0.6)]
                 disabled:opacity-50"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
           <i className="ri-arrow-left-line mr-2"></i> Volver

          </Link>
        </div>
      </div>
    </div>
  );
}



