export interface PlayerItem {
  id: number;
  name: string;
  description: string;
  price: number;
  productType: string;
}

export interface Player {
  id: number;
  name: string;
  email: string;
  lastlevelId: number;
  points: number;
  coins: number;
  background: PlayerItem | null;
  car: PlayerItem | null;
  character: PlayerItem | null;
  // Campos opcionales para alinearse con PlayerDto del backend
  equippedBackground?: PlayerItem | null;
  equippedCar?: PlayerItem | null;
  equippedCharacter?: PlayerItem | null;
}
