import { type CartItem } from "../../ui/cart"

export interface ChestResponseDto {
  items: ChestItemDto[];
}

export interface ChestItemDto {
  type: string;
  quantity: number;
  product: ChestProductDto | null;
  wildcard: CartItem | null; 
  compensationCoins: number | null;
}

export interface ChestProductDto {
  id: number;
  name: string;
  description: string;
  productType: number;
  rarityId: number;
  rarityName: string;
  rarityColor: string;
}