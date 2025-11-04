// Producto desbloqueado desde un cofre
export interface ChestProductDto {
    id: number;
    name: string;
    description: string;
    productType: number;
    rarityId: number;
    rarityName: string;
    rarityColor: string;
}