import { UserInfoSection } from "../components/userInfo"

// Acá se pasaría mediante props el usuario con sesión activa
export const ProfileSection = () => {
    return (
        <>
            <UserInfoSection
                username={"usuario123"}
                email={"usuario123@gmail.com"}
                partidas={23}
                puntuacion={159}
            />
        </>
    )
}