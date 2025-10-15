import { batteryIcons } from "../../models/ui/home-data";

interface BatteryStatusProps {
    levels: ("full" | "empty")[];
    time: string;
}

export const BatteryStatus = ({ levels, time }: BatteryStatusProps) => (
    <div className="flex items-end gap-3">
        <div className="flex flex-col justify-space-between align-space-between">
            <img src={batteryIcons.pilabolt} alt="bolt" className="h-4" />
            <span className="text-base font-semibold h-4 text-white">{time}</span>
        </div>
        <div className="flex items-end gap-1">
            {levels.map((lvl, i) => (
                <img
                    key={i}
                    src={lvl === "full" ? batteryIcons.pila : batteryIcons.pilaempty}
                    alt={lvl}
                    className="w-4 h-8"
                />
            ))}
        </div>

    </div>
);

