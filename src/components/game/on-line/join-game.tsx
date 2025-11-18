
import { useState } from 'react';
import fondoPartida from '../../../assets/images/partidas.png';
import { Link } from 'react-router-dom';

export default function JoinGame() {
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [privacy, setPrivacy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const games = [
    { name: 'Partida 1', difficulty: 'Fácil', privacy: 'Pública' },
    { name: 'Partida 2', difficulty: 'Media', privacy: 'Privada' },
    { name: 'Partida 3', difficulty: 'Difícil', privacy: 'Pública' },
    { name: 'Partida 4', difficulty: 'Media', privacy: 'Privada' },
    { name: 'Partida 5', difficulty: 'Fácil', privacy: 'Pública' },
  ];

  const filteredGames = games.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase()) &&
    (difficulty ? g.difficulty === difficulty : true) &&
    (privacy ? g.privacy === privacy : true)
  );

  const gamesPerPage = 4;
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const displayedGames = filteredGames.slice((currentPage - 1) * gamesPerPage, currentPage * gamesPerPage);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-2"
      style={{ backgroundImage: `url(${fondoPartida})` }}
    >
      <div className="w-full max-w-3xl mx-auto bg-black/90 text-[#5df9f9] p-6 pb-2 rounded-lg shadow-lg ">
        <h1 className="text-5xl text-[#f95ec8] uppercase text-center mb-10 pb-5 drop-shadow-[0_0_10px_#00ffff]">Unirse a partida</h1>

        <div className="grid grid-cols-3 gap-4 mb-4 mt-2.5">
          <input
            type="text"
            placeholder="Nombre"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full mt-1 p-2 rounded bg-black/90 border border-gray-600"
          />
          <select
            value={difficulty}
            onChange={e => setDifficulty(e.target.value)}
            className="w-full mt-1 p-2 rounded bg-black/90 border border-gray-600"
          >
            <option value="">Dificultad</option>
            <option value="Fácil">Fácil</option>
            <option value="Media">Media</option>
            <option value="Difícil">Difícil</option>
          </select>
          <select
            value={privacy}
            onChange={e => setPrivacy(e.target.value)}
            className="w-full mt-1 p-2 rounded bg-black/90 border border-gray-600"
          >
            <option value="">Privacidad</option>
            <option value="Pública">Pública</option>
            <option value="Privada">Privada</option>
          </select>
        </div>

        <table className="w-full   text-left  border border-white" style={{ marginTop: '20px' }}
        >
          <thead className=" bg-cyan-300 text-black drop-shadow-[0_0_10px_#00ffff]">
            <tr>
              <th className="p-2">Nombre</th>
              <th className="p-2">Dificultad</th>
              <th className="p-2">Privacidad</th>
              <th className="p-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {displayedGames.map((game, index) => (
              <tr key={index} className="border-t border-cyan-500">
                <td className="p-2">{game.name}</td>
                <td className="p-2">{game.difficulty}</td>
                <td className="p-2">{game.privacy}</td>
                <td className="p-2">
                  <button className=" bg-[#5df9f9] text-black font-extralight hover:bg-[#f95ec8]  w-15 h-8  py-1  rounded text-xl leading-relaxed hover:drop-shadow-[0_0_10px_#00ffff]">Unirse</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-around items-center text-2xl mt-10 space-x-4 text-white hover:drop-shadow-[0_0_10px_#00ffff] hover:text-[#f95ec8]">
          <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}>&lt;-</button>
          <span>Página {currentPage}</span>
          <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}>&gt;</button>
        </div>

        <div className="flex justify-between mt-3 pt-2 ">
          <Link to="/menu" className="bg-[#5df9f9] text-black font-extralight hover:bg-red-700 w-20 h-10 px-4 content-center rounded text-2xl  hover:drop-shadow-[0_0_10px_#00ffff]" style={{ marginTop: '20px', marginBottom: '20px' }}>Volver</Link>
        </div>
      </div>
    </div>
  );
};


