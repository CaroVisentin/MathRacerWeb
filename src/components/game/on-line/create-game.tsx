
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePlayer } from "../../../hooks/usePlayer";
import { createCustomGame } from "../../../services/game/multiplayer-mode/onlineService";
import ErrorConnection from "../../../shared/modals/errorConnection";
import type { CreateCustomGameRequestDto } from "../../../models/domain/signalR/createCustomGameDto";
import { useAudio } from "../../../contexts/AudioContext";

export default function CreateGame() {
  const { player } = usePlayer();
  const navigate = useNavigate();
  const { playBackSound } = useAudio();

  const [formData, setFormData] = useState({
    nombrePartida: '',
    privacidad: 'publica',
    contraseña: '',
    dificultad: 'FACIL' as "FACIL" | "MEDIO" | "DIFICIL",
    tipodeResultado: 'MAYOR' as "MAYOR" | "MENOR",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombrePartida.trim()) {
      setError("El nombre de la partida es requerido");
      setShowModal(true);
      return;
    }

    if (!player?.id) {
      setError("Debes iniciar sesión para crear una partida");
      setShowModal(true);
      return;
    }

    // Validar contraseña si es privada
    if (formData.privacidad === 'privada' && !formData.contraseña.trim()) {
      setError("Debes establecer una contraseña para partidas privadas");
      setShowModal(true);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const request: CreateCustomGameRequestDto = {
        gameName: formData.nombrePartida,
        isPrivate: formData.privacidad === 'privada',
        //password: (formData.privacidad === 'privada' && formData.contraseña ? formData.contraseña : undefined),
        ... (formData.privacidad === 'privada' && formData.contraseña ? { password: formData.contraseña } : {}),
        difficulty: formData.dificultad,
        expectedResult: formData.tipodeResultado,

      };
      const response = await createCustomGame(request);

      // va a multijugador 
      // si es privada pasa contraseña
      navigate(`/multijugador/${response.gameId}`, {
        state: {
          gameId: response.gameId,
          password: formData.privacidad === 'privada' ? formData.contraseña : undefined
        }
      });

    } catch (err) {
      console.error("Error al crear partida:", err);
      const error = err as { response?: { data?: { error?: string } } };
      setError(error.response?.data?.error || "No se pudo crear la partida. Inténtalo de nuevo.");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (


    <div className="h-screen w-screen fondo-city flex  items-center justify-center p-4 overflow-hidden">


      <form onSubmit={handleSubmit}
        className="w-full max-w-2xl mx-auto bg-black/60 text-[#5df9f9] p-6 rounded-lg shadow-lg ">
        <h2 className="text-6xl text-[#5df9f9] text-center mb-10 pb-5 drop-shadow-[0_0_10px_#00ffff]">Crear Partida</h2>

        <label className="block text-3xl font-normal ">
          Nombre de la Partida:
          <input
            type="text"
            name="nombrePartida"
            value={formData.nombrePartida}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded bg-black/60 border border-gray-600"
          />
        </label>
        <label className="block text-3xl font-normal">
          Privacidad:
          <select
            name="privacidad"
            value={formData.privacidad}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded bg-black/60 border border-gray-600"
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
              className="w-full mt-1 p-2 rounded bg-black/60 border border-gray-600"
            />
          </label>
        )}
        <label className="block text-3xl">
          Dificultad:
          <select
            name="dificultad"
            value={formData.dificultad}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded bg-black/60 border border-gray-600"
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
            className="w-full mt-1 p-2 rounded bg-black/60 border border-gray-600"
          >
            <option value="Mayor">Mayor</option>
            <option value="Menor">Menor</option>

          </select>
        </label>
        <div className="flex justify-between mt-6 pt-5 border-t border-gray-700">
          <Link to="/menu"
            onClick={playBackSound}
            className="text-black hover:bg-red-700 bg-[#00f0ff] text-2xl border-2 border-white px-3 py-1
                tracking-wider transition-all duration-300 
                 hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.3)] 
                 hover:shadow-[0_0_20px_rgba(0,217,255,0.6)]
                 disabled:opacity-50">
            <i className="ri-arrow-left-line mr-2"></i> Volver
          </Link>
          <button
            type="submit"
            disabled={loading}
            className={`bg-[#00f0ff] text-black text-2xl border-2 border-white px-3 py-1
                tracking-wider transition-all duration-300 
                 hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.3)] 
                 hover:shadow-[0_0_20px_rgba(0,217,255,0.6)]
                 disabled:opacity-50 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#f95ec8]'
              }`}
          >
            {loading ? 'Creando...' : 'Crear'}
          </button>
        </div>
      </form>
      {showModal && (
        <ErrorConnection
          message={error || "No se pudo crear la partida. Por favor, inténtalo de nuevo."}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

