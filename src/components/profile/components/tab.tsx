import React from "react";
import { BackButton } from "../../../shared/buttons/backButton";

interface TabPanelProps {
    activeSection: "perfil" | "amigos" | "ajustes";
    setActiveSection: React.Dispatch<
        React.SetStateAction<"perfil" | "amigos" | "ajustes">
    >;
}

export const TabPanel = ({ activeSection, setActiveSection }: TabPanelProps) => {
   // const navigate = useNavigate();
    const tabs: { label: string; key: "perfil" | "amigos" | "ajustes" }[] = [
        { label: "Perfil", key: "perfil" },
        { label: "Amigos", key: "amigos" },
        { label: "Ajustes", key: "ajustes" },
    ];

    return (
        <div className="w-full flex items-center justify-between  mb-8 ">
            <div className="pt-4 pl-4 hover:scale-105 transition-transform duration-200 cursor-pointer hover:drop-shadow-2xl">
            <BackButton/>
            
            </div>

            {/* Tabs */}
            <div className="flex gap-6 justify-center pt-2 flex-2">
                {tabs.map((tab) => (
                    <span
                        key={tab.key}
                        onClick={() => setActiveSection(tab.key)}
                        className={`text-4xl cursor-pointer px-4 py-2 rounded hover:drop-shadow-[0_0_5px_#00ffff] hover:scale-125 transition-colors duration-300 ${activeSection === tab.key ? "text-[#f95ec8] bg-[#f95ec829]" : "text-[#00f0ff] bg-[#00f0ff29]"
                            }`}
                    >
                        {tab.label}

                    </span>
                ))}
               
            </div>
            

            {/* Placeholder para mantener centrado */}
            <div/>

        </div >
    );
};
