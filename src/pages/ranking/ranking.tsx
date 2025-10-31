import { BackButton } from "../../shared/buttons/backButton"
import jugador1 from "../../assets/images/jugador1.png";
import jugador2 from "../../assets/images/jugador2.png";
import jugador3 from "../../assets/images/jugador3.png";
import type { RankingPlayer } from "../../models/ui/ranking";
import { StarsBackground } from "../../shared/backgrounds/starBackground";

export const RankingPage = () => {
    // Hardcodeamos los datos del backend
    const players: RankingPlayer[] = [
        { id: 1, username: "Jugador3309", score: 15900, image: jugador2, },
        { id: 2, username: "Jugador3348", score: 14677, image: jugador1, },
        { id: 3, username: "Jugador3360", score: 14500, image: jugador3, },
        { id: 4, username: "Jugador3380", score: 13000, image: jugador3, },
    ]

    // Ordenamos los jugadores por score descendente
    const rankings = players.sort((a, b) => b.score - a.score)

    // Para el podio: posición visual 2-1-3
    const podiumOrder = [
        rankings[1], // segundo puesto a la izquierda
        rankings[0], // primer puesto en el centro
        rankings[2], // tercer puesto a la derecha
    ]

    // Definimos colores por posición
    const getColor = (position: number) => {
        if (position === 1) return "cyan"
        if (position === 2) return "yellow"
        return "red"
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center">
            {/* Fondo de estrellas */}
            <StarsBackground />

            {/* Contenido de la página */}
            <div className="w-full z-10">
                <BackButton />
            </div>

            {/* Ranking Header */}
            <div className="relative mb-12">
                <div className="px-12 py-3 rounded-lg">
                    <h1 className="text-white text-5xl tracking-wider">RANKING</h1>
                </div>
            </div>

            {/* Podium */}
            <div className="flex items-end justify-center gap-4 !mb-12 w-full max-w-md">
                {podiumOrder.map((player, idx) => {
                    // Definimos la posición real del jugador
                    const realPosition = rankings.findIndex(p => p.id === player.id) + 1

                    // Altura de la imagen según posición visual (idx)
                    const imgHeight = idx === 0 ? "h-28" : idx === 1 ? "h-32" : "h-24"

                    // Altura del bloque del podio según posición visual
                    const blockHeight = idx === 0 ? "h-16" : idx === 1 ? "h-20" : "h-14"

                    // Color según posición real
                    const color =
                        realPosition === 1 ? "cyan" : realPosition === 2 ? "yellow" : "red"

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
                                className={`w-full ${blockHeight} border-2 ${color === "cyan"
                                    ? "border-cyan-400 bg-cyan-950"
                                    : color === "yellow"
                                        ? "border-yellow-400 bg-yellow-950"
                                        : "border-red-500 bg-red-950"
                                    } flex items-center justify-center`}
                            >
                                <span
                                    className={`text-4xl ${color === "cyan"
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
                    )
                })}
            </div>

            {/* Rankings List */}
            <div className="w-full max-w-2xl space-y-3">
                {rankings.map((player, index) => (
                    <div
                        key={player.id}
                        className={`!mb-5 border-2 p-3 flex items-center justify-between ${getColor(index + 1) === "cyan"
                            ? "border-cyan-400"
                            : getColor(index + 1) === "yellow"
                                ? "border-yellow-400"
                                : "border-red-500"
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <span
                                className={`text-xl ${getColor(index + 1) === "cyan"
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
                                className={`font-medium ${getColor(index + 1) === "cyan"
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
                            className={`text-xl ${getColor(index + 1) === "cyan"
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
        </div>
    )
}
