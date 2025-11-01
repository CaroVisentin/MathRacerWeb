import type { SoloGameStatusResponseDto } from "../../../models/domain/story-mode/soloGameStatusResponseDto";
import type { StartSoloGameResponseDto } from "../../../models/domain/story-mode/startSoloGameResponseDto";
import type { SubmitSoloAnswerResponseDto } from "../../../models/domain/story-mode/submitSoloAnswerResponseDto";
import { api, API_URLS } from "../../network/api";

/* Flujo del juego 
1. startGame
2. submitAnswer 
3. espera 3 segundos para mostrar rta correcta
4. getGameStatus
5. vuelve a repetirse desde el paso 2

/** 
* Inicia una nueva partida individual
* @param levelId Id del nivel para empezar la partida
*/
export async function startGame(levelId: number): Promise<StartSoloGameResponseDto> {
    try {
        const response = await api.post<StartSoloGameResponseDto>(
            `${API_URLS.storyModeGame}/start/${levelId}/`
        )
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || error.message || "Error desconocido";
        throw new Error(message); 
    }
}

/** 
* Obtiene el estado actual de una partida individual
* @param gameId Id de la partida para obtener el estado
*/
export async function getGameStatus(gameId: number): Promise<SoloGameStatusResponseDto> {
    try {
        const response = await api.get<SoloGameStatusResponseDto>(
            `${API_URLS.storyModeGame}/${gameId}/`
        )
        return response.data;
    } catch (error: unknown) {
        console.error("Error al iniciar una partida individual:", error);
        throw error;
    }
}

/** 
* Envía una respuesta a la pregunta actual 
* @param gameId Id de la partida para enviar la respuesta
* @param answer Respuesta del jugador a la pregunta actual
*/
export async function submitAnswer(gameId: number, answer: number): Promise<SubmitSoloAnswerResponseDto> {
    try {
        const response = await api.post<SubmitSoloAnswerResponseDto>(
            `${API_URLS.storyModeGame}/${gameId}/answer`, // gameId por URL
            answer, // envío respuesta en el body del post, como número plano [FromBody]
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error: unknown) {
        console.error("Error al iniciar una partida individual:", error);
        throw error;
    }
}
