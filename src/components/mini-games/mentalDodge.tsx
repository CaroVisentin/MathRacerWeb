"use client";
import { useEffect, useState } from "react";

export default function MentalDodge({ level = 1 }) {
    const [lanes, setLanes] = useState<number[]>([]);
    const [freeLanes, setFreeLanes] = useState(0);

    useEffect(() => {
        const amount = 2 + level * 2;
        const obstacles = [];

        for (let i = 0; i < amount; i++) {
            const lane = Math.floor(Math.random() * 3); // 0 = arriba, 1 = medio, 2 = abajo
            obstacles.push(lane);
        }

        setLanes(obstacles);

        const counts = [0, 0, 0];
        obstacles.forEach((l) => counts[l]++);

        const free = counts.filter((c) => c === 0).length;
        setFreeLanes(free);
    }, [level]);

    const options = shuffle([
        freeLanes,
        Math.max(0, freeLanes - 1),
        freeLanes + 1,
    ]);

    return (
        <div className="p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Esquiva mental</h2>

            <div className="flex gap-2 mb-6">
                {lanes.map((l, i) => (
                    <div
                        key={i}
                        className="h-20 w-12 flex justify-center items-center text-3xl"
                    >
                        {l === 0 && "🟠"}
                        {l === 1 && "🟠"}
                        {l === 2 && "🟠"}
                    </div>
                ))}
            </div>

            <p className="mb-3">¿Cuántos carriles estaban libres?</p>

            <div className="flex gap-4">
                {options.map((o) => (
                    <button
                        key={o}
                        onClick={() => alert(o === freeLanes ? "¡Correcto!" : "Incorrecto")}
                        className="px-6 py-3 border rounded-lg bg-white text-lg font-bold"
                    >
                        {o}
                    </button>
                ))}
            </div>
        </div>
    );
}

function shuffle<T>(arr: T[]) {
    return [...arr].sort(() => Math.random() - 0.5);
}
