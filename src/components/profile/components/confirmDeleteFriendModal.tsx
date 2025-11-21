interface ConfirmModalProps {
  show: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({ show, message, onConfirm, onCancel }: ConfirmModalProps) => {
  if (!show) return null;

 return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded shadow-lg text-center w-80">
        <p className="text-xl pb-3">{message}</p>
        <div className="flex justify-around mt-4">
          <button
            onClick={onConfirm}
           className="bg-red-500 text-white border-2 border-white px-6 py-2
          text-lg tracking-wider transition-all duration-300 
          hover:bg-red-400 
          hover:shadow-[0_0_5px_rgba(255,255,255,0.6)]"
          >
            Eliminar
          </button>

          <button
            onClick={onCancel}
            className="bg-gray-600 text-white border-2 border-white px-6 py-2
          text-lg tracking-wider transition-all duration-300 
          hover:bg-gray-700 
          hover:shadow-[0_0_5px_rgba(255,255,255,0.6)]"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};