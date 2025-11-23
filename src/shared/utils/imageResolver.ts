import auto1 from "../../assets/images/1.png";
import auto2 from "../../assets/images/2.png";
import auto3 from "../../assets/images/3.png";
import auto4 from "../../assets/images/4.png";
import auto5 from "../../assets/images/5.png";
import auto6 from "../../assets/images/6.png";
import auto7 from "../../assets/images/7.png";
import auto8 from "../../assets/images/8.png";
import jugador1 from "../../assets/images/9.png";
import jugador2 from "../../assets/images/10.png";
import jugador3 from "../../assets/images/11.png";
import jugador4 from "../../assets/images/12.png";
import jugador5 from "../../assets/images/13.png";
import jugador6 from "../../assets/images/14.png";
import fondo1 from "../../assets/images/15.png";
import fondo2 from "../../assets/images/16.png";
import fondo3 from "../../assets/images/17.png";
import fondo4 from "../../assets/images/18.png";
import fondo5 from "../../assets/images/19.png";
// Maps por tipo -> id numérico a asset local
const carImages: Record<number, string> = {
  6: auto1,
  9: auto2,
  12: auto3,
  15: auto4,
  18: auto5,
  19: auto6,
  20: auto7,
  3: auto8,
};

// Los ProductId de personajes van del 9 al 14
const characterImages: Record<number, string> = {
  4: jugador1,  
  10: jugador2, 
  7: jugador3, 
  13: jugador4, 
  16: jugador5, 
  17: jugador6, 
};

// Los ProductId de fondos van del 15 al 19
const backgroundImages: Record<number, string> = {
  8: fondo1, 
  5: fondo2, 
  13: fondo3, 
  18: fondo4, 
  19: fondo5,
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
      return auto1;
  }
}

function fallback(type: ProductVisualType): string {
  switch (type) {
    case "car":
      return auto1;
    case "background":
      return fondo1;
    case "character":
      return jugador1;
  }
}

export const productFolderMap: Record<number, string> = {
  1: "cars",
  2: "characters",
  3: "backgrounds",
};

