import React, { createContext, useEffect, useState, useRef } from "react";
import { getEnergyStatus } from "../services/energy/energyService";
import { type EnergyStatusDto } from "../models/domain/energy/energyStatusDto";
import type { EnergyContextValue } from "../models/ui/energy/energy";
import { getErrorMessage } from "../shared/utils/manageErrors";

const EnergyContext = createContext<EnergyContextValue | null>(null);

export const EnergyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [energy, setEnergy] = useState<EnergyStatusDto>({
    currentAmount: 0,
    maxAmount: 3,
    secondsUntilNextRecharge: 0,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchEnergy = async () => {
    try {
      const data: EnergyStatusDto = await getEnergyStatus();
      setEnergy(data);
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      console.error(message);
    }
  };

  // Llamar al backend al montar el provider
  useEffect(() => {
    fetchEnergy();
  }, []);

  // Controlar el countdown visual
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (energy.secondsUntilNextRecharge != null) {
      intervalRef.current = setInterval(() => {
        setEnergy((prev) => {
          const next = prev.secondsUntilNextRecharge! - 1;
          if (next <= 0) {
            fetchEnergy(); // recarga completa → consultar backend
            return prev;
          }
          return { ...prev, secondsUntilNextRecharge: next };
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [energy.secondsUntilNextRecharge]);

  return (
    <EnergyContext.Provider value={{ ...energy, refreshEnergy: fetchEnergy }}>
      {children}
    </EnergyContext.Provider>
  );
};

export default EnergyContext;
