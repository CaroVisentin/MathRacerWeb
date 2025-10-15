
import { Link } from "react-router-dom";

export const Menu = () => {

  
  const botonVolver = "bg-red-600 text-black text-sm  py-2 px-4 rounded-[6px] hover:bg-red-700 transition duration-300";


  return (

    <div
      className="h-screen w-screen multijugadorContenedor fondo-multijugador"    >
      <h1 className=" titulo text-pink-400 text-5xl  flex justify-center tracking-wide  mb-8 drop-shadow-lg">Multijugador</h1>
      <div className="contenedorMenu">


        <Link to="/crear" className="botonGral">Crear Partida</Link>
        <Link to="/unirse-partida" className="botonGral">Unirse a Partida</Link>
        <Link to="/partida-rapida" className="botonGral">Partida Rápida</Link>
        <Link to="/invitar-amigo" className="botonGral">Invitar a un Amigo</Link>
        <Link to="/ranking" className="botonGral">Ranking</Link>
        <Link to="/multijugador" className="botonGral">Demo</Link>

      </div>

      <Link to="/" className={botonVolver}>Volver al Menú</Link>

    </div>


  )
};

export default Menu;