import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { EnergyStoreInfoDto } from "../../models/domain/energy/energyStoreInfoDto";
import type { StoreWildcardDto } from "../../models/domain/store/storeWildcardDto";
import ConfirmModal from "../../shared/modals/confirmModal";
import PurchaseSuccessModal from "../../shared/modals/purchaseSuccessModal";
import ErrorModal from "../../shared/modals/errorModal";
import { purchaseEnergy } from "../../services/energy/energyService";
import { purchaseWildcard } from "../../services/wildcard/wildcardService";
import { getErrorMessage } from "../../shared/utils/manageErrors";
import { useEnergy } from "../../hooks/useEnergy";
import { usePlayer } from "../../hooks/usePlayer";
import { getPlayerData } from "../../services/player/playerService";
import { EnergyProductCard } from "./energyProductCard";
import { WildcardProductCard } from "./wildcardProductCard";

interface EnergyWildcardsStoreSectionProps {
  playerId?: number;
  energyInfo: EnergyStoreInfoDto | null;
  wildcards: StoreWildcardDto[];
  onReload: () => Promise<void>;
}

type ConfirmAction =
  | { type: "energy"; quantity: number; totalPrice: number }
  | { type: "wildcard"; item: StoreWildcardDto; quantity: number; totalPrice: number };

const MAX_WILDCARD_PER_PURCHASE = 5;

