import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import red from "../../assets/images/mini-games/last-color-car/sports_red.png";
import green from "../../assets/images/mini-games/last-color-car/sports_green.png";
import yellow from "../../assets/images/mini-games/last-color-car/sports_yellow.png";
import blue from "../../assets/images/mini-games/last-color-car/sports_blue.png";
import orange from "../../assets/images/mini-games/last-color-car/sports_orange.png";
import purple from "../../assets/images/mini-games/last-color-car/sports_purple.png";
import mathiPensando from "../../assets/images/mathi-pensando.png";

const CAR_IMAGES: Record<string, string> = {
    red,
    blue,
    yellow,
    green,
    orange,
    purple,
};

const COLORS = Object.keys(CAR_IMAGES);

export default function LastColor({ level = 1 }) {
    const [cars, setCars] = useState<string[]>([]);
    const [correct, setCorrect] = useState<string>("");
    const [showOptions, setShowOptions] = useState(false);
    const [showMathi, setShowMathi] = useState(false);

    useEffect(() => {
        const count = Math.min(Math.floor(4 + level * 1.5), 15);
        const sequence: string[] = [];

        for (let i = 0; i < count; i++) sequence.push(randomColor());

        setCars(sequence);
        setCorrect(sequence[sequence.length - 1]);

        const totalTime = count * 600 + 1500;
        setTimeout(() => setShowMathi(true), totalTime - 800);
        setTimeout(() => setShowOptions(true), totalTime);
    }, [level]);

    const OPTIONS_COUNT = Math.min(level + 3, COLORS.length);
    const options = generateOptions(correct, OPTIONS_COUNT);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
            <div className="bg-[#1e1e1e] text-white shadow-lg p-6 w-full max-w-3xl rounded-lg flex flex-col items-center">

                <h2 className="text-2xl mb-4">
                    ¿Cuál fue el último auto? (Nivel {level})
                </h2>

                {/* Área de animación más horizontal */}
                <div className="relative h-60 w-full overflow-hidden border border-gray-700 rounded-lg mb-4 flex items-center justify-center">

                    {!showMathi &&
                        cars.map((color, i) => (
                            <motion.img
                                key={i}
                                src={CAR_IMAGES[color]}
                                alt={color}
                                initial={getInitialPosition(i)}
                                animate={{ x: 0, y: 0, scale: 0.9, opacity: 0.9 }}
                                transition={{
                                    delay: i * 0.6,
                                    duration: 1.5,
                                    type: "spring",
                                }}
                                className="absolute h-14 w-28 object-contain pointer-events-none select-none"
                            />
                        ))}

                    {showOptions && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.img
                                src={mathiPensando}
                                alt="Mathi pensando"
                                className="h-36 w-auto"
                            />
                        </div>
                    )}
                </div>

                {showOptions && (
                    <div className="!mt-4 flex gap-4 flex-wrap justify-center">
                        {options.map((o) => (
                            <button
                                key={o}
                                onClick={() => alert(o === correct ? "¡Correcto!" : "Incorrecto")}
                                className="px-6 py-3 border bg-[#0F7079] text-white text-lg shadow-md hover:scale-105 transition-transform"
                            >
                                <img src={CAR_IMAGES[o]} alt={o} className="h-14 w-28 object-contain" />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

}

function getInitialPosition(index: number) {
    const positions = [
        { x: -400, y: 0 }, // izquierda
        { x: 400, y: 0 }, // derecha
        { x: 0, y: -300 }, // arriba
        { x: 0, y: 300 }, // abajo
        { x: -350, y: -250 }, // diagonal sup izq
        { x: 350, y: -250 }, // diagonal sup der
        { x: -350, y: 250 }, // diagonal inf izq
        { x: 350, y: 250 }, // diagonal inf der
    ];
    return positions[index % positions.length];
}

function randomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function generateOptions(correct: string, count: number) {
    const available = COLORS.filter((c) => c !== correct);
    const selected: string[] = [];

    while (selected.length < count - 1 && available.length > 0) {
        const randomIndex = Math.floor(Math.random() * available.length);
        selected.push(available[randomIndex]);
        available.splice(randomIndex, 1);
    }

    return shuffle([correct, ...selected]);
}

function shuffle<T>(arr: T[]) {
    return [...arr].sort(() => Math.random() - 0.5);
}
