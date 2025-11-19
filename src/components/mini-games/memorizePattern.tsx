"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import cone from "../../assets/images/cone.png";
import barrier from "../../assets/images/obstacle.png";
import oil from "../../assets/images/mini-games/memory-pattern/oil.png";
import fuel from "../../assets/images/mini-games/memory-pattern/gas.png";
import tire from "../../assets/images/mini-games/memory-pattern/tire.png";
import calculator from "../../assets/images/mini-games/memory-pattern/calculator.png";
import ruler from "../../assets/images/mini-games/memory-pattern/rule.png";
import question from "../../assets/images/mini-games/memory-pattern/question.png";
import multiply from "../../assets/images/mini-games/memory-pattern/multiply.png";
import pi from "../../assets/images/mini-games/memory-pattern/pi.png";
import mathiPensando from "../../assets/images/mathi-pensando.png";

const ITEMS = [
    { id: "cone", emoji: <img src={cone} className="w-12" /> },
    { id: "barrier", emoji: <img src={barrier} className="w-12" /> },
    { id: "oil", emoji: <img src={oil} className="w-12" /> },
    { id: "tire", emoji: <img src={tire} className="w-12" /> },
    { id: "calculator", emoji: <img src={calculator} className="w-12" /> },
    { id: "fuel", emoji: <img src={fuel} className="w-12" /> },
    { id: "pi", emoji: <img src={pi} className="w-12" /> },
    { id: "multiply", emoji: <img src={multiply} className="w-12" /> },
    { id: "question", emoji: <img src={question} className="w-12" /> },
    { id: "ruler", emoji: <img src={ruler} className="w-12" /> },
];

export default function MemoryPattern({ level = 1 }) {
    const [pattern, setPattern] = useState<string[]>([]);
    const [player, setPlayer] = useState<string[]>([]);
    const [showPattern, setShowPattern] = useState(true);
    const [showMathi, setShowMathi] = useState(false);
    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
        const amount = 2 + level;
        const seq: string[] = [];
        for (let i = 0; i < amount; i++) {
            seq.push(ITEMS[Math.floor(Math.random() * ITEMS.length)].id);
        }
        setPattern(seq);

        setTimeout(() => {
            setShowPattern(false);
            setShowMathi(true);
            setShowButtons(true);
        }, 2000);
    }, [level]);

    const uniquePatternItems = Array.from(new Set(pattern));

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
            <div className="bg-[#1e1e1e] text-white shadow-lg p-6 w-full max-w-3xl rounded-lg flex flex-col items-center">

                <h2 className="text-2xl mb-4">Memoriza el patrón</h2>

                {/* Contenedor principal con fondo y borde */}
                <div className="relative h-64 w-full overflow-hidden border border-gray-700 rounded-lg mb-4 flex items-center justify-center">

                    {/* Mostrar patrón */}
                    {showPattern && (
                        <div className="flex gap-4">
                            {pattern.map((p, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.5 }}
                                >
                                    {ITEMS.find((x) => x.id === p)?.emoji}
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Mathi aparece */}
                    {showMathi && showButtons && (
                        <motion.img
                            src={mathiPensando}
                            alt="Mathi pensando"
                            className="h-36 w-auto"
                        />
                    )}
                </div>

                {/* Botones de respuesta */}
                {showButtons && (
                    <div className="!mt-4 flex gap-3 flex-wrap justify-center">
                        {uniquePatternItems.map((id) => {
                            const item = ITEMS.find((x) => x.id === id);
                            return (
                                <button
                                    key={id}
                                    onClick={() => {
                                        const updated = [...player, id];
                                        setPlayer(updated);

                                        if (updated.length === pattern.length) {
                                            const ok =
                                                JSON.stringify(updated) === JSON.stringify(pattern);

                                            setTimeout(() => {
                                                alert(ok ? "¡Correcto!" : "Incorrecto");
                                            }, 200);
                                        }
                                    }}
                                    className="p-3 border bg-[#0F7079] text-white rounded-lg shadow-md hover:scale-105 transition-transform"
                                >
                                    {item?.emoji}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Mostrar secuencia seleccionada */}
                {player.length > 0 && (
                    <div className="flex flex-wrap gap-4 justify-center max-w-full !mt-4 px-4">
                        {player.map((p, i) => (
                            <div key={i} className="text-3xl">
                                {ITEMS.find((x) => x.id === p)?.emoji}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
