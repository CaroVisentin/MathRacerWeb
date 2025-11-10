import { useEffect, useState } from "react";
import { usePlayer } from "./usePlayer";
import { mapPlayerToHomeData } from "../models/mappers/homePlayerMapper";
import type { HomeData } from "../models/ui/home-data";
import { useEnergy } from "./useEnergy";

export const useHomeData = () => {
  const { player } = usePlayer();
  const { currentAmount, maxAmount, secondsUntilNextRecharge } = useEnergy();
  const [homeData, setHomeData] = useState<HomeData | null>(null);

  useEffect(() => {
    if (!player) return;

    const mapped = mapPlayerToHomeData(player, {
      currentAmount,
      maxAmount,
      secondsUntilNextRecharge,
    });

    setHomeData(mapped);
  }, [player]);

  return { homeData };
};
