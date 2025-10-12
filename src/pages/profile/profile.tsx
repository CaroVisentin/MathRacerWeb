import { useState } from "react"
import { TabPanel } from "../../components/profile/components/tab"
import { ProfileSection } from "../../components/profile/sections/profileSection";
import { AmigosSection } from "../../components/profile/sections/friendsSection";
import { AjustesSection } from "../../components/profile/sections/settingsSection";
import { useNavigate } from "react-router-dom";
import { ButtonReglas } from "../../shared/buttons/buttonReglas";

export const PerfilPage = () => {
    const [activeSection, setActiveSection] = useState<"perfil" | "amigos" | "ajustes">("perfil");
    const navigate = useNavigate();

    return (
        <div className="bg-black mb-2">
            <TabPanel activeSection={activeSection} setActiveSection={setActiveSection} />

            {activeSection === "perfil" && (
                <ProfileSection />
            )}

            {activeSection === "amigos" && (
                <AmigosSection />
            )}

            {activeSection === "ajustes" && (
                <AjustesSection />
            )}

            <ButtonReglas
                onClick={() => navigate("/reglas")}
            />
        </div>
    );
};