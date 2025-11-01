//import type { HomeData } from "../../models/ui/home-data";
import auto from "../../assets/images/auto.png";
import fondo from "../../assets/images/fondocity.png";
import perfil from "../../assets/images/jugador.png";
import pila from "../../assets/images/pila-full.png";
import pilaempty from "../../assets/images/pila-empty.png";
import pilabolt from "../../assets/images/pila-bolt.png";
import moneda from "../../assets/images/coin.png";

export const homeDataMock = {

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
    levels: ["full", "full", "empty"] as ("full" | "empty")[],
  }};

export const batteryIcons = { pila, pilaempty, pilabolt };
export const currencyIcon = moneda;