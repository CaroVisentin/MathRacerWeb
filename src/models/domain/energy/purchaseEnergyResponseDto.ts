export interface PurchaseEnergyResponseDto {
  success: boolean;
  message: string;
  newEnergyAmount: number;
  remainingCoins: number;
  totalPrice: number;
}
