import { type CartItem } from "../../ui/cart"

export interface ChestResponseDto {
  items: ChestItemDto[];
}

export interface ChestItemDto {
  type: string;
  quantity: number;
  product: ChestProductDto | null;
  wildcard: CartItem | null; // Si en el futuro hay un tipo definido para wildcards, reemplazar
  compensationCoins: number | null;
}

export interface ChestProductDto {
  id: number;
  name: string;
  description: string;
  productType: string;
  rarityId: number;
  rarityName: string;
  rarityColor: string;
}