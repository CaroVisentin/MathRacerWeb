import type { PowerUpDto } from "./powerUpDto";

export interface PlayerDto {
  id: number;
  name: string;
  correctAnswers: number;
  position: number;
  isReady: boolean;
  penaltyUntil: Date;
  finishedAt: Date;
  availablePowerUps: PowerUpDto[];
  hasDoublePointsActive: boolean;
}
