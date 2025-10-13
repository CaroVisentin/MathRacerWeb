import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

// Reemplazar por DTO del back cuando esté definido
interface Friend {
    id: number;
    nombre: string;
    puntos: number;
    avatarUrl: string;
    carUrl: string;
}

interface FriendListProps {
    friends: Friend[];
    onRemove: (id: number) => void;
}

export const FriendList = ({ friends, onRemove }: FriendListProps) => {
    return (
        <div className="w-full flex flex-col items-center gap-4">
            <div className="w-full max-w-2xl flex flex-col gap-4">
                {friends.map((friend) => (
                    <div
                        key={friend.id}
                        className="grid grid-cols-4 items-center border-2 border-cyan-400 rounded px-6 py-4"
                    >
                        {/* Columna 1: Avatar + nombre (izquierda) */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full border border-pink-500 overflow-hidden">
                                <img
                                    src={friend.avatarUrl}
                                    alt={friend.nombre}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-cyan-400 text-xl">
                                {friend.nombre}
                            </span>
                        </div>

                        {/* Columna 2: Auto (centrado) */}
                        <div className="flex justify-center">
                            <img src={friend.carUrl} alt="carro" className="w-14 h-8" />
                        </div>

                        {/* Columna 3: Puntuación (centrada) */}
                        <div className="flex justify-center">
                            <span className="text-white text-xl">
                                {friend.puntos.toLocaleString()}
                            </span>
                        </div>

                        {/* Columna 4: Botón eliminar (derecha) */}
                        <div className="flex justify-end">
                            <button
                                onClick={() => onRemove(friend.id)}
                                className="text-red-500 hover:text-red-600 text-2xl"
                            >
                                <FontAwesomeIcon icon={faTrash} className="text-xl" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
