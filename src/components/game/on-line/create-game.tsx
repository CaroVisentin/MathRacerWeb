
import { useState } from "react";
import fondoPartida from '../../../assets/images/partidas.png';
import { useConnection } from '../../../services/signalR/connection';
import ErrorConnection from "../../../shared/modals/errorConnection";
import { Link } from "react-router-dom";

export default function CreateGame() {
 
  const [formData, setFormData] = useState({
    nombrePartida: '',
    privacidad: 'publico',
    contraseña: '',
    dificultad: 'Facil',
    tipodeResultado: 'El Mayor',
  });

   //const { invoke, errorConexion } = useConnection(); 
  const { errorConexion, invoke } = useConnection();
  const [showModal, setShowModal] = useState(false);
  // usar la conexión exportada
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombrePartida.trim()) return;

    try{

    // Enviar nombre de partida como identificador del jugador
    await invoke("FindMatch", formData.nombrePartida);
    console.log("Partida creada con nombre:", formData.nombrePartida);
    // onCreateGame(formData); // Llama a la función pasada por props con los datos del formulario y emitir con signal R
    } catch (error) {
      setShowModal(true);
    }
    }; 

  return (

    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-2"
      style={{ backgroundImage: `url(${fondoPartida})` }}
    >

      <form onSubmit={handleSubmit} 
      className="w-full max-w-2xl mx-auto bg-black/90 text-[#5df9f9] p-6 pb-2 rounded-lg shadow-lg ">
        <h2 className="text-5xl text-[#f95ec8] uppercase text-center mb-10 pb-5 drop-shadow-[0_0_10px_#00ffff] font-audiowide">Crear Partida</h2>

        <label className="block text-3xl font-normal ">
          Nombre de la Partida:
          <input
            type="text"
            name="nombrePartida"
            value={formData.nombrePartida}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded bg-black/90 border border-gray-600"
          />
        </label>
        <label className="block text-3xl font-normal">
          Privacidad:
          <select
            name="privacidad"
            value={formData.privacidad}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded bg-black/90 border border-gray-600"
          >
            <option value="publica">Pública</option>
            <option value="privada">Privada</option>
          </select>
        </label>
        {formData.privacidad === 'privada' && (
          <label className="block text-3xl">
            Contraseña:
            <input
              type="password"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-black/90 border border-gray-600"
            />
          </label>
        )}
        <label className="block text-3xl">
          Dificultad:
          <select
            name="dificultad"
            value={formData.dificultad}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded bg-black/90 border border-gray-600"
          >
            <option value="Facil">Fácil</option>
            <option value="Medio">Medio</option>
            <option value="Dificil">Difícil</option>
          </select>
        </label>
        <label className="block text-3xl">
          Tipo de Resultado:
          <select
            name="tipodeResultado"
            value={formData.tipodeResultado}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded bg-black/90 border border-gray-600"
          >
            <option value="El Mayor">El Mayor</option>
            <option value="El Menor">El Menor</option>
            <option value="Igual">Igual</option>
          </select>
        </label>
        <div className="flex justify-between mt-6 pt-5 border-t border-gray-700">
          <Link to="/multijugador"
            
            className="bg-[#5df9f9] text-black font-extralight hover:bg-red-700 w-30 h-10 px-4 content-center rounded text-2xl hover:drop-shadow-[0_0_10px_#00ffff]">← Volver</Link>
          <button
            type="submit"
            className="bg-[#5df9f9] text-black font-extralight hover:bg-[#f95ec8] w-30 h-10 px-4  rounded text-2xl leading-relaxed hover:drop-shadow-[0_0_10px_#00ffff]">Crear</button>

        </div>
      </form>
      {showModal && (
        <ErrorConnection
          message={errorConexion || "No se pudo conectar al servidor. Por favor, inténtalo de nuevo."}
          onClose={() => setShowModal(false)}
        />  
      )}
    </div>
  );
}

