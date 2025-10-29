import React from "react";

interface ErrorConnectionProps {
  message: string;
  
  onClose: () => void;
}

const ErrorConnection: React.FC<ErrorConnectionProps> = ({ message,  onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-black/90 text-[#5df9f9] p-8 rounded-lg shadow-lg w-full max-w-md text-center font-audiowide">
        <h2 className="text-3xl text-[#f95ec8] mb-6 drop-shadow-[0_0_10px_#00ffff]">Error de Conexión</h2>
        <p className="text-xl mb-8">{message}</p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-[#5df9f9] text-black font-extralight hover:bg-red-700 w-32 py-3 rounded text-xl hover:drop-shadow-[0_0_10px_#00ffff]"
          >
            Cerrar
          </button>
          {/* <button
            onClick={onRetry}
            className="bg-[#5df9f9] text-black font-extralight hover:bg-[#f95ec8] w-32 py-3 rounded text-xl hover:drop-shadow-[0_0_10px_#00ffff]"
          >
            Reintentar
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ErrorConnection;