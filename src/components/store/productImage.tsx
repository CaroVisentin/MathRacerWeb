import type { ProductDto } from "../../models/domain/store/productDto";
import {
  resolveImageUrl,
  type ProductVisualType,
} from "../../shared/utils/imageResolver";

interface ProductImageProps {
  product: ProductDto;
}

export const ProductImage = ({ product }: ProductImageProps) => {
  // Determinar el tipo de producto basado en productTypeName
  const getProductType = (): ProductVisualType => {
    const typeName = product.productTypeName?.toLowerCase();
    if (typeName === "auto" || typeName === "car") return "car";
    if (typeName === "personaje" || typeName === "character")
      return "character";
    if (typeName === "fondo" || typeName === "background") return "background";
    return "car"; // fallback
  };

  const productType = getProductType();
  const imageUrl = product.imageUrl || resolveImageUrl(productType, product.id);

  return (
    <div className="w-full aspect-[4/3] rounded-md mb-2 overflow-hidden flex items-center justify-center">
      <img
        src={imageUrl}
        alt={product.name}
        className={
          productType === "background"
            ? "w-full h-full object-cover"
            : "max-h-full max-w-full object-contain"
        }
      />
    </div>
  );
};
