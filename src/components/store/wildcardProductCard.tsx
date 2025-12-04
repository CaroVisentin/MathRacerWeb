import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faFireExtinguisher,
  faQuestionCircle,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import coinImg from "../../assets/images/coin.png";
import type { StoreWildcardDto } from "../../models/domain/store/storeWildcardDto";

interface WildcardProductCardProps {
  item: StoreWildcardDto;
  quantity: number;
  onQuantityChange: (value: number) => void;
  onBuy: () => void;
  maxQuantity: number;
  className?: string;
}

const wildcardIconMap: Record<string, { icon: IconDefinition; color: string }> =
  {
    matafuego: { icon: faFireExtinguisher, color: "#d20000ff" },
    cambio: { icon: faSyncAlt, color: "#00bb45ff" },
    nitro: { icon: faBolt, color: "#22d3ee" },
  };

const getWildcardVisuals = (
  name: string
): { icon: IconDefinition; color: string } => {
  const normalized = name.toLowerCase();
  const match = Object.entries(wildcardIconMap).find(([key]) =>
    normalized.includes(key)
  );
  if (match) return match[1];
  return { icon: faQuestionCircle, color: "#a855f7" };
};

export const WildcardProductCard = ({
  item,
  quantity,
  onQuantityChange,
  onBuy,
  maxQuantity,
  className,
}: WildcardProductCardProps) => {
  const { icon, color } = getWildcardVisuals(item.name);

  return (
    <div
      className={`bg-gray-900 rounded-lg p-4 flex-shrink-0 w-[260px] border-2 border-purple-500 flex flex-col gap-3 h-full ${className ?? ""}`}
    >
      <span className="text-xs uppercase tracking-widest text-purple-200">
        Wildcard
      </span>
      <div className="flex flex-col items-center text-center gap-2">
        <div
          className="w-20 h-20 rounded-lg border-2 flex items-center justify-center bg-black/40"
          style={{ borderColor: color }}
        >
          <FontAwesomeIcon icon={icon} style={{ color, fontSize: "2rem" }} />
        </div>
        <div>
          <h3 className="text-white tracking-wider text-xl font-semibold">
            {item.name}
          </h3>
          <p className="text-gray-400 text-md line-clamp-3">
            {item.description}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-end gap-3">
        <div className="flex items-center justify-between text-sm text-gray-300">
          <p>
            Tenés:{" "}
            <span className="text-white font-semibold">
              {item.currentQuantity}
            </span>
          </p>
          <p className="flex items-center gap-1">
            <img src={coinImg} alt="coin" className="w-4 h-4" />
            {item.price}
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-400">Cantidad</label>
            <input
              type="number"
              min={1}
              max={maxQuantity}
              value={quantity}
              onChange={(e) => {
                const nextValue = Number(e.target.value);
                onQuantityChange(Number.isNaN(nextValue) ? 1 : nextValue);
              }}
              className="bg-black/60 border border-purple-500 rounded px-3 py-2 text-white"
            />
          </div>

          <button
            type="button"
            onClick={onBuy}
            className="bg-[#00f0ff] text-black text-lg border-2 border-white px-3 py-2 tracking-wider transition-all duration-300 hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.3)] hover:shadow-[0_0_20px_rgba(0,217,255,0.6)]"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};
