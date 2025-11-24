import React from "react";
import { createPortal } from "react-dom";

interface ErrorConnectionProps {
  message: string;
  onClose: () => void;
}

const ErrorConnection: React.FC<ErrorConnectionProps> = ({ message, onClose }) => {
  if (typeof document === "undefined") {
    return null;
  }

  const modalContent = (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-[999]">
      <div className="relative bg-black/90 text-[#5df9f9] p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        {/* Botón X arriba a la derecha */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-500 text-2xl font-bold hover:drop-shadow-[0_0_10px_#f95ec8] transition"
        >
          ×
        </button>

        <h2 className="text-3xl text-[#f95ec8] mb-6 drop-shadow-[0_0_10px_#00ffff]">
          Error de Conexión
        </h2>

        <p className="text-xl mb-8">{message}</p>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ErrorConnection;
