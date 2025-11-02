import autoDefault from "../../assets/images/auto.png";
import autoAlt from "../../assets/images/auto3.png";
import autoRojo from "../../assets/images/auto_rojo.png";
import autoAzul from "../../assets/images/auto-garage.png";
import autoBlanco from "../../assets/images/auto-garage2.png";
import autoNaranja from "../../assets/images/auto-garage3.png";
import fondoPastel from "../../assets/images/pista-pastel.png";
import fondoNube from "../../assets/images/fondo2.png";
import pistaDia from "../../assets/images/pista-dia.png";
import pistaNoche from "../../assets/images/pista-noche.png";
import jugadorDefault from "../../assets/images/jugador.png";
import jugador1 from "../../assets/images/jugador1.png";
import jugador2 from "../../assets/images/jugador2.png";
import jugador3 from "../../assets/images/jugador3.png";


const carImages: Record<number, string> = {
  1: autoDefault,
  2: autoAlt,
  7: autoRojo,
  4: autoAzul,
  10: autoBlanco,
  6: autoNaranja,
};

const backgroundImages: Record<number, string> = {
  6: fondoPastel,
  9: fondoNube,
  3: pistaDia,
  12: pistaNoche,
};

const characterImages: Record<number, string> = {
  11: jugadorDefault,
  2: jugador1,
  5: jugador2,
  8: jugador3,
};

export type ProductVisualType = "car" | "background" | "character";

export function resolveImageUrl(type: ProductVisualType, id?: number): string {
  if (!id || id <= 0) return fallback(type);
  switch (type) {
    case "car":
      return carImages[id] ?? fallback(type);
    case "background":
      return backgroundImages[id] ?? fallback(type);
    case "character":
      return characterImages[id] ?? fallback(type);
    default:
      return autoDefault;
  }
}

function fallback(type: ProductVisualType): string {
  switch (type) {
    case "car":
      return autoDefault;
    case "background":
      return fondoPastel;
    case "character":
      return jugadorDefault;
  }
}
