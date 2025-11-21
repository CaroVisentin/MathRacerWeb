import { useEffect, useMemo, useState } from "react";
import { BackButton } from "../../shared/buttons/backButton";
import jugador1 from "../../assets/images/jugador1.png";
import jugador2 from "../../assets/images/jugador2.png";
import jugador3 from "../../assets/images/jugador3.png";
import type { RankingPlayer } from "../../models/ui/ranking/ranking";
import { StarsBackground } from "../../shared/backgrounds/starBackground";
import { getRankingTop10 } from "../../services/player/rankingService";
import { usePlayer } from "../../hooks/usePlayer";
import ErrorConnection from "../../shared/modals/errorConnection";
import type { AxiosError } from "axios";

export const RankingPage = () => {
  const { player } = usePlayer();
  const [players, setPlayers] = useState<RankingPlayer[]>([]);
  const [currentPlayerPosition, setCurrentPlayerPosition] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRanking = async () => {
      if (!player?.id) return;
      try {
        setLoading(true);
        setError(null);
        const data = await getRankingTop10(player.id);

        const avatars = [jugador1, jugador2, jugador3];
        const mapped: RankingPlayer[] = (data.top10 || []).map((p, idx) => ({
          id: p.playerId,
          username: p.name,
          score: p.points,
          image: avatars[idx % avatars.length],
        }));
        setPlayers(mapped);
        setCurrentPlayerPosition(data.currentPlayerPosition);
      } catch (e: unknown) {
        const error = e as AxiosError<{ message: string }>;

        if (error.response?.status === 404) {
          setError(
            error.response.data?.message ||
              "Jugador no encontrado en el ranking"
          );
        } else {
          setError("No se pudo cargar el ranking");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRanking();
  }, [player?.id]);

  // Ordenamos por puntaje desc si hiciera falta y construimos podio visual 2-1-3
  const rankings = useMemo(
    () => [...players].sort((a, b) => b.score - a.score),
    [players]
  );
  const podiumOrder = useMemo(
    () =>
      rankings.slice(0, 3).length === 3
        ? [rankings[1], rankings[0], rankings[2]]
        : rankings,
    [rankings]
  );

  // Definimos colores por posición
  const getColor = (position: number) => {
    if (position === 1) return "cyan";
    if (position === 2) return "yellow";
    return "red";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      {/* Fondo de estrellas */}
      <StarsBackground />

      {/* Contenido de la página */}
      <div className="w-full z-10 left-4 top-4 absolute ">
        <BackButton />
      </div>

      {/* Ranking Header */}
      <div className="relative mb-12">
        <div className="px-12 py-3 rounded-lg">
          <h1 className="text-white text-9xl tracking-wider drop-shadow-[0_0_10px_#00ffff]">
            RANKING
          </h1>
          {currentPlayerPosition > 0 && (
            <p className="mt-2 text-4xl text-cyan-400 text-center">
              Tu posición: #{currentPlayerPosition}
            </p>
          )}
        </div>
      </div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-4 !mb-12 w-full max-w-md">
        {podiumOrder.map((player, idx) => {
          // Definimos la posición real del jugador
          const realPosition =
            rankings.findIndex((p) => p.id === player.id) + 1;

          // Altura de la imagen según posición visual (idx)
          const imgHeight = idx === 0 ? "h-28" : idx === 1 ? "h-32" : "h-24";

          // Altura del bloque del podio según posición visual
          const blockHeight = idx === 0 ? "h-16" : idx === 1 ? "h-20" : "h-14";

          // Color según posición real
          const color =
            realPosition === 1 ? "cyan" : realPosition === 2 ? "yellow" : "red";

          return (
            <div key={player.id} className="flex flex-col items-center flex-1">
              {/* Character */}
              <div className="text-4xl mb-2">
                <img
                  src={player.image}
                  alt={player.username}
                  className={`${imgHeight} object-contain`}
                />
              </div>

              {/* Podium Block */}
              <div
                className={`w-full ${blockHeight} border-2 ${
                  color === "cyan"
                    ? "border-cyan-400 bg-cyan-950"
                    : color === "yellow"
                      ? "border-yellow-400 bg-yellow-950"
                      : "border-red-500 bg-red-950"
                } flex items-center drop-shadow-[0_0_10px_#00ffff] justify-center`}
              >
                <span
                  className={`text-4xl ${
                    color === "cyan"
                      ? "text-cyan-400"
                      : color === "yellow"
                        ? "text-yellow-400"
                        : "text-red-500"
                  }`}
                >
                  {realPosition}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rankings List */}
      <div className="w-full max-w-2xl text-3xl space-y-3">
        {rankings.map((player, index) => (
          <div
            key={player.id}
            className={`!mb-5 border-2 p-3 flex items-center justify-between ${
              getColor(index + 1) === "cyan"
                ? "border-cyan-400"
                : getColor(index + 1) === "yellow"
                  ? "border-yellow-400"
                  : "border-red-500"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`text-xl ${
                  getColor(index + 1) === "cyan"
                    ? "text-cyan-400"
                    : getColor(index + 1) === "yellow"
                      ? "text-yellow-400"
                      : "text-red-500"
                }`}
              >
                {index + 1}
              </span>

              {/* Imagen jugador */}
              <img
                src={player.image}
                alt={player.username}
                className="w-6 h-6 object-contain rounded-full"
              />

              <span
                className={`font-medium ${
                  getColor(index + 1) === "cyan"
                    ? "text-cyan-400"
                    : getColor(index + 1) === "yellow"
                      ? "text-yellow-400"
                      : "text-red-500"
                }`}
              >
                {player.username}
              </span>
            </div>
            <span
              className={`text-xl ${
                getColor(index + 1) === "cyan"
                  ? "text-cyan-400"
                  : getColor(index + 1) === "yellow"
                    ? "text-yellow-400"
                    : "text-red-500"
              }`}
            >
              {player.score.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {error && (
        <ErrorConnection message={error} onClose={() => setError(null)} />
      )}
    </div>
  );
};
