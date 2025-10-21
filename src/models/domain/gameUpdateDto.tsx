import type { ActiveEffectDto } from "./ActiveEffectDto";
import type { PlayerDto } from "./playerDto";
import type { QuestionDto } from "./questionDto";

export interface GameUpdateDto {
    gameId: number;
    players: PlayerDto[];
    status: string;
    currentQuestion: QuestionDto;
    winnerId?: number;
    createdAt: Date;
    questionCount: number;
    conditionToWin: number;
    expectedResult: string;
    activeEffects: ActiveEffectDto[];
    powerUpsEnabled: boolean;
}