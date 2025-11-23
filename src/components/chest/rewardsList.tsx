import React from "react";
import { useNavigate } from "react-router-dom";
import type { ChestResponseDto } from "../../models/domain/chest/chestResponseDto";
import type { ChestItemDto } from "../../models/domain/chest/chestItemDto";

interface RewardsListProps {
  obtainedChest: ChestResponseDto | null;
  setShowChest: React.Dispatch<React.SetStateAction<boolean>>;
  setRewards: React.Dispatch<React.SetStateAction<boolean>>;
  setObtainedChest: React.Dispatch<
    React.SetStateAction<ChestResponseDto | null>
  >;
  setIsPendingChest?: React.Dispatch<React.SetStateAction<boolean>>;
  onContinue?: () => void | Promise<void>;
}

export const RewardsList: React.FC<RewardsListProps> = ({
  obtainedChest,
  setShowChest,
  setRewards,
  setObtainedChest,
  setIsPendingChest,
  onContinue,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Contenedor de las cards */}
      <div className="flex justify-center items-center gap-6">
        {obtainedChest?.items.map((item: ChestItemDto, index) => {
          let title = "";
          let description = "";
          let color = "#fffff";
          let imageSrc = "";
          let quantity = 0;

          switch (item.type) {
            case "Product":
              title = item.product?.name ?? "Producto misterioso";
              description = item.product?.description ?? "";
              color = item.product?.rarityColor ?? "#c0be9a";
              imageSrc = `/images/products/${item.product?.id}.png`;
              quantity = item.quantity;
              break;

            case "Wildcard":
              title = item.wildcard?.name ?? "Comodín";
              description = item.wildcard?.description ?? "";
              color = "#a3e4d7";
              imageSrc = `/images/wildcards/${item.wildcard?.id}.png`;
              quantity = item.quantity;
              break;

            case "Coins":
              title = `${item.compensationCoins ?? 0} monedas`;
              description = "Monedas obtenidas del cofre";
              imageSrc = `/images/coin.png`;
              quantity = item.quantity;
              break;

            default:
              title = "Recompensa desconocida";
              break;
          }

          return (
            <div
              key={index}
              className="w-60 h-68 rounded-lg border-2 border-white flex flex-col justify-center items-center p-4"
              style={{ backgroundColor: color }}
            >
              <img
                src={imageSrc}
                alt={title}
                className="w-24 h-24 object-contain mb-2"
              />
              <h3
                className={`text-lg font-bold text-center ${color === "#ffff" ? "text-black" : "text-white"}`}
              >
                {title} x{quantity}
              </h3>
              {description && (
                <p className="text-sm text-center opacity-80">{description}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Botón debajo y centrado */}
      <button
        onClick={async () => {
          if (onContinue) {
            // Custom handler (e.g., tutorial)
            await onContinue();
          } else {
            // Default behavior
            setShowChest(false);
            setRewards(false);
            setObtainedChest(null);
            setIsPendingChest?.(false);
            navigate("/garage");
          }
        }}
        className="bg-[#0F7079] border-2 border-white rounded-lg text-2xl transition w-40 h-12 text-white hover:bg-[#13909B]"
      >
        Continuar
      </button>
    </div>
  );
};
