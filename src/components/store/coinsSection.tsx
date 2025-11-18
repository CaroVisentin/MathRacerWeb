import { CoinPackageCard } from "./coinPackageCard";
import type { CoinPackageDto } from "../../models/domain/store/coinPackageDto";


interface CoinsSectionProps {
  packages: CoinPackageDto[];
  playerId?: number;
}

export const CoinsSection = ({ packages, playerId }: CoinsSectionProps) => {
  return (
    <div className="w-full pt-10">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-6xl mx-auto">
        {packages.map((pkg) => (
          <CoinPackageCard
            key={pkg.id}
            coinPackage={pkg}
            playerId={playerId}
          />
        ))}
      </div>
    </div>
  );
};
