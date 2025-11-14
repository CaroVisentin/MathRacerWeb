import type { InfiniteGameStatusResponseDto } from "../../../models/domain/infinite/infiniteGameStatusResponseDto";
import type { LoadNextBatchResponseDto } from "../../../models/domain/infinite/loadNextBatchResponseDto";
import type { StartInfiniteGameResponseDto } from "../../../models/domain/infinite/startInfiniteGameResponseDto";
import type { SubmitInfiniteAnswerRequestDto } from "../../../models/domain/infinite/submitInfiniteAnswerRequestDto";
import type { SubmitInfiniteAnswerResponseDto } from "../../../models/domain/infinite/submitInfiniteAnswerResponseDto";
import { manageError } from "../../../shared/utils/manageErrors";
import { api, API_URLS } from "../../network/api";

/**
* Crea una nueva partida infinita con el primer lote de 9 ecuaciones.
*/
export async function startInfiniteGame(): Promise<StartInfiniteGameResponseDto> {
    try {
        const response = await api.post<StartInfiniteGameResponseDto>(
            `${API_URLS.infinite}/start/`
        );
        return response.data;
    } catch (error: unknown) {
        manageError(error);
    }
}

/**
* Envía una respuesta en modo infinito. Procesa la respuesta del jugador para la pregunta actual y 
* retorna si fue correcta, el total de respuestas correctas y si necesita cargar un nuevo lote.
*/
export async function submitInfiniteAnswer(gameId: number, answer: SubmitInfiniteAnswerRequestDto): Promise<SubmitInfiniteAnswerResponseDto> {
    try {
        const response = await api.post<SubmitInfiniteAnswerResponseDto>(
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
        manageError(error);
    }
}

/**
* Carga el siguiente lote de ecuaciones. Genera y carga un nuevo lote de 9 ecuaciones con dificultad 
* escalada. Se debe llamar cuando NeedsNewBatch sea true.
*/
export async function loadNextBatch(gameId: number): Promise<LoadNextBatchResponseDto> {
    try {
        const response = await api.post<LoadNextBatchResponseDto>(
            `${API_URLS.infinite}/${gameId}/load-batch`
        );

        return response.data;
    } catch (error: unknown) {
        manageError(error);
    }
}

/**
* Obtiene el estado actual de una partida infinita
*/
export async function getInfiniteGameStatus(gameId: number): Promise<InfiniteGameStatusResponseDto> {
    try {
        const response = await api.post<InfiniteGameStatusResponseDto>(
            `${API_URLS.infinite}/${gameId}/status`
        );

        return response.data;
    } catch (error: unknown) {
        manageError(error);
    }
}

/**
* Abandona una partida en modo infinito. Una vez abandonada, no se pueden realizar más acciones en la partida.
*/
export async function abandonInfiniteGame(gameId: number): Promise<InfiniteGameStatusResponseDto> {
    try {
        const response = await api.post<InfiniteGameStatusResponseDto>(
            `${API_URLS.infinite}/${gameId}/abandon`
        );

        return response.data;
    } catch (error: unknown) {
        manageError(error);
    }
}