
import React from 'react';

export default function InviteFriends ()  {
  const friends = [
    { name: 'Amigo 1', score: 1200, avatar: '🧑' },
    { name: 'Amigo 2', score: 950, avatar: '👩' },
    { name: 'Amigo 3', score: 1100, avatar: '🧔' },
  ];

  return (
    <div className="p-6 text-white font-sans">
      <h1 className="text-5xl text-[#f95ec8] uppercase text-center mb-10 pb-5 drop-shadow-[0_0_10px_#00ffff] font-audiowide">Invitar amigo</h1>

      <table className="w-full text-left border border-cyan-500">
        <thead className="bg-cyan-700">
          <tr>
            <th className="p-2">Avatar</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Score</th>
            <th className="p-2">Acción</th>
          </tr>
        </thead>
        <tbody>
          {friends.map((friend, index) => (
            <tr key={index} className="border-t border-cyan-500">
              <td className="p-2 text-xl">{friend.avatar}</td>
              <td className="p-2">{friend.name}</td>
              <td className="p-2">{friend.score}</td>
              <td className="p-2">
                <button className="bg-green-600 hover:bg-green-800 px-3 py-1 rounded">Invitar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="mt-6 bg-red-600 hover:bg-red-800 px-4 py-2 rounded">Volver</button>
    </div>
  );
};


