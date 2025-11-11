import type { ProductDto } from "./productDto";

export interface StoreProductsResponse {
  items: ProductDto[];
  totalCount: number;
}
