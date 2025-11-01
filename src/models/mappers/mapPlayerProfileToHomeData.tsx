import { type HomeData } from "../../models/ui/home-data";
import { type PlayerProfileDto } from "../domain/playerProfileDto";
import auto from "../assets/auto.png";
import fondo from "../assets/fondo.png";
import perfil from "../assets/perfil.png";

export function mapPlayerProfileToHomeData(profile: PlayerProfileDto): HomeData {
  return {
    user: {
      id: profile.id,
      name: profile.name,
      coins: profile.coins,
      level: profile.lastLevelId, 
      ranking: profile.points, 
    },
    activeItems: {
      car: {
        id: 1,
        name: "Default Car",
        imageUrl: auto,
      },
      background: {
        id: 2,
        name: "Default Garage",
        imageUrl: fondo,
      },
      profile: {
        id: 3,
        name: "Default Player",
        imageUrl: perfil,
      },
    },
    battery: {
      time: "02:35",
      levels: ["full", "full", "empty"],
    },
  };
}
