import { Link } from "react-router-dom";
import { BatteryStatus } from "./batteryStatus";
import { CoinsDisplay } from "./coinsDisplay";
import { ProfileCard } from "./profileCard";

interface PlayerStatusPanelProps {
  coins: number;
  level: number;
  ranking: number;
  backgroundImageUrl: string;
  profileImageUrl: string;
  className?: string;
}

export const PlayerStatusPanel = ({
  coins,
  backgroundImageUrl,
  profileImageUrl,
  className,
}: PlayerStatusPanelProps) => {
  return (
    <div className={`flex items-end gap-4 ${className ?? ""}`}>
      <div className="flex items-end flex-col gap-2 sm:gap-3 md:gap-4">
        <BatteryStatus />
        <CoinsDisplay coins={coins} />
      </div>
      <Link to="/perfil">
        <ProfileCard
          imageUrl={profileImageUrl}
          backgroundUrl={backgroundImageUrl}
        />
      </Link>
    </div>
  );
};
