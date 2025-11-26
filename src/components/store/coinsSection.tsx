import { CoinPackageCard } from "./coinPackageCard";
import type { CoinPackageDto } from "../../models/domain/store/coinPackageDto";


interface CoinsSectionProps {
  packages: CoinPackageDto[];
  playerId?: number;
}

export const CoinsSection = ({ packages, playerId }: CoinsSectionProps) => {
  return (
    <div className="w-full pt-10">
     
      <div className="flex flex-col gap-1">
        <h2 className="text-white text-xl">Paquetes de monedas</h2>

     <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-3">
        {packages.map((pkg) => (
          <CoinPackageCard
            key={pkg.id}
            coinPackage={pkg}
            playerId={playerId}
          />
        ))}
      </div>
      </div>

    </div>
  );
};
