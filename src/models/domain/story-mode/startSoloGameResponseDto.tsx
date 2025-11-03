import type { WildcardDto } from "../chest/chestWildcardDto";
import type { SoloProductDto } from "./productDto";
import type { SoloQuestionDto } from "./soloQuestionDto";

/*
* DTO de respuesta para el inicio de una partida individual
*/
export interface StartSoloGameResponseDto {
    gameId: number;     //  ID único de la partida generada
    playerId: number; // ID del jugador que inició la partida
    playerName: string; // Nombre del jugador
    levelId: number; // ID del nivel seleccionado

    totalQuestions: number; // Cantidad total de preguntas en la partida
    timePerEquation: number; // Tiempo en segundos asignado por ecuación
    livesRemaining: number; // Vidas restantes del jugador (inicial: 3)
    gameStartedAt: Date; //  Fecha y hora UTC de inicio de la partida
    resultType: string;

    currentQuestion: SoloQuestionDto; //  Primera pregunta de la partida con sus opciones de respuesta

    playerProducts: SoloProductDto[]; // Lista de productos activos del jugador (auto, personaje, fondo)
    machineProducts: SoloProductDto[]; // Lista de productos aleatorios asignados a la máquina

    availableWildcards: WildcardDto[];
}
