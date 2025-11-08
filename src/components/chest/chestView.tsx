import React from "react";

interface ChestViewProps {
    title?: string;
    firstMessage?: string;
    secondMessage?: string;
    isChestOpen: boolean;
    setIsChestOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setRewards: React.Dispatch<React.SetStateAction<boolean>>;
    cofre: string;
    cofreAbierto: string;
}

export const ChestView: React.FC<ChestViewProps> = ({
    isChestOpen,
    setIsChestOpen,
    setRewards,
    cofre,
    cofreAbierto,
    title,
    firstMessage,
    secondMessage
}) => {
    const handleOpenChest = () => {
        if (!isChestOpen) {
            setIsChestOpen(true);

            // Mostrar recompensas después de un pequeño delay
            setTimeout(() => {
                setRewards(true);
            }, 200);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center text-center text-white space-y-6">
            {/* Título y mensaje principal */}
            <div className="text-white ">
                <p className="mb-2 text-3xl">{title}</p>
                <p className="text-xl">{firstMessage}</p>
            </div>

            {/* Imagen del cofre */}
            <img
                src={isChestOpen ? cofreAbierto : cofre}
                alt="Cofre"
                className={`w-64 h-64 object-contain mx-auto transition-transform duration-500 ${isChestOpen ? "transform -rotate-6" : ""}`}
                onClick={handleOpenChest}
            />

            {/* Mensaje secundario (solo si el cofre NO está abierto) */}
            {!isChestOpen && (
                <>
                    <p className="text-gray-300 italic !mb-5">{secondMessage}</p>

                    {/* Botón para abrir el cofre */}
                    <button
                        className="bg-[#0F7079] border-2 border-white rounded-lg text-2xl transition w-40 h-12 text-white hover:bg-[#13909B]"
                        onClick={handleOpenChest}
                    >
                        Continuar
                    </button>
                </>
            )}
        </div>
    );
};
