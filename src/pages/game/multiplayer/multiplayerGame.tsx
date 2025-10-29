
import { Link } from "react-router-dom";


export const Menu = () => {
  const botonVolver = " text-black text-xl bg-cyan-400 py-2 px-4 rounded-[6px] hover:bg-red-700 transition duration-300 mx-auto block mt-10 hover:drop-shadow-[0_0_10px_#00ffff]";
  return (

    <div
      className="h-screen w-screen multijugadorContenedor fondo-multijugador"    >
      <h1 className=" titulo text-pink-400 text-5xl  flex justify-center uppercase tracking-wide  mb-8 drop-shadow-[0_0_10px_#00ffff]">Multijugador</h1>
      <div className="contenedorMenu bg-white/10 rounded-lg p-8 flex flex-col items-center">


        <Link to="/crear" className="botonGral
          uppercase tracking-wider 
        transition-all duration-300 ease-out
      hover:drop-shadow-[0_0_10px_#00ffff]
         " style={{gridArea:"crear"}}>Crear Partida</Link>
       
        <Link to="/unirse-partida" className="botonGral uppercase hover:drop-shadow-[0_0_10px_#00ffff]" style={{gridArea: "unirse"}}>Unirse a Partida</Link>
        <Link to="/invitar-amigo" className="botonGral uppercase hover:drop-shadow-[0_0_10px_#00ffff]" style={{gridArea:"invitar"}}>Invitar a un Amigo</Link>
        <Link to="/ranking" className="botonGral uppercase hover:drop-shadow-[0_0_10px_#00ffff]" style={{gridArea:"ranking"}}>Ranking</Link>
        <Link to="/partida-rapida" className="botonGral uppercase hover:drop-shadow-[0_0_10px_#00ffff]" style={{gridArea:"competitiva",
          width:"50%",
          justifySelf:"center",
        }}>Partida Competitiva</Link>
      </div>
      <div className="arreglo">


      <Link to="/" className={botonVolver}>Volver al Menú</Link>
</div>
    </div>


  )
};

export default Menu;