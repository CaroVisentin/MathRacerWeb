
import { Link } from "react-router-dom";

export const Multiplayer = () => {

   const botongral ="bg-black text-[#FF00FF] border-2 border-[#FF00FF] text-lg py-1 px-6 rounded-[6px] shadow-md transition duration-300 hover:scale-105";
     const botonVolver = "bg-red-600 text-black text-sm  py-2 px-4 rounded-[6px] hover:bg-red-700 transition duration-300";


   return (

         <div
         className="relative h-screen w-screen  fondo-multijugador"    >
              <h1 className="text-pink-400 text-5xl  flex justify-center tracking-wide  mb-8 drop-shadow-lg">Multijugador</h1>
            <div className="absolute inset-0  flex flex-col items-center justify-center space-y-6">
             
      
       
        <div className="grid grid-cols-2 gap-6">
      <Link to="/crear" className={botongral}>Crear Partida</Link>
      <Link to="/unirse-partida" className={botongral}>Unirse a Partida</Link>
      <Link to="/partida-rapida" className={botongral}>Partida Rápida</Link>
      <Link to="/invitar-amigo" className={botongral}>Invitar a un Amigo</Link>
     </div>

      <Link to="/ranking" className={botongral}>Ranking</Link>
      <Link to="/" className={botonVolver}>Volver al Menú</Link>
      
      </div>
      </div>

   
   )
};

export default Multiplayer;