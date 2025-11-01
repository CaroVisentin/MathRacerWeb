import { useEffect, useState } from 'react';
import { usePlayer } from './usePlayer';
import { mapPlayerToHomeData } from '../models/mappers/homePlayerMapper';
import { homeDataMock } from '../data/mocks/home';
import type { HomeData } from '../models/ui/home-data';

export const useHomeData = () => {
  const { player } = usePlayer();
  const [homeData, setHomeData] = useState<HomeData | null>(null);

  useEffect(() => {
    if (!player) return;

    const mapped = mapPlayerToHomeData(
      player,
      homeDataMock.activeItems.car,
      homeDataMock.activeItems.background,
      homeDataMock.activeItems.profile,
      homeDataMock.battery
    );

    setHomeData(mapped);
  }, [player]);

  return { homeData };
};