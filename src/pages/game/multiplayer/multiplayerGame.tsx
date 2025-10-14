
import { Link } from "react-router-dom";

export const Menu = () => {

  const botongral = "bg-black text-[#5DF9F9] border-2 border-[#5DF9F9] text-lg py-1 px-6 rounded-[6px] shadow-md transition duration-300 hover:bg-[#F95EC8] scale-105";
  const botonVolver = "bg-red-600 text-black text-sm  py-2 px-4 rounded-[6px] hover:bg-red-700 transition duration-300";


  return (

    <div
      className="h-screen w-screen multijugadorContenedor fondo-multijugador"    >
      <h1 className=" titulo text-pink-400 text-5xl  flex justify-center tracking-wide  mb-8 drop-shadow-lg">Multijugador</h1>
      <div className="contenedorMenu">


        <Link to="/crear" className={botongral}>Crear Partida</Link>
        <Link to="/unirse-partida" className={botongral}>Unirse a Partida</Link>
        <Link to="/partida-rapida" className={botongral}>Partida Rápida</Link>
        <Link to="/invitar-amigo" className={botongral}>Invitar a un Amigo</Link>
        <Link to="/ranking" className={botongral}>Ranking</Link>
        <Link to="/multijugador" className={botongral}>Multijugador</Link>

      </div>

      <Link to="/" className={botonVolver}>Volver al Menú</Link>

    </div>


  )
};

export default Menu;