import { useEnergy } from "../../hooks/useEnergy";
import { batteryIcons } from "../../models/ui/home/batteryIcons";

type BatteryStatusVariant = "default" | "compact";

interface BatteryStatusProps {
  variant?: BatteryStatusVariant;
  className?: string;
}

export const BatteryStatus = ({ variant = "default", className = "" }: BatteryStatusProps) => {
  const { currentAmount, maxAmount, secondsUntilNextRecharge } = useEnergy();

  const levels = Array(maxAmount)
    .fill("empty")
    .fill("full", 0, currentAmount);

  const time =
    secondsUntilNextRecharge == null
      ? "--:--"
      : `${Math.floor(secondsUntilNextRecharge / 60)}:${(
        secondsUntilNextRecharge % 60
      )
        .toString()
        .padStart(2, "0")}`;

  const isCompact = variant === "compact";
  const gapClass = isCompact ? "gap-1 sm:gap-2" : "gap-2 sm:gap-3";
  const boltSize = isCompact ? "h-4 sm:h-5 md:h-6" : "h-6 sm:h-7 md:h-8";
  const timerTextClass = isCompact ? "text-xs sm:text-sm md:text-base" : "text-sm sm:text-lg md:text-2xl";
  const batterySize = isCompact
    ? "w-3 h-6 sm:w-4 sm:h-8"
    : "w-5 h-10 sm:w-6 sm:h-12 md:w-7 md:h-14";

  return (
    <div className={`flex items-end ${gapClass} ${className}`}>
      <div className="flex flex-col items-center">
        <img src={batteryIcons.pilabolt} alt="bolt" className={`${boltSize}`} />
        <span className={`${timerTextClass} text-center text-white`}>{time}</span>
      </div>

      <div className="flex items-end gap-1">
        {levels.map((lvl, i) => (
          <img
            key={i}
            src={lvl === "full" ? batteryIcons.pila : batteryIcons.pilaempty}
            alt={lvl}
            className={`${batterySize}`}
          />
        ))}
      </div>
    </div>
  );
};

