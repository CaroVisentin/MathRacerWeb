import type { EnergyStatusDto } from "../../domain/energy/energyStatusDto";

export interface EnergyContextValue extends EnergyStatusDto {
  refreshEnergy: () => Promise<void>;
}