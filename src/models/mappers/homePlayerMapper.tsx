import type { Player, PlayerItem } from "../ui/player/player";
import type { HomeData, Item } from "../ui/home/home-data";
import autoDefault from "../../assets/images/auto.png";
import fondoDefault from "../../assets/images/fondocity.png";
import perfilDefault from "../../assets/images/jugador.png";
import { resolveImageUrl } from "../../shared/utils/imageResolver";
import type { EnergyStatusDto } from "../domain/energy/energyStatusDto";

export const mapPlayerToHomeData = (
  player: Player,
  energy: EnergyStatusDto
): HomeData => {
  const toItem = (
    src: PlayerItem | null,
    type: "car" | "background" | "character",
    def: { id: number; name: string; imageUrl: string }
  ): Item => {
    if (!src) return def;
    const imageUrl: string = resolveImageUrl(type, src.id);
    return { id: src.id, name: src.name, imageUrl };
  };

  const car: Item = toItem(player.car, "car", {
    id: 0,
    name: "Default Car",
    imageUrl: autoDefault,
  });

  const background: Item = toItem(player.background, "background", {
    id: 0,
    name: "Default Background",
    imageUrl: fondoDefault,
  });

  const profile: Item = toItem(player.character, "character", {
    id: 0,
    name: "Default Character",
    imageUrl: perfilDefault,
  });

  // Mapeo de energía a batería visual
  const levels = Array.from({ length: energy.maxAmount }, (_, i) =>
    i < energy.currentAmount ? "full" : "empty"
  ) as ("full" | "empty")[];

  const battery = {
    time: new Date(energy.secondsUntilNextRecharge ?? 0 * 1000)
      .toISOString()
      .substring(14, 19), // mm:ss
    levels,
  };

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
