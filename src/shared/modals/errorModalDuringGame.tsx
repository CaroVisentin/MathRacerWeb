import React from "react";

interface ErrorModalDuringGameProps {
    title: string;
    message: string;
    onClose: () => void;
}

const ErrorModalDuringGame: React.FC<ErrorModalDuringGameProps> = ({ title, message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-[999]">
            <div className="relative bg-black/80 text-[#5df9f9] p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                {/* Botón X arriba a la derecha */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-red-500 text-2xl font-bold"
                >
                    ×
                </button>

                <h2 className="text-3xl text-[#f95ec8] mb-6 drop-shadow-[0_0_10px_#00ffff]">
                    {title}
                </h2>

                <p className="text-xl mb-8">{message}</p>
            </div>
        </div>
    );
};


export default ErrorModalDuringGame;