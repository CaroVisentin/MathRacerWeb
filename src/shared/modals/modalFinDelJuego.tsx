import type { JugadorDto } from "../../types/jugador/jugador";
import coinImg from '../../assets/images/coin.png';
import carImg from '../../assets/images/auto.png';

interface ModalFinJuegoProps {
    modo: "historia" | "multijugador";
    nivel?: number; // No se usa en multijugador
    recompensa?: number; // No se usa en multijugador
    jugadores?: JugadorDto[];
    jugadorActual?: string;
    onClose: () => void;
    onAction: () => void;
}

export const ModalFinJuego = ({ modo, nivel, recompensa, jugadores = [], jugadorActual, onClose, onAction }: ModalFinJuegoProps) => {

    // Determinar ganador en multijugador
    const ganador =
        modo === "multijugador" && jugadores.length > 0
            ? jugadores.reduce((max, j) => (j.puntos > max.puntos ? j : max), jugadores[0])
            : null;

    const esGanador = jugadorActual && ganador?.nombreJugador === jugadorActual;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="bg-[#484848] text-white rounded-lg p-6 w-[400px] max-w-full">

                {/* Título */}
                {modo === "historia" && (
                    <div className="mt-4 text-center">
                        <span className="inline-block bg-[#5C7339] text-white px-6 rounded text-lg">
                            Nivel {nivel}
                        </span>
                    </div>
                )}
                <h2 className={`text-center text-5xl ${(esGanador || modo === "historia") ? "text-[#A6FF00]" : "text-[#FB2828]"}`}>
                    {modo === "historia"
                        ? "¡GANASTE!"
                        : esGanador
                            ? "¡GANASTE!"
                            : "Fin de la partida"}
                </h2>

                {/* Contenido según modo */}
                {modo === "historia" && (
                    <div className="mt-4 text-center">

                        <div className="mt-4">
                            <img
                                src={carImg}
                                alt="auto"
                                className="mx-auto w-44 h-32 object-contain"
                            />
                        </div>

                        <p className="mt-4 text-xl">Recompensa obtenida</p>
                        <div className="flex items-center justify-center gap-2 mt-2">
                            <img src={coinImg} alt="moneda" className="w-6 h-6" />
                            <span className="text-4xl">{recompensa}</span>
                        </div>
                    </div>
                )}

                {modo === "multijugador" && (
                    <div className="mt-4">
                        <h3 className="text-center text-lg font-semibold">RESULTADOS</h3>
                        <ul className="mt-4 space-y-2">
                            {jugadores
                                .sort((a, b) => b.puntos - a.puntos)
                                .map((j, i) => (
                                    <li
                                        key={j.nombreJugador}
                                        className={`flex justify-between p-2 rounded ${j.nombreJugador === ganador?.nombreJugador
                                            ? "bg-green-700"
                                            : "bg-gray-700"
                                            }`}
                                    >
                                        <span>
                                            🏅 {i + 1}. {j.nombreJugador}
                                            {j.nombreJugador === jugadorActual && " (Tú)"}
                                        </span>
                                        <span className="">{j.puntos}</span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                )}

                {/* Botones */}
                <div className="flex justify-between mt-6">
                    <button
                        onClick={onClose}
                        className="bg-gray-600 px-6 py-2 rounded hover:bg-gray-500"
                    >
                        Regresar
                    </button>
                    <button
                        onClick={onAction}
                        className="bg-teal-600 px-6 py-2 rounded hover:bg-teal-500"
                    >
                        {modo === "historia" ? "Siguiente" : "Volver a jugar"}
                    </button>
                </div>

            </div>
        </div>
    );
};
