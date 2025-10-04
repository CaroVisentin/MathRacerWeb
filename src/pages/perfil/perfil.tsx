import { useState } from "react"
import { TabPanel } from "../../components/perfil/components/tab"
import { ProfileSection } from "../../components/perfil/sections/profileSection";
import { AmigosSection } from "../../components/perfil/sections/amigosSection";
import { AjustesSection } from "../../components/perfil/sections/ajustesSection";

export const PerfilPage = () => {
    const [seccionActiva, setSeccionActiva] = useState<"perfil" | "amigos" | "ajustes">("perfil");

    return (
        <div className="bg-black">
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
        </div>
    );
};