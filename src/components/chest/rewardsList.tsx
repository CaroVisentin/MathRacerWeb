import React from "react";
import { useNavigate } from "react-router-dom";
import { type ChestItemDto } from "../../models/domain/chest/chestItemDto";

interface RewardsListProps {
    obtainedChest: { items: ChestItemDto[] } | null;
    setShowChest: React.Dispatch<React.SetStateAction<boolean>>;
    setRewards: React.Dispatch<React.SetStateAction<boolean>>;
    setObtainedChest: React.Dispatch<React.SetStateAction<any>>;
    setIsPendingChest: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RewardsList: React.FC<RewardsListProps> = ({
    obtainedChest,
    setShowChest,
    setRewards,
    setObtainedChest,
    setIsPendingChest
}) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center gap-6">
            {/* Contenedor de las cards */}
            <div className="flex justify-center items-center gap-6">
                {obtainedChest?.items.map((item, index) => {
                    let title = "";
                    let description = "";
                    let color = "#c0be9a";
                    let imageSrc = "";

                    switch (item.type) {
                        case "Product":
                            title = item.product?.name ?? "Producto misterioso";
                            description = item.product?.description ?? "";
                            color = item.product?.rarityColor ?? "#c0be9a";
                            imageSrc = `/images/products/${item.product?.id}.png`;
                            break;

                        case "Wildcard":
                            title = item.wildcard?.name ?? "Comodín";
                            description = item.wildcard?.description ?? "";
                            color = "#a3e4d7";
                            imageSrc = `/images/wildcards/${item.wildcard?.id}.png`;
                            break;

                        case "Coins":
                            title = `${item.compensationCoins ?? 0} monedas`;
                            description = "Monedas obtenidas del cofre";
                            color = "#f4d03f";
                            imageSrc = `/images/coin.png`;
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
                            <img src={imageSrc} alt={title} className="w-24 h-24 object-contain mb-2" />
                            <h3 className="text-lg font-bold text-center">{title}</h3>
                            {description && (
                                <p className="text-sm text-center opacity-80">{description}</p>
                            )}
                            {item.number && (
                                <span className="mt-2 text-sm font-semibold">x{item.number}</span>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Botón debajo y centrado */}
            <button
                onClick={() => {
                    setShowChest(false);
                    setRewards(false);
                    setObtainedChest(null);
                    setIsPendingChest(false);
                    navigate("/modo-historia");
                }}
                className="bg-[#0F7079] border-2 border-white rounded-lg text-3xl transition w-32 h-12 text-white"
            >
                Siguiente
            </button>
        </div>
    );
};
