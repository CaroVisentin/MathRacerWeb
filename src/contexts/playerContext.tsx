// import React, { createContext, useContext, useEffect, useState } from 'react';
// const PlayerContext = createContext<PlayerContextValue>({
//   profile: null,
//   loading: true,
//   refreshProfile: async () => {},
// });

// export function PlayerProvider({ children }: { children: React.ReactNode }) {
//     const { user } = useAuth();
//   const [profile, setProfile] = useState<PlayerProfileDto | null>(null);
//   const [loading, setLoading] = useState(true);

//   const loadProfile = async () => {
//     if (!user?.uid) {
//       console.log("No hay UID, se usarán datos por defecto/mock");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     try {
//       console.log("UID actual:", user.uid);
//       const data = await profileService.getProfileByUid(user.uid);
//       setProfile(data);
//     } catch (error) {
//       console.error("Error al cargar el perfil:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadProfile();
//   }, [user?.uid]); 

//   return (
//     <PlayerContext.Provider value={{ profile, loading, refreshProfile: loadProfile }}>
//       {children}
//     </PlayerContext.Provider>
//   );
// }

// export const usePlayer = () => useContext(PlayerContext);