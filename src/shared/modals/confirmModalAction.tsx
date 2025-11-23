import React from "react";

interface ConfirmActionModalProps {
    title: string;
    message: string;
    onCancel: () => void;
    onConfirm: () => void;
}

const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({
    title,
    message,
    onCancel,
    onConfirm
}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-[999]">
            <div className="relative bg-black/90 text-[#5df9f9] p-8 rounded-lg shadow-lg w-full max-w-md text-center border border-[#5df9f9]/30">

                {/* X arriba */}
                <button
                    onClick={onCancel}
                    className="absolute top-3 right-3 text-red-500 text-2xl font-bold hover:text-red-700 transition"
                >
                    ×
                </button>

                {/* Título */}
                <h2 className="text-3xl text-[#f95ec8] mb-6 drop-shadow-[0_0_10px_#f95ec8]">
                    {title}
                </h2>

                {/* Mensaje */}
                <p className="text-xl mb-8">{message}</p>

                {/* Botones */}
                <div className="flex justify-center gap-6">
                    <button
                        onClick={onCancel}
                        className="bg-[#f95ec8] text-black font-light w-32 py-2 rounded text-xl hover:bg-[#d14cae] hover:drop-shadow-[0_0_10px_#f95ec8] transition"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={onConfirm}
                        className="bg-[#5df9f9] text-black font-light w-32 py-2 rounded text-xl hover:bg-[#38d5d5] hover:drop-shadow-[0_0_10px_#5df9f9] transition"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmActionModal;