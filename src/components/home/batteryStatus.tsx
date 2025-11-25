import { useMemo } from "react";
import { useEnergy } from "../../hooks/useEnergy";
import { batteryIcons } from "../../models/ui/home/batteryIcons";

type BatteryStatusVariant = "default" | "compact";

interface BatteryStatusProps {
  variant?: BatteryStatusVariant;
  className?: string;
}

export const BatteryStatus = ({ variant = "default", className = "" }: BatteryStatusProps) => {
  const { currentAmount, maxAmount, secondsUntilNextRecharge } = useEnergy();

  // Calcular los niveles (baterías llenas vs vacías)
  const levels = useMemo(() => {
    const full = Array(currentAmount).fill("full");
    const empty = Array(maxAmount - currentAmount).fill("empty");
    return [...full, ...empty];
  }, [currentAmount, maxAmount]);

  // Formatear el tiempo restante
  const time = useMemo(() => {
    if (secondsUntilNextRecharge == null) return "--:--";
    const m = Math.floor(secondsUntilNextRecharge / 60);
    const s = secondsUntilNextRecharge % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }, [secondsUntilNextRecharge]);

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
