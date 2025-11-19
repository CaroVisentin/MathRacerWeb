"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const COLORS = ["red", "blue", "yellow", "green", "orange", "purple"];

export default function LastColor({ level = 1 }) {
    const [cars, setCars] = useState<string[]>([]);
    const [correct, setCorrect] = useState<string>("");
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        const count = 2 + level; // dificultad progresiva
        const sequence: string[] = [];

        for (let i = 0; i < count; i++) {
            const color = COLORS[Math.floor(Math.random() * COLORS.length)];
            sequence.push(color);
        }

        setCars(sequence);
        setCorrect(sequence[sequence.length - 1]);

        setTimeout(() => setShowOptions(true), 3500);
    }, [level]);

    const options = shuffle([
        correct,
        randomColor(),
        randomColor(),
    ]);

    return (
        <div className="flex flex-col items-center p-6">
            <h2 className="text-xl font-bold mb-4">¿Cuál fue el último color?</h2>

            <div className="relative h-56 w-full overflow-hidden bg-gray-100 rounded-lg">
                {cars.map((color, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: -100 }}
                        animate={{ x: 600 }}
                        transition={{ delay: i * 0.5, duration: 1.2 }}
                        className="absolute h-10 w-20 rounded-md shadow-md"
                        style={{ backgroundColor: color, top: 60 + i * 20 }}
                    />
                ))}
            </div>

            {showOptions && (
                <div className="mt-6 flex gap-4">
                    {options.map((o) => (
                        <button
                            key={o}
                            onClick={() => alert(o === correct ? "¡Correcto!" : "Incorrecto")}
                            className="px-6 py-3 border rounded-lg bg-white text-lg font-bold"
                        >
                            {o}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

function randomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function shuffle<T>(arr: T[]) {
    return [...arr].sort(() => Math.random() - 0.5);
}
