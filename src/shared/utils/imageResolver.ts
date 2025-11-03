import autoDefault from "../../assets/images/auto.png";
import autoAlt from "../../assets/images/auto3.png";
import autoRojo from "../../assets/images/cars/a1.png";
import autoAzul from "../../assets/images/cars/a2.png";
import autoBlanco from "../../assets/images/cars/a3.png";
import autoNaranja from "../../assets/images/cars/a4.png";
import fondoPastel from "../../assets/images/backgrounds/f3.png";
import fondoNube from "../../assets/images/backgrounds/f1.png";
import pistaDia from "../../assets/images/backgrounds/f4.png";
import pistaNoche from "../../assets/images/backgrounds/f2.png";
import jugadorDefault from "../../assets/images/characters/p1.png";
import jugadorRojo from "../../assets/images/characters/p2.png";
import jugadorAzul from "../../assets/images/characters/p3.png";
import jugadorSonic from "../../assets/images/characters/p5.png";


const carImages: Record<number, string> = {
  1: autoDefault,
  2: autoAlt,
  3: autoRojo,
  6: autoAzul,
  9: autoBlanco,
  12: autoNaranja,
};

const backgroundImages: Record<number, string> = {
  11: fondoPastel,
  14: fondoNube,
  5: pistaDia,
  8: pistaNoche,
};

const characterImages: Record<number, string> = {
  4: jugadorDefault,
  7: jugadorRojo,
  10: jugadorAzul,
  13: jugadorSonic,
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
