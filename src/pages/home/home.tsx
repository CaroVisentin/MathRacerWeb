import { useEffect } from "react";
import isologo from "/images/mathi_racer_logo.png";
import auto from "../../assets/images/auto.png";
import { ActionButton } from "../../shared/buttons/actionButton";
import { CarDisplay } from "../../components/home/carDisplay";
import fondoHome from "../../assets/images/fondocity.png";
import { useHomeData } from "../../hooks/useHomeData";
import { PlayerStatusPanel } from "../../components/home/playerStatusPanel";
import { useEnergy } from "../../hooks/useEnergy";

export const Home = () => {
  const { homeData } = useHomeData();
  const { refreshEnergy } = useEnergy();

  useEffect(() => {
    refreshEnergy();
  }, [refreshEnergy]);

  if (!homeData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      {/* Fondo del Home */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${fondoHome})` }}
      >
        <div className="absolute pointer-events-none inset-0 bg-black/60"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Logo */}
        <div className="absolute top-4 left-4">
          <img
            src={isologo}
            alt="Mathi Racer"
            className="h-16 md:h-20 lg:h-24 drop-shadow-[0_0_10px_#00ffff]"
          />
        </div>

        {/* Panel Superior Derecha */}
        <div className="relative flex justify-end px-4 sm:px-6 lg:px-10 pt-16 sm:pt-8">
          <PlayerStatusPanel
            coins={homeData.user.coins}
            level={homeData.user.level}
            ranking={homeData.user.ranking}
            backgroundImageUrl={homeData.activeItems.background.imageUrl}
            profileImageUrl={homeData.activeItems.profile.imageUrl}
          />
        </div>

        {/* Botones inferiores */}
        <div className="flex flex-1 items-end justify-between px-4 sm:px-6 lg:px-10 pb-6 sm:pb-10">
          {/* Modos de Juego Izquierda */}
          <div className="flex flex-col gap-3 max-w-[200px] sm:max-w-none">
            <ActionButton to="/menu" title="Multijugador">Multijugador</ActionButton>
            <ActionButton to="/modo-historia" title="Modo Historia">Modo Historia</ActionButton>
            <ActionButton to="/modo-infinito" title="Modo Infinito">Modo Infinito</ActionButton>
          </div>

          {/* Icon buttons derecha */}
          <div className="flex flex-col gap-3 items-end">
            <ActionButton to="/ranking" size="small" title="Ranking">
              <i className="ri-trophy-fill"></i>
            </ActionButton>
            <ActionButton to="/garage" size="small" title="Garage">
              <i className="ri-store-2-fill"></i>
            </ActionButton>
            <ActionButton to="/tienda" size="small" title="Tienda">
              <i className="ri-shopping-cart-fill"></i>
            </ActionButton>
          </div>
        </div>

        {/* Auto al centro */}
        <CarDisplay imageUrl={auto} />
      </div>
    </div>
  );
};


