import type { PowerUpType } from "../enums/powerUpType";


export interface PowerUpUsedDto {
    gameId: number;
    playerId: number;
    powerUpType: PowerUpType;
}