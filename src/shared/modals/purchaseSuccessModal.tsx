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
      <div className="relative bg-black/90 text-[#5df9f9] p-8 rounded-lg shadow-lg w-full max-w-md text-center border-2 border-[#5df9f9]">
        {/* Botón X */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#5df9f9] text-2xl font-bold"
          aria-label="Cerrar"
        >
          ×
        </button>

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
              className="bg-[#5df9f9] text-black w-40 py-2 rounded text-xl hover:drop-shadow-[0_0_10px_#00ffff] transition border border-white"
            >
              Ir al Garage
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-transparent text-white w-32 py-2 rounded text-xl hover:bg-white/10 transition border border-white"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessModal;
