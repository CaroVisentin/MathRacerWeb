import React from "react";
import mathiImg from "../../assets/images/mathi.png";

interface PurchaseSuccessModalProps {
  title?: string;
  message?: string;
  imageSrc?: string;
  onClose: () => void;
  onGoToGarage?: () => void;
}

const PurchaseSuccessModal: React.FC<PurchaseSuccessModalProps> = ({
  title = "¡Compra exitosa!",
  message = "Tu compra fue procesada correctamente.",
  imageSrc = mathiImg,
  onClose,
  onGoToGarage,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-[999]">
      <div className="relative flex flex-col gap-3 bg-black/90 text-[#5df9f9] p-8 rounded-lg shadow-lg w-full max-w-md text-center border-2 border-[#5df9f9]">


        {/* Imagen */}
        {imageSrc && (
          <div className="flex justify-center mb-4">
            <img src={imageSrc} alt="Éxito" className="w-28 h-28 object-contain" />
          </div>
        )}

        <h2 className="text-3xl text-[#5df9f9] mb-2 drop-shadow-[0_0_10px_#00ffff]">
          {title}
        </h2>
        <p className="text-xl text-white mb-6">{message}</p>

        <div className="flex items-center justify-center gap-3">
          {onGoToGarage && (
            <button
              onClick={onGoToGarage}
              className="bg-[#00f0ff] text-black text-xl border-2 border-white px-3 py-1
                tracking-wider transition-all duration-300 
                 hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.3)] 
                 hover:shadow-[0_0_20px_rgba(0,217,255,0.6)]
                 disabled:opacity-50"            >
              Ir al Garage
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-transparent text-white text-xl border-2 border-white px-3 py-1
                tracking-wider transition-all duration-300 "
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessModal;
