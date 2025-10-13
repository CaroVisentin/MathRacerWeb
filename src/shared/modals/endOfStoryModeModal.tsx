import React from "react";
import coinImg from "../../assets/images/coin.png";
import carImg from "../../assets/images/auto.png";
import grayRectangle from "../../assets/images/gray-rectangle.png";
import yellowRectangle from "../../assets/images/yellow-rectangle.png";
import iconoEnergia from "../../assets/images/icono-energia.png";

interface EndOfStoryModeModalProps {
    level: number;
    reward: number;
    won: boolean;
    onClose: () => void;
    onNext: () => void;
    remainingLives: number;
}

export const EndOfStoryModeModal: React.FC<EndOfStoryModeModalProps> = ({
    level,
    reward,
    won,
    onClose,
    onNext,
    remainingLives
}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="bg-[#484848] text-white rounded-lg p-6 w-[400px] max-w-full">
                {/* Nivel */}
                <div className="mt-4 text-center">
                    <span className="inline-block bg-[#5C7339] text-white px-6 rounded text-lg">
                        Nivel {level}
                    </span>
                </div>

                {/* Título */}
                <h2
                    className={`text-center text-5xl ${won ? "text-[#A6FF00]" : "text-[#FB2828]"
                        }`}
                >
                    {won ? "¡GANASTE!" : "¡PERDISTE!"}
                </h2>

                {/* Contenido */}
                <div className="mt-4 text-center">
                    <div className="mt-4">
                        <img
                            src={carImg}
                            alt="auto"
                            className="mx-auto w-44 h-32 object-contain"
                        />
                    </div>

                    {won ? (
                        <>
                            <p className="mt-4 text-xl">Recompensa obtenida</p>
                            <div className="flex items-center justify-center gap-2 mt-2">
                                <img src={coinImg} alt="moneda" className="w-6 h-6" />
                                <span className="text-4xl">{reward}</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="mt-4 text-xl">Vida restante</p>
                            <div className="flex items-center justify-center gap-2 mt-2">
                                <img src={iconoEnergia} alt="energias" className="w-6 h-6" />
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <img
                                        key={index}
                                        src={index < remainingLives ? yellowRectangle : grayRectangle}
                                        alt="vida"
                                        className="w-6 h-9"
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Botones */}
                <div className="flex justify-between mt-6">
                    <button
                        onClick={onClose}
                        className="bg-gray-600 px-6 py-2 rounded hover:bg-gray-500"
                    >
                        Regresar
                    </button>
                    <button
                        onClick={onNext}
                        className="bg-teal-600 px-6 py-2 rounded hover:bg-teal-500"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
};