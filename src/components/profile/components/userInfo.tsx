import React from "react";

interface UserCardProps {
  username: string;
  email: string;
  lastLevel: number;
  puntuacion: number;
  backgroundUrl?: string;
  avatarUrlId?: string;
}

export const UserInfoSection: React.FC<UserCardProps> = ({
  username,
  email,
  lastLevel,
  puntuacion,
  backgroundUrl,
  avatarUrlId,
}) => {
  return (
    <div className="w-full h-full flex flex-col items-center gap-6 bg-[#1a0a2e] py-6">
      {/* Avatar */}
      <div className="flex flex-col items-center mb-3">
        <div
          className="w-36 h-36 rounded-full border-4 border-pink-500 flex items-center justify-center overflow-hidden"
          style={
            backgroundUrl
              ? {
                  backgroundImage: `url(${backgroundUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
          }
        >
          {/*  <img src={`images/characters/${avatarUrlId}.png`} alt="avatar" className="w-28 h-28" /> */}
          <img
            src={avatarUrlId}
            alt="avatar"
            className="w-36 h-36 object-cover"
          />
        </div>
        <p className="mt-2 text-cyan-400 text-3xl">{username}</p>
      </div>

      {/* Cards estadísticas */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
        <div className="border border-cyan-400 rounded p-4 text-center">
          <p className="text-cyan-400 text-3xl">Niveles jugados</p>
          <p className="text-white text-3xl">{lastLevel}</p>
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
