import React from "react";
import type { JugadorDto } from "../../types/jugador/jugador";
import medallaOro from "../../assets/images/medalla1.png";
import medallaPlata from "../../assets/images/medalla2.png";

import auto from "../../assets/images/auto.png";

interface ModalFinMultijugadorProps {
    jugadores: JugadorDto[];
    jugadorActual: string;
    gano: boolean;
    onClose: () => void;
    onRetry: () => void;
}

export const ModalFinMultijugador: React.FC<ModalFinMultijugadorProps> = ({
    jugadores,
    jugadorActual,
    gano,
    onClose,
    onRetry,
}) => {
    // Ordenar jugadores por puntos
    const jugadoresOrdenados = [...jugadores].sort((a, b) => b.puntos - a.puntos);

    // Medallas por posición
    const medallas = [medallaOro, medallaPlata];

    // Mapear autos según autoId
    const autos: Record<number, string> = {
        1: auto,
        2: auto,
        3: auto,
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="bg-[#484848] text-white rounded-2xl p-6 w-[500px] max-w-full border-4 border-white">
                {/* Título */}
                <h2
                    className={`text-center text-5xl ${gano ? "text-[#A6FF00]" : "text-[#FB2828]"
                        }`}
                >
                    {gano ? "¡GANASTE!" : "¡PERDISTE!"}
                </h2>

                {/* Subtítulo */}
                <h3 className="text-center text-2xl mt-2">RESULTADOS</h3>

                {/* Lista de jugadores */}
                <ul className="mt-6 space-y-6">
                    {jugadoresOrdenados.map((j, i) => (
                        <li
                            key={j.nombreJugador}
                            className="flex items-center justify-center gap-6"
                        >
                            {/* Medalla */}
                            {i < 3 && (
                                <img
                                    src={medallas[i]}
                                    alt={`Medalla ${i + 1}`}
                                    className={`${i === 0 ? "w-20 h-20" : "w-16 h-16"}`}
                                />
                            )}

                            {/* Nombre y puntos */}
                            <div className="flex flex-col items-start text-left">
                                <p className={`${i === 0 ? "text-2xl" : "text-xl"}`}>
                                    {j.nombreJugador}
                                    {j.nombreJugador === jugadorActual && " (Tú)"}
                                </p>
                                <p className={`${i === 0 ? "text-lg" : "text-base"} text-gray-300`}>
                                    Puntos: {j.puntos}
                                </p>
                            </div>

                            {/* Auto */}
                            {autos[j.autoId] && (
                                <img
                                    src={autos[j.autoId]}
                                    alt={`Auto de ${j.nombreJugador}`}
                                    className={`${i === 0 ? "w-28 h-20" : "w-20 h-16"} object-contain`}
                                />
                            )}
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

