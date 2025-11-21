import { useMemo } from "react";
import { batteryIcons } from "../../../models/ui/home/batteryIcons";
import { useEnergy } from "../../../hooks/useEnergy";

export const LivesAndTimer = () => {
  const { currentAmount, maxAmount, secondsUntilNextRecharge } = useEnergy();

  const formattedTime = useMemo(() => {
    if (secondsUntilNextRecharge == null) return "--:--"; // sin recarga
    const minutes = Math.floor(secondsUntilNextRecharge / 60);
    const secs = secondsUntilNextRecharge % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  }, [secondsUntilNextRecharge]);

  return (
    <div className="flex items-center gap-3">
      {/* Temporizador */}
      <div className="flex flex-col items-center justify-center h-full">
        <img src={batteryIcons.pilabolt} alt="bolt" className="h-4" />
        <span className="text-base text-white">{formattedTime}</span>
      </div>

      {/* Vidas */}
      <div className="flex items-center gap-1">
        {[...Array(maxAmount)].map((_, i) => (
          <img
            key={i}
            src={i < currentAmount ? batteryIcons.pila : batteryIcons.pilaempty}
            className="w-4 h-8"
          />
        ))}
      </div>
    </div>
  );
};
