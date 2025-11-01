import { usePlayer } from "../../../hooks/usePlayer";
import { UserInfoSection } from "../components/userInfo"


// Acá se pasaría mediante props el usuario con sesión activa
export const ProfileSection = () => {

  const { player } = usePlayer();


    if (!player) {
        return (
        <div className="text-black h-screen flex items-center justify-center">
            Cargando perfil...
        </div>
        );
    }
    if (!player) {
        return (
        <div className="text-black h-screen flex items-center justify-center">

            No se pudo cargar el perfil
        </div>
        );
    }
    return (
        <>
            <UserInfoSection
                username={player.name}
                email={player.email}
                partidas={player.points}
                puntuacion={player .points}
            />
        </>
    )
}