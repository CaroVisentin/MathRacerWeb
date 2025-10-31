
import fondoPartida from '../../../assets/images/partidas.png';
import { Link } from 'react-router-dom';
export default function InviteFriends ()  {
  const friends = [
    { name: 'Amigo 1', score: 1200, avatar: '🧑' },
    { name: 'Amigo 2', score: 950, avatar: '👩' },
    { name: 'Amigo 3', score: 1100, avatar: '🧔' },
  ];

  return (
     <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-2"
      style={{ backgroundImage: `url(${fondoPartida})` }}
    >
    <div className="w-full max-w-5xl mx-auto bg-black/90 text-[#5df9f9] p-6 pb-2 rounded-lg shadow-lg ">
      <h1 className="text-5xl text-[#f95ec8] uppercase text-center mb-10 pb-5 drop-shadow-[0_0_10px_#00ffff] font-audiowide">Invitar amigo</h1>

      <table className="w-full   text-left  border border-white ">
        <thead className=" bg-cyan-300 text-black text-2xl drop-shadow-[0_0_10px_#00ffff]">
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
              <td className="p-2 text-xl">{friend.name}</td>
              <td className="p-2 text-xl">{friend.score}</td>
              <td className="p-2 text-xl">
                <button className=" bg-[#5df9f9] text-black font-extralight hover:bg-[#f95ec8]  w-15 h-8  py-1  rounded text-xl leading-relaxed hover:drop-shadow-[0_0_10px_#00ffff]"
                >Invitar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          <div className="flex justify-between mt-3 pt-2 border-t border-gray-700">
      <Link to="/menu" className="bg-[#5df9f9] text-black font-extralight hover:bg-red-700 w-20 h-10 px-4 content-center rounded text-2xl  hover:drop-shadow-[0_0_10px_#00ffff]"style={{ marginTop: '20px',marginBottom:'20px' }}>Volver</Link>
    </div>
    </div>
    </div>
  );
};


