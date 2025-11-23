import React from "react";

interface ConfirmModalProps {
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    title,
    message,
    confirmText,
    cancelText,
    onConfirm,
    onCancel
}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-[999]">
            <div className="relative bg-black/90 text-[#5df9f9] p-8 rounded-lg shadow-lg w-full max-w-md text-center border-2 border-[#5df9f9]">
                <h2 className="text-3xl text-[#f95ec8] mb-6 drop-shadow-[0_0_10px_#00ffff]">
                    {title}
                </h2>

                <p className="text-xl mb-8">{message}</p>

                <div className="flex gap-4 justify-center">
                    <button
                        onClick={onCancel}
                        className="bg-[#2C2C2C] text-white hover:bg-[#3C3C3C] px-6 py-2 rounded text-xl transition border-2 border-white"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        className="bg-[#5df9f9] text-black hover:bg-[#4de8e8] px-6 py-2 rounded text-xl hover:drop-shadow-[0_0_10px_#00ffff] transition font-bold"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
