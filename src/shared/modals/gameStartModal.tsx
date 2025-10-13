import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export const GameStartModal = ({ onFinish }: { onFinish: () => void }) => {
    const [count, setCount] = useState(3)

    useEffect(() => {
        if (count === 0) {
            const timeout = setTimeout(() => onFinish(), 500) // espera medio segundo antes de cerrar
            return () => clearTimeout(timeout)
        }

        const timer = setTimeout(() => setCount((prev) => prev - 1), 1000)
        return () => clearTimeout(timer)
    }, [count, onFinish])

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="bg-[#000D1E] rounded-2xl p-8 w-[400px] max-w-full border border-white text-center">
                <p className="text-2xl text-[#00F4FF] mb-4">La partida comienza en...</p>

                <div className="flex justify-center items-center h-32">
                    <AnimatePresence mode="wait">
                        {count > 0 ? (
                            <motion.span
                                key={count}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-[6rem] font-bold text-white"
                            >
                                {count}
                            </motion.span>
                        ) : (
                            <motion.span
                                key="go"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1.2, opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="text-[5rem] font-bold text-[#00F4FF]"
                            >
                                ¡YA!
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}