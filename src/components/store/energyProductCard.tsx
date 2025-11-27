import pilaBoltImg from "../../assets/images/pila-bolt.png";
import coinImg from "../../assets/images/coin.png";
import type { EnergyStoreInfoDto } from "../../models/domain/energy/energyStoreInfoDto";

interface EnergyProductCardProps {
  energyInfo: EnergyStoreInfoDto | null;
  canBuy: boolean;
  quantity: number;
  onQuantityChange: (value: number) => void;
  onBuy: () => void;
  totalPrice: number;
}

export const EnergyProductCard = ({
  energyInfo,
  canBuy,
  quantity,
  onQuantityChange,
  onBuy,
  totalPrice,
}: EnergyProductCardProps) => {
  return (
    <div
      className={`bg-gray-900 rounded-lg p-4 flex-shrink-0 w-[260px] border-2 ${canBuy ? "border-yellow-500" : "border-gray-600 opacity-70"} flex flex-col gap-3 h-full`}
    >
      <span className="text-xs uppercase tracking-widest text-yellow-200">
        Energía
      </span>
      <div className="flex flex-col items-center text-center gap-2">
        <div className="w-20 h-20 rounded-xl border-2 border-yellow-500 flex items-center justify-center ">
          <img src={pilaBoltImg} alt="batería" className="h-6 object-contain" />
        </div>
        <div>
          <h3 className="text-white tracking-wider text-xl font-semibold">
            Recarga inmediata
          </h3>
          {canBuy ? (
            <p className="text-gray-400 text-md">
              Seguí jugando sin esperar la recarga automática.
            </p>
          ) : (
            <p className="text-md text-gray-400">
              Ya alcanzaste el máximo de energía.
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-1 justify-end flex-col gap-3">
        {energyInfo ? (
          <div className="flex items-center justify-between text-sm text-gray-300">
            <p>
              Tenés:{" "}
              <span className="text-white font-semibold">
                {energyInfo.currentAmount}/{energyInfo.maxAmount}
              </span>
            </p>
            <p className="flex items-center gap-1">
              <img src={coinImg} alt="coin" className="w-4 h-4" />
              {totalPrice}
            </p>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">
            No se pudo cargar tu energía actual.
          </p>
        )}

        <div className="mt-auto flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-400">Cantidad</label>

            <input
              type="number"
              min={energyInfo?.maxCanBuy === 0 ? 0 : 1}
              max={energyInfo?.maxCanBuy ?? 1}
              value={quantity}
              onChange={(e) => {
                const nextValue = Number(e.target.value);
                onQuantityChange(Number.isNaN(nextValue) ? 0 : nextValue);
              }}
              disabled={!canBuy}
              className="bg-black/60 border border-cyan-500 rounded px-3 py-2 text-white w-full"
            />
          </div>

          <button
            type="button"
            onClick={onBuy}
            disabled={!canBuy || quantity <= 0}
            className="bg-[#00f0ff] text-black text-lg border-2 border-white px-3 py-2 tracking-wider transition-all duration-300 hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.3)] hover:shadow-[0_0_20px_rgba(0,217,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};
