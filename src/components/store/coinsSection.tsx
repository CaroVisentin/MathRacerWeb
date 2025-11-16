import type { CoinPackageDto } from "../../models/domain/store/coinPackageDto";
import { CoinPackageCard } from "./coinPackageCard";

interface CoinsSectionProps {
  packages: CoinPackageDto[];
  onPurchase?: (packageId: number) => void;
}

export const CoinsSection = ({ packages, onPurchase }: CoinsSectionProps) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-white mb-6">Paquetes de Monedas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {packages.map((pkg) => (
          <CoinPackageCard 
            key={pkg.id} 
            coinPackage={pkg}
            onPurchase={onPurchase}
          />
        ))}
      </div>
    </div>
  );
};
