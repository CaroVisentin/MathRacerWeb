import { useState } from "react"
import { TabPanel } from "../../components/perfil/components/tab"
import { ProfileSection } from "../../components/perfil/sections/profileSection";
import { AmigosSection } from "../../components/perfil/sections/amigosSection";
import { AjustesSection } from "../../components/perfil/sections/ajustesSection";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export const PerfilPage = () => {
    const [seccionActiva, setSeccionActiva] = useState<"perfil" | "amigos" | "ajustes">("perfil");
    const navigate = useNavigate();

    return (
        <div className="bg-black mb-2">
            <TabPanel seccionActiva={seccionActiva} setSeccionActiva={setSeccionActiva} />

            {seccionActiva === "perfil" && (
                <ProfileSection />
            )}

            {seccionActiva === "amigos" && (
                <AmigosSection />
            )}

            {seccionActiva === "ajustes" && (
                <AjustesSection />
            )}

            <div className="flex justify-end w-full px-6 py-4 mb-8">
                <button
                    className="border border-cyan-400 p-2 rounded text-cyan-400 hover:text-[#f95ec8] transition"
                    onClick={() => navigate("/reglas")}
                >
                    <FontAwesomeIcon icon={faQuestion} />
                </button>
            </div>
        </div>
    );
};