import type { ChestProductDto } from "./chestProductDto";
import type { WildcardDto } from "./wildcardDto";

//  Item del cofre
export interface ChestItemDto {
    type: string; // "Product", "Coins", "Wildcard"
    number: string;
    product?: ChestProductDto;
    wildcard?: WildcardDto;
    compensationCoins?: number;
}