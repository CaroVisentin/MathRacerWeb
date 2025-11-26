import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BatteryStatus } from "../home/batteryStatus";
import { usePlayer } from "../../hooks/usePlayer";
import { resolveImageUrl } from "../../shared/utils/imageResolver";
import coinImg from "../../assets/images/coin.png";

const ISOLOGO_SRC = "/images/mathi_racer_logo.png";

export const AppHeader = () => {
  const navigate = useNavigate();
  const { player } = usePlayer();
  const coins = player?.coins ?? 0;

  const profileImage = useMemo(
    () => resolveImageUrl("character", player?.equippedCharacter?.id ?? player?.character?.id),
    [player?.character?.id, player?.equippedCharacter?.id]
  );

  return (
    <header className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between bg-transparent">

      {/* LOGO */}
      <button
        type="button"
        onClick={() => navigate("/home")}
        className="flex items-center gap-2 sm:gap-3 cursor-pointer text-white drop-shadow-[0_0_12px_rgba(0,255,255,0.7)]"
      >
        <img src={ISOLOGO_SRC} alt="MathRacer" className="h-10 w-auto sm:h-14" />
      </button>

      {/* PANEL DERECHO */}
      <div className="flex items-center gap-3 sm:gap-6">

        {/* Monedas */}
        <div className="flex flex-col items-end text-white">
          <div className="flex items-center gap-1 sm:gap-2 text-lg sm:text-2xl md:text-3xl font-bold">
            <img src={coinImg} alt="Monedas" className="w-5 h-5 sm:w-7 sm:h-7" />
            <span>{coins.toLocaleString()}</span>
          </div>
        </div>

        {/* BatteryStatus visible en todas las pantallas, pero compacto */}
        <div className="hidden sm:flex">
          <BatteryStatus variant="compact" />
        </div>

        <div className="flex sm:hidden">
          <BatteryStatus variant="compact" className="scale-90" />
        </div>

        {/* Perfil */}
        <button
          type="button"
          onClick={() => navigate("/perfil")}
          className="h-12 w-12 sm:h-16 sm:w-16 rounded-full border-2 sm:border-4 border-[#f95ec8] overflow-hidden shadow-[0_0_15px_rgba(249,94,200,0.7)] hover:scale-105 transition"
        >
          <img src={profileImage} alt={player?.name ?? "Perfil"} className="w-full h-full object-cover" />
        </button>
      </div>
    </header>
  );
};
