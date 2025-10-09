import { useState } from "react"
import { TabPanel } from "../../components/perfil/components/tab"
import { ProfileSection } from "../../components/perfil/sections/profileSection";
import { AmigosSection } from "../../components/perfil/sections/amigosSection";
import { AjustesSection } from "../../components/perfil/sections/ajustesSection";
import { useNavigate } from "react-router-dom";
import { ButtonReglas } from "../../shared/buttons/buttonReglas";

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

            <ButtonReglas
                onClick={() => navigate("/reglas")}
            />
        </div>
    );
};