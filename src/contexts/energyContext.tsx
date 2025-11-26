import React, { createContext, useEffect, useState, useCallback, useContext, useRef } from "react";
import { getEnergyStatus } from "../services/energy/energyService";
import { AuthContext } from "./AuthContext";
import type { EnergyContextValue } from "../models/ui/energy/energy";
import type { EnergyStatusDto } from "../models/domain/energy/energyStatusDto";
import { getErrorMessage } from "../shared/utils/manageErrors";

const EnergyContext = createContext<EnergyContextValue | null>(null);

export const EnergyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useContext(AuthContext);

  const [energy, setEnergy] = useState<EnergyStatusDto>({
    currentAmount: 0,
    maxAmount: 3,
    secondsUntilNextRecharge: 0,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isFetchingRef = useRef<boolean>(false);

  const fetchEnergy = useCallback(async () => {
    if (!auth?.user || isFetchingRef.current) return;

    isFetchingRef.current = true;

    try {
      const data: EnergyStatusDto = await getEnergyStatus();
      setEnergy(data);
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      console.error("Error al obtener energía:", message);
    } finally {
      isFetchingRef.current = false;
    }
  }, [auth]);

  // Llamada inicial cuando el usuario está autenticado
  useEffect(() => {
    if (!auth?.loading && auth?.user) {
      fetchEnergy();
    }

    if (!auth?.user) {
      // Resetear energía si el usuario salió
      setEnergy({ currentAmount: 0, maxAmount: 3, secondsUntilNextRecharge: 0 });
    }
  }, [auth, fetchEnergy]);

  // Countdown visual
  useEffect(() => {
    if (!auth?.user) return;

    if (intervalRef.current) clearInterval(intervalRef.current);

    if (energy.secondsUntilNextRecharge != null && energy.secondsUntilNextRecharge > 0) {
      intervalRef.current = setInterval(() => {
        setEnergy((prev) => {
          const nextSeconds = prev.secondsUntilNextRecharge! - 1;

          if (nextSeconds <= 0) {
            fetchEnergy(); // Cuando llega a 0, consulta backend para actualizar vidas
            return prev;   // No modificamos localmente hasta recibir datos reales
          }

          return { ...prev, secondsUntilNextRecharge: nextSeconds };
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current!);
  }, [energy.secondsUntilNextRecharge, auth, fetchEnergy]);

  return (
    <EnergyContext.Provider value={{ ...energy, refreshEnergy: fetchEnergy }}>
      {children}
    </EnergyContext.Provider>
  );
};

export default EnergyContext;