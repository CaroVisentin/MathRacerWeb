import isologo from "/images/isologotipo.png";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { type HomeData, homeDataMock, currencyIcon, batteryIcons } from "../../models/ui/home-data";


export const Home = () => {
  const [data, setData] = useState<HomeData | null>(null);

  useEffect(() => {
    // simulo llamada a la api
    setTimeout(() => {
      setData(homeDataMock);
    }, 500);
  }, []);

  if (!data) {
    return <div className="text-white h-screen flex items-center justify-center">Cargando...</div>;
  }

  return (
    <div
      className="relative h-screen w-screen flex flex-col"
      style={{
        backgroundImage: `url(${data.activeItems.background.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Logo */}
      <div className="absolute top-4 left-4">
        <img src={isologo} alt="Math Racer" className="w-100" />
      </div>

      {/* Panel superior derecho */}
      <div className="absolute top-4 right-4 flex flex-col items-end gap-3">
        <div className="flex items-start gap-5">
          <div className="flex flex-col gap-3">
            {/* Batería */}
            <div className="flex flex-col items-end justify-left">
              <div className="flex items-end gap-3">
                <div className="flex flex-col justify-space-between align-space-between">
                  <img src={batteryIcons.pilabolt} alt="pila-bolt" className="h-4" />
                  <span className="text-base font-semibold h-4 text-white">{data.battery.time}</span>
                </div>
                <div className="flex items-end gap-1">
                  {data.battery.levels.map((lvl, i) => (
                    <img
                      key={i}
                      src={lvl === "full" ? batteryIcons.pila : batteryIcons.pilaempty}
                      alt={lvl}
                      className="w-4 h-8"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Monedas */}
            <div className="flex flex-row gap-2 items-center justify-left">
              <img src={currencyIcon} alt="monedas" className="w-6 h-6" />
              <span className="text-white font-bold text-3xl">
                {data.user.coins}
              </span>
            </div>
          </div>

          {/* Perfil */}
          <div className="w-16 h-16 bg-white rounded-full overflow-hidden border-4 border-[#f95ec8] shadow-lg">
            <img src={data.activeItems.profile.imageUrl} alt="perfil" className="w-full h-full object-scale-down" />
          </div>
        </div>

        {/* Caja nivel */}
        <div className="w-48 h-10 text-2xl bg-white/70 rounded-xl shadow flex items-center justify-center text-black font-bold">
          Nivel {data.user.level}
        </div>

        {/* Caja ranking */}
        <div className="w-48 h-10 text-2xl bg-white/70 rounded-xl shadow flex items-center justify-center text-black font-bold">
          {data.user.ranking.toLocaleString("es-AR")}
        </div>
      </div>

      {/* contenedor para los botones */}
      <div className="flex flex-1 items-end justify-between px-4 pb-8">
        {/* botones izquierdos */}
        <div className="flex flex-col gap-3">
          <Link to="/menu">
            <button className="w-56 h-16 text-[#0f0f0f] text-3xl rounded-2xl shadow bg-[#5df9f9] hover:bg-[#f95ec8] transition-colors">
              Menú
            </button>
          </Link>
          <Link to="/modo-historia">
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
        <img src={data.activeItems.car.imageUrl} alt="Auto" className="w-100 drop-shadow-lg translate-y-16" />
      </div>
    </div>
  );
};
