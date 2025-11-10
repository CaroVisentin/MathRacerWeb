// DTO para representar el estado de energía de un jugador
export interface EnergyStatusDto {
  currentAmount: number; // Cantidad actual de energía
  maxAmount: number; // Cantidad máxima de energía
  secondsUntilNextRecharge: number | null; // Segundos restantes para la próxima recarga (null si está al máximo)
}
