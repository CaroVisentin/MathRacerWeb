import React, { useEffect } from "react";
import medallaOro from "../../assets/images/medalla1.png";
import medallaPlata from "../../assets/images/medalla2.png";
import type { PlayerDto } from "../../models/domain/signalR/playerDto";
import auto1 from "../../assets/images/auto.png";
import mathi from "../../assets/images/mathi.png";
import { useAudio } from "../../contexts/AudioContext";

interface EndOfMultiplayerModeModalProps {
  players: PlayerDto[];
  won: boolean;
  currentPlayer: string;
  onClose: () => void;
  onRetry: () => void;
}

export const EndOfMultiplayerModeModal: React.FC<
  EndOfMultiplayerModeModalProps
> = ({ players, currentPlayer, onClose, onRetry }) => {
  const { playWinnerSound, playGameOverSound } = useAudio();

  // position 1 = ganador
  const jugadoresOrdenados = [...players].sort(
    (a, b) => a.position - b.position
  );

  // Buscar al jugador actual
  const jugadorActual = players.find((j) => j.name === currentPlayer);

  // Determinar si ganó (posición = 1)
  const won = jugadorActual?.position === 1;

  // Reproducir sonido al montar el modal
  useEffect(() => {
    if (won) {
      playWinnerSound();
    } else {
      playGameOverSound();
    }
  }, [won, playWinnerSound, playGameOverSound]);

  // Medallas por posición (solo ejemplo)
  const medallas = [medallaOro, medallaPlata];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-[#484848] text-white rounded-2xl p-6 w-[500px] max-w-full border-4 border-white">
        {/* Título */}
        <div className="flex items-center justify-center gap-4">
          <img
            src={mathi}
            alt="Mathi"
            className="w-20 h-20 drop-shadow-[0_0_5px_#00FFFF] animate-bounce"
          />
          <h2
            className={`text-center text-5xl ${won ? "text-[#A6FF00]" : "text-[#FB2828]"}`}
          >
            {won ? "¡GANASTE!" : "¡PERDISTE!"}
          </h2>
        </div>

        {/* Subtítulo */}
        <h3 className="text-center text-2xl mt-2">RESULTADOS</h3>

        {/* Lista de jugadores */}
        <ul className="mt-6 space-y-6">
          {jugadoresOrdenados.map((j, i) => (
            <li key={j.name} className="flex items-center justify-center gap-6">
              {/* Medalla */}
              {i < medallas.length && (
                <img
                  src={medallas[i]}
                  alt={`Medalla ${i + 1}`}
                  className={`${i === 1 ? "w-20 h-20" : "w-16 h-16"}`}
                />
              )}

              {/* Nombre y posición */}
              <div className="flex flex-col items-start text-left">
                <p className={`${i === 0 ? "text-2xl" : "text-xl"}`}>
                  {j.name}
                  {j.name === currentPlayer && " (Tú)"}
                </p>
              </div>

              {/* Auto */}
              {/* Auto hardcodeado */}
              <img
                src={auto1} // la imagen que pusiste en public
                alt={`Auto de ${j.name}`}
                className={`${i === 0 ? "w-28 h-20" : "w-20 h-16"} object-contain`}
              />
            </li>
          ))}
        </ul>

        {/* Botones */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="bg-gray-600 px-6 py-2 rounded hover:bg-gray-500"
          >
            Regresar
          </button>
          <button
            onClick={onRetry}
            className="bg-teal-600 px-6 py-2 rounded hover:bg-teal-500"
          >
            Volver a jugar
          </button>
        </div>
      </div>
    </div>
  );
};
