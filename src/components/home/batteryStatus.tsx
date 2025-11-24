import { useMemo } from "react";
import { useEnergy } from "../../hooks/useEnergy";
import { batteryIcons } from "../../models/ui/home/batteryIcons";

export const BatteryStatus = () => {
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

  return (
    <div className="flex items-end gap-3">
      <div className="flex flex-col justify-space-between align-space-between">
        <img src={batteryIcons.pilabolt} alt="bolt" className="h-7" />
        <span className="text-base h-6 text-white">{time}</span>
      </div>

      <div className="flex items-end gap-1">
        {levels.map((lvl, i) => (
          <img
            key={i}
            src={lvl === "full" ? batteryIcons.pila : batteryIcons.pilaempty}
            alt={lvl}
            className="w-7 h-13"
          />
        ))}
      </div>
    </div>
  );
};
