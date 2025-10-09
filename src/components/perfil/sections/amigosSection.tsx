import { useState } from "react";
import { FriendList } from "../components/listaAmigos"

export interface Friend {
    id: number;
    nombre: string;
    puntos: number;
    avatarUrl: string;
    carUrl: string;
}

export const AmigosSection = () => {
    const [friends, setFriends] = useState<Friend[]>([
        {
            id: 1,
            nombre: "Amigo1",
            puntos: 10253,
            avatarUrl: "/avatar1.png",
            carUrl: "/carro.png",
        },
        {
            id: 2,
            nombre: "SegundoAmigo",
            puntos: 9563,
            avatarUrl: "/avatar2.png",
            carUrl: "/carro.png",
        },
        {
            id: 3,
            nombre: "Amigo3",
            puntos: 11238,
            avatarUrl: "/avatar3.png",
            carUrl: "/carro.png",
        },
        {
            id: 3,
            nombre: "4toAmigo",
            puntos: 11238,
            avatarUrl: "/avatar3.png",
            carUrl: "/carro.png",
        },
        {
            id: 3,
            nombre: "888jugador",
            puntos: 11238,
            avatarUrl: "/avatar3.png",
            carUrl: "/carro.png",
        },
    ]);

    const handleRemove = (id: number) => {
        setFriends((prev) => prev.filter((friend) => friend.id !== id));
    };

    const handleAdd = () => {
        // 1. Mostrar modal para buscar un amigo en el juego
        // 2. Llamar al back para guardar amigo
        // 3. Refrescar la tabla
        const newFriend: Friend = {
            id: Date.now(), // ID único
            nombre: "NuevoAmigo",
            puntos: Math.floor(Math.random() * 10000),
            avatarUrl: "/avatarDefault.png",
            carUrl: "/carro.png",
        };
        setFriends((prev) => [...prev, newFriend]);
    };

    return (
        <div className="w-full h-full flex flex-col items-center gap-6 bg-black py-6">
            {/* Título centrado */}
            <span className="text-white text-xl">
                Lista de amigos
            </span>

            {/* Tabla centrada */}
            <div className="w-full">
                <FriendList
                    friends={friends}
                    onRemove={handleRemove}
                />
            </div>

            {/* Botón centrado */}
            <button
                className="bg-[#00f0ff] text-slate-950 border-2 border-white px-8 py-2
                text-xl tracking-wider transition-all duration-300 
                hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.3)] 
                hover:shadow-[0_0_20px_rgba(0,217,255,0.6)]
                mt-4"
                onClick={handleAdd}
            >
                AGREGAR AMIGO
            </button>
        </div>

    );

}