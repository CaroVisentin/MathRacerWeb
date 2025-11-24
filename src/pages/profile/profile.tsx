import { useState } from "react";
import { TabPanel } from "../../components/profile/components/tab";
import { ProfileSection } from "../../components/profile/sections/profileSection";
import { AmigosSection } from "../../components/profile/sections/friendsSection";
import { AjustesSection } from "../../components/profile/sections/settingsSection";
import { useNavigate } from "react-router-dom";
import { RulesButton } from "../../shared/buttons/buttonReglas";
import { StarsBackground } from "../../shared/backgrounds/starBackground";


export const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState<
    "perfil" | "amigos" | "ajustes"
  >("perfil");
  const navigate = useNavigate();

  return (         

    <div className="min-h-screen w-full bg-[#1a0a2e] flex flex-col relative">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
          <StarsBackground />
        </div>
      
      <TabPanel
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="flex-1 flex flex-col items-center pb-10  overflow-y-auto">
        {activeSection === "perfil" && <ProfileSection />}

        {activeSection === "amigos" && <AmigosSection />}

        {activeSection === "ajustes" && <AjustesSection />}
      </main>

      <div className="fixed bottom-4 right-4">
        
        <RulesButton onClick={() => navigate("/reglas")} />
      </div>
    </div>
  );
};
