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
            <div className="relative flex flex-col gap-3 bg-neutral-900/90 text-white p-8 rounded-lg shadow-lg w-full max-w-md text-center border-2 border-[#5df9f9]">

             

                {/* Título */}
                <h2 className="text-3xl text-[#00f0ff] drop-shadow-[0_0_10px_#00f0ff]">
                    {title}
                </h2>

                {/* Mensaje */}
                <p className="text-xl">{message}</p>

                {/* Botones */}
                <div className="flex justify-center gap-6">
                    <button
                        onClick={onCancel}
                        className="bg-[#2C2C2C] hover:bg-[#3C3C3C] text-white text-xl border-2 border-white px-3 py-1
                tracking-wider transition-all duration-300 
                 shadow-[0_0_10px_rgba(0,217,255,0.3)] 
                 hover:shadow-[0_0_20px_rgba(0,217,255,0.6)]
                 disabled:opacity-50"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={onConfirm}
                        className="bg-[#00f0ff] text-black text-xl border-2 border-white px-3 py-1
                tracking-wider transition-all duration-300 
                 hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.3)] 
                 hover:shadow-[0_0_20px_rgba(0,217,255,0.6)]
                 disabled:opacity-50"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmActionModal;