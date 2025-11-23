import type { PowerUpDto } from "./powerUpDto";

// Datos de un producto equipado básico (coincide parcialmente con modelo UI PlayerItem)
export interface EquippedProductDto {
  id: number;
  name: string;
  description: string;
  // Backend actual no envía imageUrl ni productType, se infiere por nombre.
}

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
  equippedBackground?: EquippedProductDto | null;
  equippedCar?: EquippedProductDto | null;
  equippedCharacter?: EquippedProductDto | null;
}
