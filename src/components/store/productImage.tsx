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
  const isCar = productType === "car";

  // Resolver la imagen usando el ID del producto
  const imageUrl = product.imageUrl || resolveImageUrl(productType, product.id);

  // Elegimos la clase según el tipo
  const imageClass = isCar
    ? "w-full h-32 object-contain rounded-md mb-2"
    : "w-full aspect-[4/3] object-cover rounded-md mb-2";

  return <img src={imageUrl} alt={product.name} className={imageClass} />;
};
