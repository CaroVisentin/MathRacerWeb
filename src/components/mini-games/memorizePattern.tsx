"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ITEMS = [
    { id: "cone", emoji: "🟠" },
    { id: "car", emoji: "🚗" },
    { id: "hole", emoji: "⚫" },
];

export default function MemoryPattern({ level = 1 }) {
    const [pattern, setPattern] = useState<string[]>([]);
    const [player, setPlayer] = useState<string[]>([]);
    const [showInput, setShowInput] = useState(false);

    useEffect(() => {
        const amount = 2 + level;
        const seq: string[] = [];

        for (let i = 0; i < amount; i++) {
            const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
            seq.push(item.id);
        }

        setPattern(seq);
        setTimeout(() => setShowInput(true), amount * 900 + 500);
    }, [level]);

    return (
        <div className="flex flex-col items-center p-6">
            <h2 className="text-xl font-bold mb-4">Memoriza el patrón</h2>

            <div className="flex gap-4 mb-6">
                {pattern.map((p, i) => (
                    <motion.div
                        key={i}
                        className="text-4xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.8 }}
                    >
                        {ITEMS.find((x) => x.id === p)?.emoji}
                    </motion.div>
                ))}
            </div>

            {showInput && (
                <div className="flex gap-3">
                    {ITEMS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                const updated = [...player, item.id];
                                setPlayer(updated);

                                if (updated.length === pattern.length) {
                                    const ok = JSON.stringify(updated) === JSON.stringify(pattern);
                                    alert(ok ? "¡Correcto!" : "Incorrecto");
                                }
                            }}
                            className="text-3xl px-4 py-2 border rounded-lg bg-white"
                        >
                            {item.emoji}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
