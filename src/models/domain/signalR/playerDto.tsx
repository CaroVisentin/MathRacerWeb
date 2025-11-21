import type { PowerUpDto } from "./powerUpDto";

export interface PlayerDto {
  id: number;
  name: string;
  uid?: string; // Firebase UID (opcional hasta que backend lo envíe)
  correctAnswers: number;
  position: number;
  isReady: boolean;
  penaltyUntil: Date;
  finishedAt: Date;
  availablePowerUps: PowerUpDto[];
  hasDoublePointsActive: boolean;
}
