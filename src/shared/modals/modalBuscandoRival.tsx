import { motion } from "framer-motion";

export const ModalBuscandoRival = () => {
    // Configuraciones de giro para cada reloj
    const relojConfigs = [
        { duration: 2, delay: 0 },
        { duration: 2.5, delay: 0.3 },
        { duration: 3, delay: 0.6 },
    ];

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="bg-[#484848] text-white rounded-lg p-6 w-[400px] max-w-full">
                <div className="mt-4 text-center flex flex-col items-center gap-4">

                    {/* Tierra */}
                    <i className="ri-earth-fill text-[#00F0FF] text-5xl"></i>

                    <p className="text-3xl text-[#00F0FF]">Buscando rival</p>
                    {/* Tres relojes de arena */}
                    <div className="flex space-x-4 mt-2">
                        {relojConfigs.map((config, i) => (
                            <motion.div
                                key={i}
                                animate={{ rotate: 360 }}
                                transition={{
                                    repeat: Infinity,
                                    duration: config.duration,
                                    ease: "linear",
                                    repeatType: "loop",
                                    delay: config.delay,
                                }}
                            >
                                <i className="ri-hourglass-fill text-[#00F0FF] text-3xl animate-spin"></i>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