export const EnergyWildcardsStoreSection = ({ playerId, energyInfo, wildcards, onReload }: EnergyWildcardsStoreSectionProps) => {
  const { refreshEnergy } = useEnergy();
  const { setPlayer } = usePlayer();
  const navigate = useNavigate();

  const [energyQuantity, setEnergyQuantity] = useState(energyInfo?.maxCanBuy === 0 ? 0 : 1);
  const [wildcardQuantities, setWildcardQuantities] = useState<Record<number, number>>({});
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!energyInfo) return;
    setEnergyQuantity((prev) => {
      if (energyInfo.maxCanBuy === 0) return 0;
      if (prev <= 0) return 1;
      if (prev > energyInfo.maxCanBuy) return energyInfo.maxCanBuy;
      return prev;
    });
  }, [energyInfo]);

  const canBuyEnergy = useMemo(() => Boolean(playerId && energyInfo && energyInfo.maxCanBuy > 0), [playerId, energyInfo]);

  const energyTotalPrice = useMemo(() => {
    if (!energyInfo) return 0;
    return energyQuantity * energyInfo.pricePerUnit;
  }, [energyQuantity, energyInfo]);

  const handleWildcardQuantityChange = (id: number, value: number) => {
    const safeValue = Math.max(1, Math.min(value, MAX_WILDCARD_PER_PURCHASE));
    setWildcardQuantities((prev) => ({ ...prev, [id]: safeValue }));
  };

  const refreshPlayerSnapshot = async () => {
    try {
      const updatedPlayer = await getPlayerData();
      setPlayer(updatedPlayer);
      localStorage.setItem("player", JSON.stringify(updatedPlayer));
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  const runEnergyPurchase = async (quantity: number) => {
    if (!playerId) return;
    const response = await purchaseEnergy(playerId, quantity);
    setSuccessMessage(response?.message || `Compraste ${quantity} energía${quantity > 1 ? "s" : ""}.`);
  };

  const runWildcardPurchase = async (item: StoreWildcardDto, quantity: number) => {
    if (!playerId) return;
    const response = await purchaseWildcard(playerId, item.id, quantity);
    const message = response?.message || `Compraste ${quantity} ${item.name}.`;
    setSuccessMessage(message);
  };

  const handleCloseSuccess = () => setSuccessMessage(null);

  const handleGoToStoryMode = () => {
    setSuccessMessage(null);
    navigate("/modo-historia");
  };

  const handleConfirm = async () => {
    if (!confirmAction || !playerId) return;
    setIsProcessing(true);

    try {
      if (confirmAction.type === "energy") {
        await runEnergyPurchase(confirmAction.quantity);
      } else {
        await runWildcardPurchase(confirmAction.item, confirmAction.quantity);
      }

      await Promise.all([refreshPlayerSnapshot(), refreshEnergy(), onReload()]);
    } catch (error: unknown) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsProcessing(false);
      setConfirmAction(null);
    }
  };

  const handleEnergyClick = () => {
    if (!energyInfo || !canBuyEnergy || energyQuantity <= 0) return;
    setConfirmAction({
      type: "energy",
      quantity: energyQuantity,
      totalPrice: energyTotalPrice,
    });
  };

  const handleWildcardClick = (item: StoreWildcardDto) => {
    const rawQuantity = wildcardQuantities[item.id] ?? 1;
    const quantity = Math.max(1, Math.min(rawQuantity, MAX_WILDCARD_PER_PURCHASE));
    setConfirmAction({
      type: "wildcard",
      item,
      quantity,
      totalPrice: item.price * quantity,
    });
  };

  if (!playerId) {
    return (
      <div className="text-white text-center py-8">
        Debes iniciar sesión para comprar energía o wildcards.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <h2 className="text-white text-xl sm:text-2xl">Energía y Comodines</h2>
      </div>

      {/* === LISTA DE PRODUCTOS (Responsive) === */}
      <div
        className="
        flex sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
        gap-4 sm:gap-6 
        overflow-x-auto sm:overflow-visible 
        snap-x snap-mandatory
        pb-3 sm:pb-0
        custom-scrollbar
      "
      >
        {/* ENERGY CARD */}
        <div className="snap-start min-w-[260px] max-w-full flex-shrink-0">
          <EnergyProductCard
            energyInfo={energyInfo}
            canBuy={canBuyEnergy}
            quantity={energyQuantity}
            onQuantityChange={setEnergyQuantity}
            onBuy={handleEnergyClick}
            totalPrice={energyTotalPrice}
          />
        </div>

        {/* WILDCARDS */}
        {wildcards.length === 0 ? (
          <div className="bg-gray-900 rounded-lg p-4 flex-shrink-0 min-w-[260px] text-gray-400 text-center flex items-center justify-center border-2 border-dashed border-gray-600">
            No hay wildcards disponibles por ahora.
          </div>
        ) : (
          wildcards.map((item) => (
            <div
              key={item.id}
              className="snap-start min-w-[260px] flex-shrink-0"
            >
              <WildcardProductCard
                item={item}
                quantity={wildcardQuantities[item.id] ?? 1}
                onQuantityChange={(value) => handleWildcardQuantityChange(item.id, value)}
                onBuy={() => handleWildcardClick(item)}
                maxQuantity={MAX_WILDCARD_PER_PURCHASE}
              />
            </div>
          ))
        )}
      </div>

      {/* Modals */}
      {confirmAction && (
        <ConfirmModal
          title="Confirmar compra"
          message={
            confirmAction.type === "energy"
              ? `¿Deseas comprar ${confirmAction.quantity} energía${confirmAction.quantity > 1 ? "s" : ""} por ${confirmAction.totalPrice} monedas?`
              : `¿Deseas comprar ${confirmAction.quantity} ${confirmAction.item.name}${confirmAction.quantity > 1 ? "s" : ""} por ${confirmAction.totalPrice} monedas?`
          }
          confirmText={isProcessing ? "Procesando..." : "Comprar"}
          cancelText="Cancelar"
          onConfirm={isProcessing ? () => null : handleConfirm}
          onCancel={isProcessing ? () => null : () => setConfirmAction(null)}
        />
      )}

      {successMessage && (
        <PurchaseSuccessModal
          message={successMessage}
          onClose={handleCloseSuccess}
          onGoToPage={handleGoToStoryMode}
          goToLabel="Ir al modo historia"
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
