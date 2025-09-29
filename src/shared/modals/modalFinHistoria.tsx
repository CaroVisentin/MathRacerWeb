import React from "react";
import coinImg from "../../assets/images/coin.png";
import carImg from "../../assets/images/auto.png";

interface ModalFinHistoriaProps {
    nivel: number;
    recompensa: number;
    gano: boolean;
    onClose: () => void;
    onNext: () => void;
}

export const ModalFinHistoria: React.FC<ModalFinHistoriaProps> = ({
    nivel,
    recompensa,
    gano,
    onClose,
    onNext,
}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="bg-[#484848] text-white rounded-lg p-6 w-[400px] max-w-full">
                {/* Nivel */}
                <div className="mt-4 text-center">
                    <span className="inline-block bg-[#5C7339] text-white px-6 rounded text-lg">
                        Nivel {nivel}
                    </span>
                </div>

                {/* Título */}
                <h2
                    className={`text-center text-5xl ${gano ? "text-[#A6FF00]" : "text-[#FB2828]"
                        }`}
                >
                    {gano ? "¡GANASTE!" : "¡PERDISTE!"}
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

                    <p className="mt-4 text-xl">Recompensa obtenida</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                        <img src={coinImg} alt="moneda" className="w-6 h-6" />
                        <span className="text-4xl">{recompensa}</span>
                    </div>
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