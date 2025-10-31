import { usePlayer } from "../../../contexts/playerContext";
import { UserInfoSection } from "../components/userInfo"


// Acá se pasaría mediante props el usuario con sesión activa
export const ProfileSection = () => {

  const { profile, loading: profileLoading } = usePlayer();
    if (profileLoading) {   
        return (
        <div className="text-black h-screen flex items-center justify-center">
            Cargando perfil...
        </div>
        );
    }
    if (!profile) {
        return (
        <div className="text-black h-screen flex items-center justify-center">

            No se pudo cargar el perfil
        </div>
        );
    }
    return (
        <>
            <UserInfoSection
                username={profile.name}
                email={profile.email}
                partidas={profile.points}
                puntuacion={profile.points}
            />
        </>
    )
}