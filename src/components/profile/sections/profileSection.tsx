import { useHomeData } from "../../../hooks/useHomeData";
import { usePlayer } from "../../../hooks/usePlayer";
import { UserInfoSection } from "../components/userInfo";

export const ProfileSection = () => {
  const { player } = usePlayer();
  const { homeData } = useHomeData();

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
        lastLevel={player.lastLevelId ?? 0}
        puntuacion={player.points}
        backgroundUrl={homeData?.activeItems.background.imageUrl}
        avatarUrlId={homeData?.activeItems.profile.imageUrl}
      />
    </>
  );
};
