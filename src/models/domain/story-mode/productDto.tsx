// DTO para representar un producto (auto, personaje, fondo)
export interface ProductDto {
    productId: number;
    name: string;
    description: string;
    productTypeId: number;
    productTypeName: string;
    rarityId: number;
    rarityName: string;
    rarityColor: string;
}