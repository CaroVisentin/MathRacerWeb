import type { ProductDto } from "../../models/domain/productDto";
import coinImg from "../../assets/images/coin.png";
import { ProductImage } from "./productImage";
import { useNavigate } from "react-router-dom";

interface ProductsRowProps {
    title: string;
    products: ProductDto[];
}

export const ProductsRow = ({ title, products }: ProductsRowProps) => {
    const navigate = useNavigate();

    const handleProductClick = (product: ProductDto) => {
        navigate(`/store/product/${product.id}`)
    }

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-white text-xl">{title}</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-gray-900 rounded-lg p-2 flex-shrink-0 w-45 flex flex-col items-center border border-cyan-500"
                        onClick={() => handleProductClick(product)}
                    >
                        <ProductImage product={product} />
                        <h3 className="text-white text-lg">{product.name}</h3>
                        <div className="flex items-center text-white gap-1">
                            <img src={coinImg} className="w-4 h-4" alt="coin" />
                            <span>{product.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
