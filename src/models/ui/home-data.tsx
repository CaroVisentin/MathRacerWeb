import auto from "../../assets/images/auto.png";
import fondo from "../../assets/images/garage-bg.png";
import perfil from "../../assets/images/jugador.png";
import pila from "../../assets/images/pila-full.png";
import pilaempty from "../../assets/images/pila-empty.png";
import pilabolt from "../../assets/images/pila-bolt.png";
import moneda from "../../assets/images/coin.png";

export interface Battery {
  time: string;
  levels: ("full" | "empty")[];
}

export interface Item {
  id: number;
  name: string;
  imageUrl: string;
}

export interface ActiveItems {
  car: Item;
  background: Item;
  profile: Item;
}

export interface UserInfo {
  id: number;
  name: string;
  coins: number;
  level: number;
  ranking: number;
}

export interface HomeData {
  user: UserInfo;
  activeItems: ActiveItems;
  battery: Battery;
}



export const homeDataMock: HomeData = {
  user: {
    id: 1,
    name: "PlayerOne",
    coins: 120000,
    level: 5,
    ranking: 12234,
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

export const batteryIcons = { pila, pilaempty, pilabolt };
export const currencyIcon = moneda;
