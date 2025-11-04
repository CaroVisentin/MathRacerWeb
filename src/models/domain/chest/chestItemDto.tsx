import type { ChestProductDto } from "./chestProductDto";
import type { ChestWildcardDto } from "./chestWildcardDto";

//  Item del cofre
export interface ChestItemDto {
    type: string; // "Product", "Coins", "Wildcard"
    number: string;
    product?: ChestProductDto;
    wildcard?: ChestWildcardDto;
    compensationCoins?: number;
}