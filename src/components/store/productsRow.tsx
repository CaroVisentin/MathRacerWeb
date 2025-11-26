import { useState } from "react";
import type { ProductDto } from "../../models/domain/store/productDto";
import coinImg from "../../assets/images/coin.png";
import { ProductImage } from "./productImage";
import ConfirmModal from "../../shared/modals/confirmModal";
import PurchaseSuccessModal from "../../shared/modals/purchaseSuccessModal";
import ErrorModal from "../../shared/modals/errorModal";
import { buyCar, buyCharacter, buyBackground } from "../../services/player/storeService";
import { usePlayer } from "../../hooks/usePlayer";
import { getPlayerData } from "../../services/player/playerService";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../shared/utils/manageErrors";

interface ProductsRowProps {
  title: string;
  products: ProductDto[];
}

export const ProductsRow = ({ title, products }: ProductsRowProps) => {
  const { player, setPlayer } = usePlayer();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<ProductDto | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successProductName, setSuccessProductName] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [newlyOwnedIds, setNewlyOwnedIds] = useState<number[]>([]);

  const handleProductClick = (product: ProductDto) => {
    const isOwned = product.isOwned || newlyOwnedIds.includes(product.id);
    if (isOwned) {
      setErrorMessage("Ya posees este producto.");
      return;
    }
    setSelectedProduct(product);
  };

  const closeConfirmation = () => {
    setSelectedProduct(null);
  };

  const refreshPlayerData = async () => {
    try {
      const updatedPlayer = await getPlayerData();
      setPlayer(updatedPlayer);
      localStorage.setItem("player", JSON.stringify(updatedPlayer));
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(error))
    }
  };

  const runPurchase = async (product: ProductDto) => {
    const typeName = (product.productTypeName || "").toLowerCase();
    if (typeName.includes("auto") || typeName.includes("car")) {
      await buyCar(player!.id, product.id);
      return;
    }
    if (typeName.includes("personaje") || typeName.includes("character")) {
      await buyCharacter(player!.id, product.id);
      return;
    }
    if (typeName.includes("fondo") || typeName.includes("background")) {
      await buyBackground(player!.id, product.id);
      return;
    }
    throw new Error("Tipo de producto no soportado");
  };

  const handleConfirmPurchase = async () => {
    if (!selectedProduct) return;
    if (!player?.id) {
      setErrorMessage("Debes iniciar sesión para comprar productos.");
      closeConfirmation();
      return;
    }

    setIsProcessing(true);
    try {
      await runPurchase(selectedProduct);
      setNewlyOwnedIds((prev) =>
        prev.includes(selectedProduct.id) ? prev : [...prev, selectedProduct.id]
      );
      setSuccessProductName(selectedProduct.name);
      setSelectedProduct(null);
      await refreshPlayerData();
    } catch (error) {
      console.error("No se pudo completar la compra", error);
      setErrorMessage("No se pudo completar la compra. Intenta nuevamente.");
    } finally {
      setIsProcessing(false);
    }
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
      <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-2">
        {products.map((product) => {
          const isOwned = product.isOwned || newlyOwnedIds.includes(product.id);
          return (
            <div
              key={product.id}
              className={`bg-gray-900 rounded-lg p-2 flex-shrink-0 w-45 flex flex-col items-center border-2 ${getRarityColor(product.rarity)} relative ${isOwned ? "cursor-not-allowed opacity-80" : "cursor-pointer hover:scale-105"
                } transition-transform`}
              onClick={() => handleProductClick(product)}
            >
              {/* Badge de propiedad */}
              {isOwned && (
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
          );
        })}
      </div>
      {selectedProduct && (
        <ConfirmModal
          title="Confimar compra"
          message={`¿Deseas comprar ${selectedProduct.name} por ${selectedProduct.price} ${selectedProduct.currency}?`}
          confirmText={isProcessing ? "Comprando..." : "Comprar"}
          cancelText="Cancelar"
          onConfirm={isProcessing ? () => null : handleConfirmPurchase}
          onCancel={isProcessing ? () => null : closeConfirmation}
        />
      )}

      {successProductName && (
        <PurchaseSuccessModal
          message={`Tu compra de ${successProductName} fue exitosa.`}
          onClose={() => setSuccessProductName(null)}
          onGoToPage={() => {
            setSuccessProductName(null);
            navigate("/garage");
          }}
        />
      )}

      {errorMessage && (
        <ErrorModal
          title="Error"
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
          onReturn={() => setErrorMessage(null)}
        />
      )}
    </div>
  );
};
