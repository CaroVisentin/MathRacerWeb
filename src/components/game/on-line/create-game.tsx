// export const CreateGame: React.FC = () => {
//   return <div className="text-white text-2xl p-8">Crear Partida 🛠️</div>;
// };

import { useState } from "react";
import fondoPartida from '../../../assets/images/partidas.png';

//export default function CreateGame( {onCreateGame}: {onCreateGame: (gameData: any) => void} ) {
  export default function CreateGame(){
const[formData, setFormData] = useState({
    nombrePartida: '',
    privacidad: 'publico',
    contraseña: '',
    dificultad: 'Facil',
    tipodeResultado: 'El Mayor',
  });
  const [connected, setConnected] = useState<any>(null);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   // onCreateGame(formData); // Llama a la función pasada por props con los datos del formulario y emitir con signal R
  console
  };
  return (

    <div
  className="min-h-screen bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: `url(${fondoPartida})` }}
>

    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-gray-900 text-white p-6 rounded-lg shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">Crear Partida</h2>

    <label className="block">
        Nombre de la Partida:
        <input  
          type="text"
          name="nombrePartida"
          value={formData.nombrePartida}
          onChange={handleChange}
          className="w-full mt-1 p-2 rounded bg-gray-800 border border-gray-600"
          />
      </label>
      <label className="block">
        Privacidad:
        <select
          name="privacidad"
          value={formData.privacidad}
          onChange={handleChange} 
          className="w-full mt-1 p-2 rounded bg-gray-800 border border-gray-600"
          >
          <option value="publica">Pública</option>
          <option value="privada">Privada</option>
        </select>
      </label>
      {formData.privacidad === 'privada' && (
        <label className="block">
          Contraseña:
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded bg-gray-800 border border-gray-600"
          />
        </label>
      )}
      <label className="block">
        Dificultad:
        <select
          name="dificultad"
          value={formData.dificultad}
          onChange={handleChange} 
          className="w-full mt-1 p-2 rounded bg-gray-800 border border-gray-600" 
          >
          <option value="Facil">Fácil</option>
          <option value="Medio">Medio</option>
          <option value="Dificil">Difícil</option>
        </select>
      </label>
      <label className="block">
        Tipo de Resultado:
        <select
          name="tipodeResultado"
          value={formData.tipodeResultado}
          onChange={handleChange}
          className="w-full mt-1 p-2 rounded bg-gray-800 border border-gray-600"
          >
          <option value="El Mayor">El Mayor</option>
          <option value="El Menor">El Menor</option>
          <option value="Igual">Igual</option> 
        </select>
      </label>
      <div className="flex justify-center mt-6">
        <button
          type="button"
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">← Volver</button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Crear</button>

      </div>
    </form>
    </div>
  );
}

//el componentte create game seira este 
{/*// components/game/on-line/create-game.tsx
export default function CreateGame({ onCreateGame }) {
  // contiene el formulario
}}

create game page se va a usar el formulario es 
donde se maneja la conexion  con signal r y demas
// este es un create game que debo hacerle pagina 




{/*import { useEffect, useState } from "react";
import { buildConnection } from "../../utils/connection";
import CreateGame from "../../components/game/on-line/create-game";

export default function CreateGamePage() {
  const [connection, setConnection] = useState<any>(null);

  useEffect(() => {
    const conn = buildConnection();
    setConnection(conn);
    conn.start().catch(err => console.error("Error al conectar:", err));
  }, []);

  const handleCreateGame = async (gameData: any) => {
    if (connection) {
      try {
        await connection.invoke("CrearPartida", gameData);
        console.log("Partida creada con SignalR:", gameData);
      } catch (error) {
        console.error("Error al crear partida:", error);
      }
    }
  };

  return <CreateGame onCreateGame={handleCreateGame} />;
}*/}