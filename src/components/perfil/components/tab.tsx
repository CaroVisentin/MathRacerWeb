import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface TabPanelProps {
    seccionActiva: "perfil" | "amigos" | "ajustes";
    setSeccionActiva: React.Dispatch<
        React.SetStateAction<"perfil" | "amigos" | "ajustes">
    >;
}

export const TabPanel = ({ seccionActiva, setSeccionActiva }: TabPanelProps) => {
    const tabs: { label: string; key: "perfil" | "amigos" | "ajustes" }[] = [
        { label: "Perfil", key: "perfil" },
        { label: "Amigos", key: "amigos" },
        { label: "Ajustes", key: "ajustes" },
    ];

    return (
        <div className="w-full flex items-center justify-between mb-8">
            {/* BackButton */}
            <button
                onClick={() => console.log("Volver atrás")}
                className="border-2 border-cyan-400 rounded-lg p-2 text-cyan-400 hover:bg-cyan-900 transition"
            >
                <FontAwesomeIcon icon={faArrowLeft} className="text-xl" />
            </button>

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
