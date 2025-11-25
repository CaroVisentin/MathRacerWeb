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

  const handleLogoClick = () => navigate("/home");
  const handleProfileClick = () => navigate("/perfil");

  return (
    <header className="w-full px-6 py-4 flex items-center justify-between bg-transparent">
      <button
        type="button"
        onClick={handleLogoClick}
        className="flex cursor-pointer items-center gap-3 text-white font-semibold tracking-wide drop-shadow-[0_0_12px_rgba(0,255,255,0.7)]"
      >
        <img src={ISOLOGO_SRC} alt="MathRacer" className="h-14 w-auto" />
      </button>

      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end text-white">
          <div className="flex items-center gap-2 text-3xl font-bold">
            <img src={coinImg} alt="Monedas" className="w-8 h-8" />
            <span>{coins.toLocaleString()}</span>
          </div>
        </div>

        <div className="hidden lg:flex flex-col items-end">
          <BatteryStatus variant="compact" />
        </div>

        <button
          type="button"
          onClick={handleProfileClick}
          className="h-16 w-16 rounded-full border-4 border-[#f95ec8] overflow-hidden shadow-[0_0_15px_rgba(249,94,200,0.7)] hover:scale-105 transition cursor-pointer"
        >
          <img src={profileImage} alt={player?.name ?? "Perfil"} className="w-full h-full object-cover" />
        </button>
      </div>
    </header>
  );
};
