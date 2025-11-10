import type { ProductDto } from "../../models/domain/store/productDto";
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
    navigate(`/store/product/${product.id}`);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case "común":
      case "comun":
      case "common":
        return "border-gray-400";
      case "raro":
      case "rare":
        return "border-blue-500";
      case "épico":
      case "epico":
      case "epic":
        return "border-purple-500";
      case "legendario":
      case "legendary":
        return "border-yellow-500";
      default:
        return "border-cyan-500";
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-white text-xl">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {products.map((product) => (
          <div
            key={product.id}
            className={`bg-gray-900 rounded-lg p-2 flex-shrink-0 w-45 flex flex-col items-center border-2 ${getRarityColor(product.rarity)} relative cursor-pointer hover:scale-105 transition-transform`}
            onClick={() => handleProductClick(product)}
          >
            {/* Badge de propiedad */}
            {product.isOwned && (
              <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full z-10">
                ✓ Tuyo
              </div>
            )}

            {/* Badge de rareza */}
            <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded z-10">
              {product.rarity}
            </div>

            <ProductImage product={product} />
            <h3 className="text-white text-lg text-center">{product.name}</h3>
            <p className="text-gray-400 text-sm text-center line-clamp-2 mb-2">
              {product.description}
            </p>
            <div className="flex items-center text-white gap-1">
              <img src={coinImg} className="w-4 h-4" alt="coin" />
              <span>
                {product.price} {product.currency}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
