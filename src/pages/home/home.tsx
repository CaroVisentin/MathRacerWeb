import isologo from "/images/isologotipo.png";

import { ActionButton } from "../../shared/buttons/actionButton";
import { BatteryStatus } from "../../components/home/batteryStatus";
import { CoinsDisplay } from "../../components/home/coinsDisplay";
import { ProfileCard } from "../../components/home/profileCard";
import { InfoBox } from "../../components/home/infoBox";
import { CarDisplay } from "../../components/home/carDisplay";
import { type HomeData, homeDataMock,} from "../../models/ui/home-data"; 
import { useEffect, useState } from "react";

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
      <div className="absolute top-4 left-4">
        <img src={isologo} alt="Math Racer" className="w-100" />
      </div>

      <div className="absolute top-4 right-4 flex flex-col items-end gap-3">
        <div className="flex items-start gap-5">
          <div className="flex flex-col gap-3">
            <BatteryStatus levels={data.battery.levels} time={data.battery.time} />
            <CoinsDisplay coins={data.user.coins} />
          </div>
          <ProfileCard imageUrl={data.activeItems.profile.imageUrl} />
        </div>
        <InfoBox>Nivel {data.user.level}</InfoBox>
        <InfoBox>{data.user.ranking}</InfoBox>
      </div>

      <div className="flex flex-1 items-end justify-between px-4 pb-8">
        <div className="flex flex-col gap-3">
          <ActionButton to="/menu">Multijugador</ActionButton>
          {/* <ActionButton to="/modo-historia">Historia</ActionButton> */}
          <ActionButton>Historia</ActionButton>
          <ActionButton to="/practica">Práctica Libre</ActionButton>
        </div>
        <div className="flex flex-col gap-3 items-end">
          <ActionButton to="/ranking" size="small"><i className="ri-trophy-fill"></i></ActionButton>
          <ActionButton to="/garage" size="small"><i className="ri-store-2-fill"></i></ActionButton>
          <ActionButton to="/shop" size="small"><i className="ri-shopping-cart-fill"></i></ActionButton>
        </div>
      </div>

      <CarDisplay imageUrl={data.activeItems.car.imageUrl} />
    </div>
  );
};
