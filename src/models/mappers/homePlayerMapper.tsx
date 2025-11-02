import type { Player, PlayerItem } from '../ui/player';
import type { HomeData, Battery, Item } from '../ui/home-data';
// Importar imágenes por defecto como fallback
import autoDefault from "../../assets/images/auto.png";
import fondoDefault from "../../assets/images/fondocity.png";
import perfilDefault from "../../assets/images/jugador.png";
import { resolveImageUrl } from "../../shared/utils/imageResolver";

export const mapPlayerToHomeData = (
  player: Player,
  battery: Battery,
): HomeData => {
  const toItem = (src: PlayerItem | null, type: 'car'|'background'|'character', def: {id:number; name:string; imageUrl:string}): Item => {
    if (!src) return def;
    // si llega a venir la imagen del back , se usa sino se compara id
   // const anySrc: any = src as any;
   // const imageId: number | undefined = anySrc.imageId ?? src.id;
   // const imageUrl: string = anySrc.imageUrl ?? resolveImageUrl(type, imageId);
   const imageUrl: string = resolveImageUrl(type, src.id);
   return { id: src.id, name: src.name, imageUrl };
  };

  const car: Item = toItem(player.car, 'car', { id: 0, name: 'Default Car', imageUrl: autoDefault });
  const background: Item = toItem(player.background, 'background', { id: 0, name: 'Default Background', imageUrl: fondoDefault });
  const profile: Item = toItem(player.character, 'character', { id: 0, name: 'Default Character', imageUrl: perfilDefault });

  return {
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
    },
    battery,
  };
};