import isologo from "/images/isologotipo.png";
import auto from "../../assets/images/auto.png";
import fondo from "../../assets/images/garage-bg.png";

import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div
      className="relative h-screen w-screen flex flex-col "
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}
    >
      {/* Logo Math Racer */}
      <div className="absolute top-4 left-4">
        <img src={isologo} alt="Math Racer" className="w-100" />
      </div>

      {/* contenedor para los botones */}
      <div className="flex flex-1 items-end justify-between px-4 pb-8">
        {/* botones izquierdos */}
        <div className="flex flex-col gap-3">
          <Link to="/multijugador">
            <button className="w-56 h-16 text-[#0f0f0f] text-3xl rounded-2xl shadow bg-[#5df9f9] hover:bg-[#f95ec8] transition-colors">
              Multijugador
            </button>
          </Link>

          <Link to="/historia">
            <button className="w-56 h-16 text-[#0f0f0f] text-3xl rounded-2xl shadow bg-[#5df9f9] hover:bg-[#f95ec8] transition-colors">
              Historia
            </button>
          </Link>

          <Link to="/practica">
            <button className="w-56 h-16 text-[#0f0f0f] text-3xl rounded-2xl shadow bg-[#5df9f9] hover:bg-[#f95ec8] transition-colors">
              Práctica Libre
            </button>
          </Link>
        </div>

        {/* botones derechos */}
        <div className="flex flex-col gap-3 items-end">
          <Link to="/ranking">
            <button className="w-16 h-16 flex items-center justify-center bg-[#5df9f9] text-[#0f0f0f] rounded-xl shadow hover:bg-[#f95ec8] transition-colors">
              <i className="ri-trophy-fill text-2xl"></i>
            </button>
          </Link>

          <Link to="/garage">
            <button className="w-16 h-16 flex items-center justify-center bg-[#5df9f9] text-[#0f0f0f] rounded-xl shadow hover:bg-[#f95ec8] transition-colors">
              <i className="ri-store-2-fill text-2xl"></i>
            </button>
          </Link>

          <Link to="/shop">
            <button className="w-16 h-16 flex items-center justify-center bg-[#5df9f9] text-[#0f0f0f] rounded-xl shadow hover:bg-[#f95ec8] transition-colors">
              <i className="ri-shopping-cart-fill text-2xl"></i>
            </button>
          </Link>
        </div>
      </div>

      {/* img auto */}
      <div className="absolute   inset-0 flex items-center justify-center pointer-events-none">
        <img src={auto} alt="Auto" className="w-100 drop-shadow-lg translate-y-16" />
      </div>
    </div>
  );
}