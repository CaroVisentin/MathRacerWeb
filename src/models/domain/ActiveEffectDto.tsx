
import type { PowerUpDto } from "./powerUpDto"; 

export interface ActiveEffectDto {
    id: number;
    //type: number;
    powerUpType: PowerUpDto["powerUpType"];
    soursePlayerId: number;
    targetPlayerId: number;
    createdAt: Date;
   // expiryAt: Date;
    questionsRemaining: number;
    isActive: boolean;
   
    //createdAt: Date;
}