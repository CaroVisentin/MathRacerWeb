import isologo from "/images/mathi_racer_logo.png";
import auto from "../../assets/images/auto.png";
import { ActionButton } from "../../shared/buttons/actionButton";
import { BatteryStatus } from "../../components/home/batteryStatus";
import { CoinsDisplay } from "../../components/home/coinsDisplay";
import { ProfileCard } from "../../components/home/profileCard";
//import { InfoBox } from "../../components/home/infoBox";
import { CarDisplay } from "../../components/home/carDisplay";
import fondoHome from "../../assets/images/fondocity.png";
//import { Link,useNavigate  } from "react-router-dom";
//import ErrorConnection from "../../shared/modals/errorConnection";
import { Link } from "react-router-dom";
import { useHomeData } from "../../hooks/useHomeData";
//import { useAuth } from "../../hooks/useAuth";
import mathi from "../../assets/images/mathisentado.png";


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
        <div className="absolute top-4 right-4 flex flex-col items-end gap-3">
          <div className="flex items-start gap-5">
            <div className="flex flex-col gap-3">
              <BatteryStatus />
              <CoinsDisplay coins={homeData.user.coins} />
            </div>
            <Link to="/perfil" className="drop-shadow-[0_0_10px_#00ffff] pulse-heartbeat hover:agrandar" >
              <ProfileCard imageUrl={homeData.activeItems.profile.imageUrl}  />
            </Link>
          </div>
          {/* <InfoBox>Nivel {homeData.user.level}</InfoBox>
          <InfoBox>{homeData.user.ranking}</InfoBox> */}
          <p className="text-[#5df9f9] drop-shadow-[0_0_10px_#00ffff] text-3xl mt-2">Hola, {homeData.user.name} 👋</p>
        </div>
        <img src={mathi} alt="Mathi" className="absolute top-80 left-190 w-40 h-40 z-10 drop-shadow-[0_0_10px_#00ffff] " />

        {/* Esquina inferior izquierda - Modos de juego */}
        <div className="flex flex-1 items-end justify-between px-4 pb-8">
          <div className="flex flex-col gap-3">
            <ActionButton to="/menu">Multijugador</ActionButton>
            <ActionButton to="/modo-historia">Historia</ActionButton>
            <ActionButton className="pointer-events-none">
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
