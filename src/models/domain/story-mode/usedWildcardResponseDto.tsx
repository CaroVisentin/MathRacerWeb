import type { SoloQuestionDto } from "./soloQuestionDto";

export interface UseWildcardResponseDto {
    wildcardId: number;
    success: boolean;
    message: string;
    remainingQuantity: number;

    // Para RemoveWrongOption (ID 1)
    modifiedOptions?: number[];

    // Para SkipQuestion (ID 2)
    newQuestionIndex?: number;
    newQuestion?: SoloQuestionDto;

    // Para DoubleProgress (ID 3)
    doubleProgressActive: boolean;
}