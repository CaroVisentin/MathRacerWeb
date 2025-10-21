export interface ActiveEffectDto {
    id: number;
    type: number;
    soursePlayerId: number;
    targetPlayerId: number;
    questionsRemaining: number;
    isActive: boolean;
    //createdAt: Date;
}