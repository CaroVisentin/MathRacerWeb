import type { AvailableGamesResponseDto } from "../../models/domain/signalR/availableGameRespDto";
import type { CreateCustomGameRequestDto } from "../../models/domain/signalR/createCustomGameDto";
import type { CreateGameResponseDto } from "../../models/domain/signalR/createGameRespDto";
import type { JoinGameRequestDto } from "../../models/domain/signalR/joinGameDto";
import type { OnlineGameDto } from "../../models/domain/signalR/onlineGameDto";
import type { SignalRConnectionInfo } from "../../models/domain/signalR/signalConnectionInfo";
import { api, API_URLS } from "../network/api";


/**
 * Servicio para gestionar partidas multijugador online
 */

/**
 * Obtiene la lista de partidas disponibles para unirse
 * @param publicOnly Si es true, solo retorna partidas públicas
 * @returns Lista de partidas disponibles
 */
export async function getAvailableGames(publicOnly: boolean = false): Promise<AvailableGamesResponseDto> {
    try {
        const { data } = await api.get(`${API_URLS.online}/games/available`, {
            params: { publicOnly }
        });
        return data;
    } catch (error) {
        console.error("Error al obtener partidas disponibles:", error);
        throw error;
    }
}

/**
 * Obtiene información detallada de una partida específica
 * @param gameId ID de la partida
 * @returns Información completa de la partida
 */
export async function getGameInfo(gameId: number): Promise<OnlineGameDto> {
    try {
        const { data } = await api.get(`${API_URLS.online}/game/${gameId}`);
        return data;
    } catch (error) {
        console.error("Error al obtener información de la partida:", error);
        throw error;
    }
}

/**
 * Crea una nueva partida multijugador personalizada
 * @param request Datos de configuración de la partida
 * @returns Información de la partida creada
 */
export async function createCustomGame(request: CreateCustomGameRequestDto): Promise<CreateGameResponseDto> {
    try {
        // Importar getAuthToken desde api.ts
        const { getAuthToken } = await import('../network/api');
        
        // Asegurarse de que el token esté actualizado antes de hacer la petición
        await getAuthToken();
        
        console.log('Enviando request al backend:', request);
        const { data } = await api.post(`${API_URLS.online}/create`, request);
        console.log('Respuesta del backend:', data);
        return data;
    } catch (error: any) {
        console.error("Error al crear partida:", error);
        console.error("Detalles del error:", error.response?.data);
        throw error;
    }
}

/**
 * Une al jugador a una partida existente
 * @param request Datos para unirse (gameId y password opcional)
 * @returns Información de la partida
 */
export async function joinGame(request: JoinGameRequestDto): Promise<OnlineGameDto> {
    try {
        console.log("=== JOIN GAME SERVICE ===");
        console.log("Request:", request);
        console.log("API Base URL:", api.defaults.baseURL);
        console.log("Full URL:", `${api.defaults.baseURL}${API_URLS.online}/join`);
        
        const { data } = await api.post(`${API_URLS.online}/join`, request);
        console.log("Respuesta exitosa:", data);
        return data;
    } catch (error: any) {
        console.error("Error al unirse a la partida:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        throw error;
    }
}

/**
 * Obtiene la información de configuración para SignalR
 * @returns Información de conexión SignalR
 */
export async function getSignalRConnectionInfo(): Promise<SignalRConnectionInfo> {
    try {
        const { data } = await api.get(`${API_URLS.online}/connection-info`);
        return data;
    } catch (error) {
        console.error("Error al obtener información de conexión SignalR:", error);
        throw error;
    }
}

/**
 * Busca una partida rápida/competitiva para el jugador
 * Esto utiliza SignalR para emparejar jugadores
 * @param playerName Nombre del jugador
 */
export async function findQuickMatch(playerName: string): Promise<void> {
    // Esta función se implementará con SignalR
    // Por ahora solo validamos que el nombre no esté vacío
    if (!playerName || playerName.trim() === "") {
        throw new Error("El nombre del jugador es requerido");
    }
    
    // La lógica real de matchmaking se manejará a través de SignalR
    console.log(`Buscando partida rápida para: ${playerName}`);
}
