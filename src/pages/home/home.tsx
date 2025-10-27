import isologo from "/images/mathi_racer_logo.png";

import { ActionButton } from "../../shared/buttons/actionButton";
import { BatteryStatus } from "../../components/home/batteryStatus";
import { CoinsDisplay } from "../../components/home/coinsDisplay";
import { ProfileCard } from "../../components/home/profileCard";
import { InfoBox } from "../../components/home/infoBox";
import { CarDisplay } from "../../components/home/carDisplay";
import { type HomeData } from "../../models/ui/home-data";
import { useEffect, useState } from "react";
import { homeDataMock } from "../../data/mocks/home";

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
    <div className="relative h-screen w-screen flex flex-col">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${data.activeItems.background.imageUrl})` }}
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
            <ActionButton to="/multijugador">Multijugador</ActionButton>
            <ActionButton className="pointer-events-none" >Historia</ActionButton>
            <ActionButton className="pointer-events-none">Práctica Libre</ActionButton>
            {/*/sacar pointer-events-none para que funcione el boton} */}
          </div>
            {/*/sacar pointer-events-none para que funcione el boton} */}
          <div className="flex flex-col pointer-events-none gap-3 items-end">
            <ActionButton size="small"><i className="ri-trophy-fill"></i></ActionButton>
            <ActionButton size="small"><i className="ri-store-2-fill"></i></ActionButton>
            <ActionButton size="small"><i className="ri-shopping-cart-fill"></i></ActionButton>
          </div>
        </div>

        <CarDisplay imageUrl={data.activeItems.car.imageUrl} />
      </div>
    </div>
  );
};
