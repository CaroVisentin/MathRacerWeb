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
}
