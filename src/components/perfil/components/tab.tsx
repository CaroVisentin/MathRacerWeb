import React from "react";
import { BackButton } from "../../../shared/buttons/backButton";
import { useNavigate } from "react-router-dom";

interface TabPanelProps {
    seccionActiva: "perfil" | "amigos" | "ajustes";
    setSeccionActiva: React.Dispatch<
        React.SetStateAction<"perfil" | "amigos" | "ajustes">
    >;
}

export const TabPanel = ({ seccionActiva, setSeccionActiva }: TabPanelProps) => {
    const navigate = useNavigate();
    const tabs: { label: string; key: "perfil" | "amigos" | "ajustes" }[] = [
        { label: "Perfil", key: "perfil" },
        { label: "Amigos", key: "amigos" },
        { label: "Ajustes", key: "ajustes" },
    ];

    return (
        <div className="w-full flex items-center justify-between mb-8">
            <BackButton
                onClick={() => navigate(-1)}
            />

            {/* Tabs */}
            <div className="flex gap-6">
                {tabs.map((tab) => (
                    <span
                        key={tab.key}
                        onClick={() => setSeccionActiva(tab.key)}
                        className={`text-2xl cursor-pointer px-4 py-2 rounded transition-colors duration-300 ${seccionActiva === tab.key ? "text-[#f95ec8]" : "text-[#00f0ff]"
                            }`}
                    >
                        {tab.label}
                    </span>
                ))}
            </div>

            {/* Placeholder para mantener centrado */}
            <div className="w-10" />
        </div>
    );
};
