"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import cone from "../../assets/images/cone.png";
import mathiPensando from "../../assets/images/mathi-pensando.png";

type Cone = {
    id: number;
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    delay: number;
    duration: number;
};

export default function CountCones({ level = 1 }: { level?: number }) {
    const [cones, setCones] = useState<Cone[]>([]);
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        const min = 3 + level;
        const max = 4 + level;
        const total = Math.floor(Math.random() * (max - min + 1)) + min;

        setCorrectAnswer(total);

        const generated: Cone[] = [];
        for (let i = 0; i < total; i++) {
            const movement = generateConeMovement();
            generated.push({
                id: i,
                ...movement,
                delay: i * 0.4,
                duration: Math.max(2 - level * 0.1, 1.2),
            });
        }
        setCones(generated);

        setTimeout(() => setShowOptions(true), 3000);
    }, [level]);

    const options = shuffle([
        correctAnswer,
        correctAnswer + 1,
        Math.max(1, correctAnswer - 1),
    ]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
            {/* Modal content */}
            <div className="bg-[#1e1e1e] text-white shadow-lg p-6 w-full max-w-lg flex flex-col items-center">

                <h2 className="text-2xl !mb-4">
                    ¿Cuántos conos viste?
                </h2>

                <div className="relative h-80 w-full overflow-hidden border border-gray-700 !m-4">
                    {cones.map((c) => (
                        <motion.img
                            key={c.id}
                            src={cone}
                            initial={{ x: c.fromX, y: c.fromY }}
                            animate={{ x: c.toX, y: c.toY }}
                            transition={{ duration: c.duration, delay: c.delay, ease: "easeInOut" }}
                            className="absolute w-12 pointer-events-none select-none"
                        />
                    ))}

                    {showOptions && (
                        <div className="absolute inset-0 flex items-center justify-center !m-2">
                            <motion.div transition={{ duration: 2.5, ease: "easeInOut" }}>
                                <img src={mathiPensando} className="w-30" alt="Mathi pensando" />
                            </motion.div>
                        </div>
                    )}

                </div>

                {showOptions && (
                    <div className="mt-6 flex gap-4">
                        {options.map((o) => (
                            <button
                                key={o}
                                onClick={() =>
                                    alert(o === correctAnswer ? "¡Correcto!" : "Incorrecto")
                                }
                                className="px-6 py-3 border bg-[#0F7079] text-white text-xl shadow-md"
                            >
                                {o}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// ===== Helpers =====
function generateConeMovement(): Pick<Cone, "fromX" | "fromY" | "toX" | "toY"> {
    const screenW = 500;
    const screenH = 300;
    const type = Math.floor(Math.random() * 3);

    switch (type) {
        case 0:
            return {
                fromX: -50,
                fromY: rand(40, screenH - 40),
                toX: screenW,
                toY: rand(40, screenH - 40),
            };

        case 1:
            return {
                fromX: screenW,
                fromY: rand(40, screenH - 40),
                toX: -50,
                toY: rand(40, screenH - 40),
            };

        case 2: {
            // 🔹 Se abren llaves para encapsular la declaración
            const fromLeft = Math.random() < 0.5;
            return fromLeft
                ? {
                    fromX: -50,
                    fromY: rand(40, screenH - 40),
                    toX: screenW,
                    toY: rand(20, screenH - 20),
                }
                : {
                    fromX: screenW,
                    fromY: rand(40, screenH - 40),
                    toX: -50,
                    toY: rand(20, screenH - 20),
                };
        }

        default:
            return {
                fromX: -50,
                fromY: screenH / 2,
                toX: screenW,
                toY: screenH / 2,
            };
    }
}

function rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: T[]) {
    return [...arr].sort(() => Math.random() - 0.5);
}
