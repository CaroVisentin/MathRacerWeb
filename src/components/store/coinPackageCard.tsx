import type { CoinPackageDto } from "../../models/domain/store/coinPackageDto";
import coin from '../../assets/images/coin.png';

interface CoinPackageCardProps {
  coinPackage: CoinPackageDto;
  onPurchase?: (packageId: number) => void;
}

export const CoinPackageCard = ({ coinPackage, onPurchase }: CoinPackageCardProps) => {
  return (
    <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 rounded-lg p-6 border-2 border-yellow-500/30 hover:border-yellow-500 transition-all hover:scale-105">
      <div className="flex flex-col items-center gap-4">
        {/* Coin icon */}
        <div className="text-6xl"><img src={coin} alt="Coin" /></div>
        
        {/* Amount */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-yellow-400">{coinPackage.coinAmount}</h3>
          <p className="text-sm text-gray-400">Monedas</p>
        </div>
        
        {/* Description */}
        {coinPackage.description && (
          <p className="text-sm text-gray-300 text-center">{coinPackage.description}</p>
        )}
        
        {/* Price */}
        <div className="text-center">
          <p className="text-2xl font-bold text-green-400">${coinPackage.price.toFixed(2)}</p>
          <p className="text-xs text-gray-400">Pesos Argentinos</p>
        </div>
        
        {/* Buy button */}
        <button
          onClick={() => onPurchase?.(coinPackage.id)}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Comprar
        </button>
      </div>
    </div>
  );
};
