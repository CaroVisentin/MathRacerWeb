import autoDefault from "../assets/images/auto.png";
import autoAlt from "../assets/images/auto3.png";
import autoRojo from "../assets/images/auto_rojo.png";
import fondoCity from "../assets/images/fondocity.png";
import fondoGarage from "../assets/images/garage-bg.png";
import pistaDia from "../assets/images/pista-dia.png";
import pistaNoche from "../assets/images/pista-noche.png";
import jugadorDefault from "../assets/images/jugador.png";
import jugador1 from "../assets/images/jugador1.png";
import jugador2 from "../assets/images/jugador2.png";
import jugador3 from "../assets/images/jugador3.png";

// Maps por tipo -> id numérico a asset local
const carImages: Record<number, string> = {
  1: autoDefault,
  2: autoAlt,
  3: autoRojo,
};

const backgroundImages: Record<number, string> = {
  1: fondoCity,
  2: fondoGarage,
  3: pistaDia,
  4: pistaNoche,
};

const characterImages: Record<number, string> = {
  1: jugadorDefault,
  2: jugador1,
  3: jugador2,
  4: jugador3,
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
      return fondoCity;
    case "character":
      return jugadorDefault;
  }
}
