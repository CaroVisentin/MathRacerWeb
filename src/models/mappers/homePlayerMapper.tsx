import type { Player } from '../ui/player';
import type { HomeData,   Battery, Item } from '../ui/home-data';

export const mapPlayerToHomeData = (
  player: Player,
  car: Item,
  background: Item,
  profile: Item,
  battery: Battery,
  
): HomeData => {
  return{
   user: {
    id: player.id,
    name: player.name,
    coins: player.coins,
    level: player.lastlevelId,
    ranking: player.points,
  },
   activeItems: {
    car,
    background,
    profile,
  } ,
    battery,  
};
};