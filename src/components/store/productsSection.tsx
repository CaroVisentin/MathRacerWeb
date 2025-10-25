import type { ProductDto } from "../../models/domain/productDto";
import { ProductsRow } from "./productsRow";

interface ProductsSectionProps {
    categories: {
        title: string;
        products: ProductDto[];
    }[];
}

export const ProductsSection = ({ categories }: ProductsSectionProps) => {
    return (
        <div className="flex flex-col gap-8">
            {categories.map((category) => (
                <ProductsRow
                    key={category.title}
                    title={category.title}
                    products={category.products}
                />
            ))}
        </div>
    );
};
