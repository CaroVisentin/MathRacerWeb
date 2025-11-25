import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { BackButton } from "../../../shared/buttons/backButton";
import { LivesAndTimer } from "./livesAndTimer";

interface TopBarProps {
  headerText: string;
  remainingLives: number;
}

export const TopBar = ({ headerText }: TopBarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleBack = () => {
    if (matchPath("/modo-historia/mundo/:id", pathname)) {
      navigate("/modo-historia");
    } else if (matchPath("/modo-historia", pathname)) {
      navigate("/home");
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="relative z-20 flex shrink-0 items-center justify-between px-6 py-6">
      {/* Botón de volver */}
      <BackButton onClick={handleBack} />

      {/* Título del mundo centrado */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          {/* Fondo difuminado */}
          <div className="absolute inset-0 bg-cyan-400 blur-md opacity-50" />

          {/* Contenedor principal del cartel */}
          <div className="relative bg-[#1a0a2e] border-4 border-cyan-400 px-8 py-3 pixel-corners">
            <h1 className="text-2xl font-bold text-cyan-400 tracking-wider">
              {headerText}
            </h1>
          </div>
        </div>
      </div>

    </div>
  );
};
