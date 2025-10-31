import isologo from "/images/mathi_racer_logo.png";
import { ActionButton } from "../../shared/buttons/actionButton";
import { BatteryStatus } from "../../components/home/batteryStatus";
import { CoinsDisplay } from "../../components/home/coinsDisplay";
import { ProfileCard } from "../../components/home/profileCard";
import { InfoBox } from "../../components/home/infoBox";
import { CarDisplay } from "../../components/home/carDisplay";
//import { type HomeData } from "../../models/ui/home-data";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ErrorConnection from "../../shared/modals/errorConnection";
//import { homeDataMock } from "../../data/mocks/home";
//agrego

import { useHomeData } from "../../hooks/useHomeData";
//import { mapPlayerToHomeData } from "../../models/mappers/homePlayerMapper";

export const Home = () => {
 
   const navigate = useNavigate();
  const { logout } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  //agregru
 
  const {homeData} = useHomeData();

    const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch {
      setErrorMessage("no se pudo cerrar sesión");
      setShowErrorModal(true);
    }
  };

 

  const handleCloseModal = () => {
    setShowErrorModal(false);
  };

  if (!homeData) {
    return <div className="text-white h-screen flex items-center justify-center">Cargando...</div>;
  }

  return (
    <div className="relative h-screen w-screen flex flex-col">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${homeData.activeItems.background.imageUrl})` }}
      >
        <div className="absolute pointer-events-none inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col">
        <div className="absolute top-4 left-10">

          <img src={isologo} alt="Math Racer" className=" drop-shadow-[0_0_10px_#00ffff]" />
        </div>

        <div className="absolute top-4 right-4 flex flex-col items-end gap-3">
          <div className="flex items-start gap-5">
            <div className="flex flex-col gap-3">
              <BatteryStatus levels={homeData.battery.levels} time={homeData.battery.time} />
              <CoinsDisplay coins={homeData.user.coins} />
            </div>
            <ProfileCard imageUrl={homeData.activeItems.profile.imageUrl} />
          </div>
          <InfoBox>Nivel {homeData.user.level}</InfoBox>
          <InfoBox>{homeData.user.ranking}</InfoBox>
          <p className="font-audiowide text-[#5df9f9] drop-shadow-[0_0_10px_#00ffff] text-3xl mt-2">Hola, {homeData.user.name} 👋</p>
        </div>
        <ActionButton size="small" onClick={handleLogout}>
          <i className="ri-logout-box-r-line"></i> Cerrar sesión
        </ActionButton>

        <div className="flex flex-1 items-end justify-between px-4 pb-8">
          <div className="flex flex-col gap-3">
            <ActionButton to="/menu">Multijugador</ActionButton>
            <ActionButton to="/modo-historia" >Historia</ActionButton>
            <ActionButton className="pointer-events-none">Práctica Libre</ActionButton>
          </div>
          <div className="flex flex-col  gap-3 items-end">
            <ActionButton to="/ranking" size="small"><i className="ri-trophy-fill"></i></ActionButton>
            <ActionButton size="small" to="/garage"><i className="ri-store-2-fill"></i></ActionButton>
            <ActionButton size="small" to="/cart"><i className="ri-shopping-cart-fill"></i></ActionButton>
          </div>
        </div>

        <CarDisplay imageUrl={homeData.activeItems.car.imageUrl} />
      </div>

      {showErrorModal && (
        <ErrorConnection
          message={errorMessage}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

