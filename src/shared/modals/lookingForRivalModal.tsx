import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface LookingForRivalModalProps {
    playerId: string;
    setPlayerId: (id: string) => void;
    onConnection: () => void;
}

export const LookingForRivalModal: React.FC<LookingForRivalModalProps> = ({
    playerId,
    setPlayerId,
    onConnection,
}) => {
    // prevent double notify in StrictMode (if used)
    const notifiedRef = useRef(false);
    const [connecting, setConnecting] = useState(false);

    // Generar nombre aleatorio y persistirlo
    useEffect(() => {
        if (notifiedRef.current) return;
        const storedName = sessionStorage.getItem("playerName");
        if (storedName) {
            setPlayerId(storedName);
        } else {
            const randomName = `Jugador${Math.floor(Math.random() * 1000)}`;
            sessionStorage.setItem("playerName", randomName);
            setPlayerId(randomName);
        }
        notifiedRef.current = true;
    }, [setPlayerId]);

    const relojConfigs = [
        { duration: 1.5, delay: 0 },
        { duration: 1.8, delay: 0.3 },
        { duration: 2.1, delay: 0.6 },
    ];

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="bg-[#000D1E] rounded-2xl p-6 w-[400px] max-w-full border border-white">
                <div className="mt-4 text-center flex flex-col items-center gap-4">
                    {/* Tierra */}
                    <i className="ri-earth-fill text-[#00F4FF] text-5xl"></i>

                    <p className="text-3xl text-[#00F4FF]">Esperando al contrincante</p>

                    {/* <input
                        type="text"
                        value={playerId}
                        onChange={(e) => setPlayerId(e.target.value)}
                        placeholder="Tu nombre"
                        className="px-4 py-2 rounded text-white w-full"
                    /> */}

                    {/* Input oculto con nombre generado automáticamente */}
                    <input
                        type="hidden"
                        value={playerId}
                        readOnly
                    />

                    {/* Conectar button: disappears after click */}
                    {!connecting && (
                        <button
                            onClick={() => {
                                setConnecting(true);
                                onConnection?.();
                            }}
                            className="bg-[#00F4FF] text-black px-4 py-2 rounded mt-2 hover:bg-[#00d0d0]"
                        >
                            Conectar
                        </button>
                    )}

                    {/* Tres relojes animados */}
                    <div className="flex space-x-4 mt-2">
                        {relojConfigs.map((config, i) => (
                            <motion.div
                                key={i}
                                animate={{ opacity: [1, 0.2, 1] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: config.duration,
                                    ease: "easeInOut",
                                    repeatType: "loop",
                                    delay: config.delay,
                                }}
                            >
                                <i className="ri-hourglass-fill text-[#00F0FF] text-3xl"></i>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
