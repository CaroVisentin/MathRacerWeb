import { useState } from "react";
import { AudioControls } from "../components/soundControl";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../../shared/modals/confirmModal";
import { deleteAccount } from "../../../services/player/playerService";
import ErrorModal from "../../../shared/modals/errorModal";

export const AjustesSection = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      await logout();
      navigate("/register");
    } catch (error) {
      console.error("Error al eliminar cuenta:", error);
      setErrorMessage("No se pudo eliminar la cuenta. Inténtalo de nuevo.");
      setShowDeleteModal(false);
      setShowErrorModal(true);
    }
  };

  return (
    <div className="w-full text-white flex flex-col items-center bg-[#1a0a2e] gap-6 px-6 pt-8 mt-20">
      {/* Sección de sonido separada */}
      <AudioControls />

      {/* Botones de cuenta */}
      <div className="flex flex-col items-center gap-4 mt-10 mb-10">
        <p className="text-2xl">Cuenta</p>
        <button
          className="bg-[#1a0a2e] text-white border-2 border-white px-8 py-2 rounded text-xl tracking-wider transition-all duration-300 hover:bg-white hover:text-black"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>

        <button 
          className="bg-[#1a0a2e] border-2 border-red-600 text-red-600 px-8 py-2 rounded text-xl tracking-wider transition-all duration-300 hover:bg-red-600 hover:text-white"
          onClick={() => setShowDeleteModal(true)}
        >
          Eliminar cuenta
        </button>
      </div>

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <ConfirmModal
          title="Eliminar cuenta"
          message="¿Estás seguro que querés eliminar tu cuenta? Esta acción no se puede deshacer."
          confirmText="Eliminar"
          cancelText="Cancelar"
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {/* Modal de error */}
      {showErrorModal && (
        <ErrorModal
          message={errorMessage}
          onClose={() => setShowErrorModal(false)} title={""}        />
      )}
    </div>
  );
};
