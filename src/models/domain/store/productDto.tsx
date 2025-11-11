export interface ProductDto {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  productTypeId: number;
  productTypeName: string;
  rarity: string;
  isOwned: boolean;
  currency: string;
}
