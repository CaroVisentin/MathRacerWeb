import { useEnergy } from "../../hooks/useEnergy";
import { batteryIcons } from "../../models/ui/home/batteryIcons";

type BatteryStatusVariant = "default" | "compact";

interface BatteryStatusProps {
  variant?: BatteryStatusVariant;
  className?: string;
}

export const BatteryStatus = ({ variant = "default", className = "" }: BatteryStatusProps) => {
  const { currentAmount, maxAmount, secondsUntilNextRecharge } = useEnergy();

  // Calcular niveles de batería (llenas y vacías)
  const levels = Array(maxAmount)
    .fill("empty")
    .fill("full", 0, currentAmount);

  // Formatear el tiempo restante
  const time =
    secondsUntilNextRecharge == null
      ? "--:--"
      : `${Math.floor(secondsUntilNextRecharge / 60)}:${(
        secondsUntilNextRecharge % 60
      )
        .toString()
        .padStart(2, "0")}`;

  // Variantes visuales
  const isCompact = variant === "compact";
  const gapClass = isCompact ? "gap-2" : "gap-3";
  const boltSize = isCompact ? "h-4" : "h-7";
  const timerTextClass = isCompact ? "text-base h-4" : "text-2xl h-6";
  const batterySize = isCompact ? "w-4 h-8" : "w-7 h-13";

  return (
    <div className={`flex items-end ${gapClass} ${className}`}>
      <div className="flex flex-col justify-space-between align-space-between">
        <img src={batteryIcons.pilabolt} alt="bolt" className={boltSize} />
        <span className={`${timerTextClass} text-center text-white`}>{time}</span>
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
