import React from "react";

interface UserCardProps {
    username: string;
    email: string;
    partidas: number;
    puntuacion: number;
    avatarUrl?: string;
}

export const UserInfoSection: React.FC<UserCardProps> = ({
    username,
    email,
    partidas,
    puntuacion,
    avatarUrl,
}) => {
    return (
        <div className="w-full h-full flex flex-col items-center gap-6 bg-black py-6">
            {/* Avatar */}
            <div className="flex flex-col items-center mb-3">
                <div className="w-36 h-36 rounded-full border-2 border-pink-500 flex items-center justify-center overflow-hidden">
                    <img src={avatarUrl} alt="avatar" className="w-28 h-28" />
                </div>
                <p className="mt-2 text-cyan-400 text-3xl">{username}</p>
            </div>

            {/* Cards estadísticas */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
                <div className="border border-cyan-400 rounded p-4 text-center">
                    <p className="text-cyan-400 text-3xl">Partidas jugadas</p>
                    <p className="text-white text-3xl">{partidas}</p>
                </div>

                <div className="border border-cyan-400 rounded p-4 text-center">
                    <p className="text-cyan-400 text-3xl">Puntuación</p>
                    <p className="text-white text-3xl">{puntuacion.toLocaleString()}</p>
                </div>
            </div>

            {/* Card email */}
            <div className="border border-cyan-400 rounded p-4 text-center w-full max-w-2xl">
                <p className="text-cyan-400 text-3xl">Email registrado</p>
                <p className="text-white text-3xl">{email}</p>
            </div>
        </div>
    );
};

