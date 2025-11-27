import { useEnergy } from "../../hooks/useEnergy";
import { batteryIcons } from "../../models/ui/home/batteryIcons";

type BatteryStatusVariant = "default" | "compact";

interface BatteryStatusProps {
  variant?: BatteryStatusVariant;
  className?: string;
}

export const BatteryStatus = ({
  variant = "default",
  className = "",
}: BatteryStatusProps) => {
  const { currentAmount, maxAmount, secondsUntilNextRecharge } = useEnergy();

  const levels = Array(maxAmount).fill("empty").fill("full", 0, currentAmount);

  const time =
    secondsUntilNextRecharge == null
      ? "--:--"
      : `${Math.floor(secondsUntilNextRecharge / 60)}:${(
          secondsUntilNextRecharge % 60
        )
          .toString()
          .padStart(2, "0")}`;

  const isCompact = variant === "compact";

  const compactGap = "gap-2";
  const compactBolt = "h-3";
  const compactTimer = "text-base h-4";
  const compactBattery = "w-3 h-7";

  const bigGap = "md:gap-3";
  const bigBolt = "md:h-7";
  const bigTimer = "md:text-2xl md:h-6";
  const bigBattery = "md:w-7 md:h-13";

  const gapClass = isCompact ? compactGap : `${compactGap} ${bigGap}`;
  const boltSize = isCompact ? compactBolt : `${compactBolt} ${bigBolt}`;
  const timerTextClass = isCompact
    ? compactTimer
    : `${compactTimer} ${bigTimer}`;
  const batterySize = isCompact
    ? compactBattery
    : `${compactBattery} ${bigBattery}`;

  return (
    <div className={`flex items-end ${gapClass} ${className}`}>
      <div className="flex flex-col justify-space-between align-space-between">
        <img src={batteryIcons.pilabolt} alt="bolt" className={boltSize} />
        <span className={`${timerTextClass} text-center text-white`}>
          {time}
        </span>
      </div>

      <div className="flex items-end gap-1">
        {levels.map((lvl, i) => (
          <img
            key={i}
            src={lvl === "full" ? batteryIcons.pila : batteryIcons.pilaempty}
            alt={lvl}
            className={batterySize}
          />
        ))}
      </div>
    </div>
  );
};
