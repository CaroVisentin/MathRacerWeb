import isologo from "/images/mathi_racer_logo.png";

import { ActionButton } from "../../shared/buttons/actionButton";
import { BatteryStatus } from "../../components/home/batteryStatus";
import { CoinsDisplay } from "../../components/home/coinsDisplay";
import { ProfileCard } from "../../components/home/profileCard";
import { InfoBox } from "../../components/home/infoBox";
import { CarDisplay } from "../../components/home/carDisplay";
import { useState } from "react";
import { homeDataMock } from "../../data/mocks/home";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ErrorConnection from "../../shared/modals/errorConnection";
import { usePlayer } from "../../contexts/playerContext";

export const Home = () => {

  const navigate = useNavigate();
  const { logout } = useAuth();
  const { profile, loading: profileLoading } = usePlayer();

  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      setErrorMessage("No se pudo cerrar sesión");
      setShowErrorModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowErrorModal(false);
  };

  if (profileLoading) {
    return (
      <div className="text-black h-screen flex items-center justify-center">
        Cargando perfil...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-black h-screen flex items-center justify-center">
        No se pudo cargar el perfil
      </div>
    );
  }

  const data = {
  user: {
    id: profile.id,
    name: profile.name,
    coins: profile.coins,
    level: profile.lastLevelId,
    ranking: profile.points,
  },
  activeItems: {
    car: {
      ...homeDataMock.activeItems.car,
      imageUrl:  homeDataMock.activeItems.car.imageUrl,
    },
    background: {
      ...homeDataMock.activeItems.background,
      imageUrl: homeDataMock.activeItems.background.imageUrl,
    },
    profile: {
      ...homeDataMock.activeItems.profile,
      imageUrl: homeDataMock.activeItems.profile.imageUrl,
    },
  },
  battery: homeDataMock.battery,
};

  return (
    <div className="relative h-screen w-screen flex flex-col">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${data.activeItems.background.imageUrl})` }}
      >
        <div className="absolute pointer-events-none inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col">
        <div className="absolute top-4 left-10">
          <img
            src={isologo}
            alt="Math Racer"
            className="drop-shadow-[0_0_10px_#00ffff]"
          />
        </div>

        <div className="absolute top-4 right-4 flex flex-col items-end gap-3">
          <div className="flex items-start gap-5">
            <div className="flex flex-col gap-3">
              <BatteryStatus levels={data.battery.levels} time={data.battery.time} />
              <CoinsDisplay coins={data.user.coins} />
            </div>
            <Link to="/perfil">
              <ProfileCard imageUrl={data.activeItems.profile.imageUrl} />
            </Link>
          </div>
          <InfoBox>Nivel {data.user.level}</InfoBox>
          <InfoBox>{data.user.ranking}</InfoBox>
        </div>

        <ActionButton size="small" onClick={handleLogout}>
          <i className="ri-logout-box-r-line"></i> Cerrar sesión
        </ActionButton>

        <div className="flex flex-1 items-end justify-between px-4 pb-8">
          <div className="flex flex-col gap-3">
            <ActionButton to="/menu">Multijugador</ActionButton>
            <ActionButton to="/story-mode">Historia</ActionButton>
            <ActionButton className="pointer-events-none">
              Práctica Libre
            </ActionButton>
          </div>

          <div className="flex flex-col pointer-events-none gap-3 items-end">
            <ActionButton size="small">
              <i className="ri-trophy-fill"></i>
            </ActionButton>
            <ActionButton size="small">
              <i className="ri-store-2-fill"></i>
            </ActionButton>
            <ActionButton size="small">
              <i className="ri-shopping-cart-fill"></i>
            </ActionButton>
          </div>
        </div>

        <CarDisplay imageUrl={data.activeItems.car.imageUrl} />
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
