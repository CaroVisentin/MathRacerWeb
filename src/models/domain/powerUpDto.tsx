import type { PowerUpType } from "../enums/powerUpType";
import type { ActiveEffectDto } from "./ActiveEffectDto";

export interface PowerUpDto {
    gameid: number;
    powerUpType: PowerUpType;
    playerId: number;
    targetPlayerId: ActiveEffectDto["targetPlayerId"];
};