import { useState } from "react";
import Wallet from "@mercadopago/sdk-react/esm/bricks/wallet";
import type { CoinPackageDto } from "../../models/domain/store/coinPackageDto";
import { createPreference } from "../../services/payments/paymentService";
import coin from "../../assets/images/coin.png";

interface CoinPackageCardProps {
  coinPackage: CoinPackageDto;
  playerId?: number;
}

export const CoinPackageCard = ({ coinPackage, playerId }: CoinPackageCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePurchase = async () => {
    if (!playerId) {
      setError("Debes iniciar sesión para comprar monedas.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const prefId = await createPreference(playerId, coinPackage.id);
      setPreferenceId(prefId);
    } catch (err) {
      console.error("Error al generar preferencia:", err);
      setError("No se pudo iniciar el pago. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetPreference = () => {
    setPreferenceId(null);
    setError(null);
  };

  return (
    <div className="bg-gradient-to-br from-yellow-600/10 to-yellow-800/10 rounded-xl p-4 border-2 border-yellow-500/30 hover:border-yellow-500 transition-all  mx-auto flex flex-col gap-5 flex-shrink-0 w-[300px] h-full">
      <div className="flex flex-col items-center gap-4">
        <div className="text-6xl">
          <img src={coin} alt="Coin" className="h-17 rounded-full"/>
        </div>

        <div className="text-center">
          <h3 className="text-3xl font-bold text-white">{coinPackage.coinAmount}</h3>
          <p className="text-md text-gray-400">Monedas</p>
        </div>

        {coinPackage.description && (
          <p className="text-xl text-gray-300 text-center">
            {coinPackage.description}
          </p>
        )}

        <div className="text-center">
          <p className="text-xl font-bold text-green-400">
            ${coinPackage.price.toFixed(2)}
          </p>
          <p className="text-md text-gray-400">Pesos Argentinos</p>
        </div>

        {error && (
          <p className="text-md text-red-400 text-center">{error}</p>
        )}

        {preferenceId ? (
          <div className="w-full flex flex-col gap-2">
            <Wallet initialization={{ preferenceId }} />
            <button
              onClick={resetPreference}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Cancelar pago
            </button>
          </div>
        ) : (
          <button
            onClick={handlePurchase}
            disabled={isLoading || !playerId}
            className="w-full items-center justify-center w-full bg-[#00f0ff] px-3 py-2 tracking-wider border-2 border-white text-lg font-black tracking-[0.3em] transition-all duration-300 hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.3)] hover:shadow-[0_0_20px_rgba(0,217,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"

          >
            {isLoading ? "Creando pago..." : "Comprar"}
          </button>
        )}
      </div>
    </div>
  );
};
