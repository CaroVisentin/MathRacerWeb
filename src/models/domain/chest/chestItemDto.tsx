import type { ChestProductDto } from "./chestProductDto";
import type { ChestWildcardDto } from "./chestWildcardDto";

//  Item del cofre
export interface ChestItemDto {
    type: string; // "Product", "Coins", "Wildcard"
    quantity: number;
    product?: ChestProductDto;
    wildcard?: ChestWildcardDto;
    compensationCoins?: number;
}