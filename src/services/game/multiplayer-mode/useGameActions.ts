import { useState } from "react";
import { useConnection } from "../../signalR/connection";

/**
 * Hook para manejar acciones de juego multijugador mediante SignalR.
 * 
 * IMPORTANTE: Este hook solo maneja matchmaking rápido (FindMatch/FindMatchWithMatchmaking).
 * Para partidas personalizadas, usar directamente:
 * - createCustomGame (desde onlineService) para crear
 * - JoinGame (mediante SignalR invoke) para unirse
 */
export const useGameActions = () => {
    const { invoke } = useConnection();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Busca una partida rápida usando matchmaking FIFO (First In, First Out).
     * El sistema empareja al primer jugador disponible sin considerar habilidades.
     * 
     * @param playerUid - UID de Firebase del jugador
     */
    const buscarPartidaRapida = async (playerUid: string) => {
        setLoading(true);
        setError(null);
        try {
            // FindMatch maneja todo: creación de jugador, búsqueda o creación de partida
            await invoke("FindMatch", playerUid);
            
            setLoading(false);
            console.log("Búsqueda de partida rápida iniciada para:", playerUid);
        } catch (err: any) {
            const errorMsg = err.message || "Error al buscar partida rápida.";
            setError(errorMsg);
            setLoading(false);
            console.error("Error en buscarPartidaRapida:", err);
            throw err;
        }
    };

    /**
     * Busca una partida usando matchmaking basado en ranking.
     * El sistema empareja jugadores con habilidades similares.
     * 
     * @param playerUid - UID de Firebase del jugador
     */
    const buscarPartidaRankeada = async (playerUid: string) => {
        setLoading(true);
        setError(null);
        try {
            // FindMatchWithMatchmaking usa puntos de ranking para emparejar
            await invoke("FindMatchWithMatchmaking", playerUid);
            
            setLoading(false);
            console.log("Búsqueda de partida rankeada iniciada para:", playerUid);
        } catch (err: any) {
            const errorMsg = err.message || "Error al buscar partida rankeada.";
            setError(errorMsg);
            setLoading(false);
            console.error("Error en buscarPartidaRankeada:", err);
            throw err;
        }
    };

    /**
     * Une al jugador a una partida existente mediante SignalR.
     * 
     * @param gameId - ID de la partida a unirse
     * @param password - Contraseña (opcional, solo para partidas privadas)
     */
    const unirseAPartida = async (gameId: number, password?: string) => {
        setLoading(true);
        setError(null);
        try {
            // JoinGame obtiene el UID de Firebase automáticamente del token JWT
            await invoke("JoinGame", gameId, password || null);
            
            setLoading(false);
            console.log(`Unido a partida ${gameId}`);
        } catch (err: any) {
            const errorMsg = err.message || "Error al unirse a la partida.";
            setError(errorMsg);
            setLoading(false);
            console.error("Error en unirseAPartida:", err);
            throw err;
        }
    };

    return {
        buscarPartidaRapida,
        buscarPartidaRankeada,
        unirseAPartida,
        loading,
        error,
    };
};