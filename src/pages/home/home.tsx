import isologo from "/images/mathi_racer_logo.png";
import auto from "../../assets/images/auto.png";
import { ActionButton } from "../../shared/buttons/actionButton";
import { CarDisplay } from "../../components/home/carDisplay";
import fondoHome from "../../assets/images/fondocity.png";
import { useHomeData } from "../../hooks/useHomeData";
import { PlayerStatusPanel } from "../../components/home/playerStatusPanel";


export const Home = () => {
  const { homeData } = useHomeData();

  if (!homeData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400" />
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen flex flex-col">
      {/* Fondo del Home */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${fondoHome})` }}
      >
        <div className="absolute pointer-events-none inset-0 bg-black/60"></div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Isologo */}
        <div className="absolute top-4 left-10">
          <img
            src={isologo}
            alt="Math Racer"
            className=" drop-shadow-[0_0_10px_#00ffff]"
          />
        </div>

        {/* Esquina superior derecha - Monedas, Perfil, Nivel y Ranking */}
       <div className={`relative flex flex-col items-end gap-3`}>
        <div className={`pt-8 pr-6`}>

        <PlayerStatusPanel
          coins={homeData.user.coins}
          level={homeData.user.level}
          ranking={homeData.user.ranking}
          backgroundImageUrl={homeData.activeItems.background.imageUrl}
          profileImageUrl={homeData.activeItems.profile.imageUrl}
        />

        </div>
        </div>


        {/* Esquina inferior izquierda - Modos de juego */}
        <div className="flex flex-1 items-end justify-between px-4 pb-8">
          <div className="flex flex-col gap-3">
            <ActionButton to="/menu">Multijugador</ActionButton>
            <ActionButton to="/modo-historia">Historia</ActionButton>
            <ActionButton to="/modo-infinito">
              Práctica Libre
            </ActionButton>
          </div>

          {/* Esquina inferior derecha - Navegación a otras páginas */}
          <div className="flex flex-col gap-3 items-end">
            {/* <ActionButton size="small" onClick={handleLogout}>
                  <i className="ri-logout-box-r-line"></i>               
                </ActionButton> */}
            <ActionButton to="/ranking" size="small">
              <i className="ri-trophy-fill"></i>
            </ActionButton>
            <ActionButton to="/garage" size="small">
              <i className="ri-store-2-fill"></i>
            </ActionButton>
            <ActionButton to="/store" size="small">
              <i className="ri-shopping-cart-fill"></i>
            </ActionButton>
          </div>
        </div>

        <CarDisplay imageUrl={auto} />
      </div>
    </div>
  );
};
