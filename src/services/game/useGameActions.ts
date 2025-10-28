import { useState } from "react";
import { useConnection } from "../signalR/connection";
import { gameService } from "./gameAPI";

export const useGameActions = () => {
    // Aquí puedes definir las acciones relacionadas con el juego
    const {invoke} = useConnection();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const crearPartida = async (jugadorId: string) => {
        setLoading(true);
        setError(null);
        try {
            const partida = await gameService.crearPartida(jugadorId);

            await invoke("FindMatch", jugadorId);

            setLoading(false);
            return partida;
        } catch (err) {
            setError("Error al crear la partida.");
            setLoading(false);
            throw err;
        } finally {
            setLoading(false);
        }   
    };

    const unirseAPartida = async (partidaId: string, jugadorId: string) => {
        setLoading(true);
        setError(null);
        try {
            const partida = await gameService.unirsePartida(partidaId, jugadorId);
            await invoke("JoinMatch", partidaId, jugadorId);
            setLoading(false);
            return partida;
        } catch (err) {
            setError("Error al unirse a la partida.");
            setLoading(false);
            throw err;
        } finally {
            setLoading(false);
        }   
    };

    return {
        crearPartida,
        unirseAPartida,
        loading,
        error,
    };
};