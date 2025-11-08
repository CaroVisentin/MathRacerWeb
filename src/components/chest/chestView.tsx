import React from "react";

interface ChestViewProps {
    isChestOpen: boolean;
    setIsChestOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setRewards: React.Dispatch<React.SetStateAction<boolean>>;
    cofre: string;
    cofreAbierto: string;
}

export const ChestView: React.FC<ChestViewProps> = ({
    isChestOpen, setIsChestOpen, setRewards, cofre, cofreAbierto
}) => {
    return (
        <>
            <img
                src={isChestOpen ? cofreAbierto : cofre}
                alt="Cofre"
                className="w-70 h-70 object-contain"
            />

            <button
                className="bg-[#0F7079] border-2 border-white rounded-lg text-3xl transition w-32 h-12 text-white"
                onClick={() => {
                    if (isChestOpen) {
                        setRewards(true);
                    } else {
                        setIsChestOpen(true);
                    }
                }}
            >
                {isChestOpen ? "Siguiente" : "Abrir"}
            </button>
        </>
    );
};
