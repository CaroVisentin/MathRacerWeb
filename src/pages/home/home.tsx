import isologo from "/images/isologotipo.png";
import auto from "../../assets/images/auto.png";
import fondo from "../../assets/images/garage-bg.png";
import perfil from "../../assets/images/jugador.png";
import pila from "../../assets/images/pila-full.png";
import pilaempty from "../../assets/images/pila-empty.png";
import pilabolt from "../../assets/images/pila-bolt.png";
import moneda from "../../assets/images/coin.png";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div
      className="relative h-screen w-screen flex flex-col"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Logo Math Racer */}
      <div className="absolute top-4 left-4">
        <img src={isologo} alt="Math Racer" className="w-100" />
      </div>

      {/* PANEL SUPERIOR DERECHO */}
      <div className="absolute top-4 right-4 flex flex-col items-end gap-3">
        <div className="flex items-start gap-5">
          <div className="flex flex-col gap-3">
            {/* Contador batería */}
            <div className="flex flex-col items-end justify-left">
              <div className="flex items-end gap-3">
                {/* contador */}
                <div className="flex flex-col justify-space-between align-space-between">
                  <img src={pilabolt} alt="pila-bolt" className="h-4" />
                  <span className="text-base font-semibold h-4 text-white">02:35</span>
                </div>

                {/* pilas */}
                <div className="flex items-end gap-1">
                  <img src={pila} alt="pila" className="w-4 h-8" />
                  <img src={pila} alt="pila" className="w-4 h-8" />
                  <img src={pilaempty} alt="pila vacía" className="w-4 h-8" />
                </div>
              </div>
            </div>


            {/* Contador monedas */}
            <div className="flex flex-row gap-2 items-end justify-left">
              <img src={moneda} alt="monedas" className="w-6 h-6 mb-1" />
              <span className="text-white font-bold text-3xl">120.000 </span>
            </div>
          </div>

          {/* Foto perfil */}
          <div className="w-16 h-16 bg-white rounded-full overflow-hidden border-4 border-[#f95ec8] shadow-lg">
            <img src={perfil} alt="perfil" className="w-full h-full object-scale-down" />
          </div>
        </div>

        {/* Caja nivel */}
        <div className="w-48 h-10 text-2xl bg-white/70 rounded-xl shadow flex items-center justify-center text-black font-bold">
          Nivel 5
        </div>

        {/* Caja ranking */}
        <div className="w-48 h-10 text-2xl bg-white/70 rounded-xl shadow flex items-center justify-center text-black font-bold">
          12.234
        </div>
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
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img src={auto} alt="Auto" className="w-100 drop-shadow-lg translate-y-16" />
      </div>
    </div>
  );
}