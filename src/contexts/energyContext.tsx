import React, { createContext, useEffect, useState, useRef, useCallback } from "react";
import { getEnergyStatus } from "../services/energy/energyService";
import { type EnergyStatusDto } from "../models/domain/energy/energyStatusDto";
import type { EnergyContextValue } from "../models/ui/energy/energy";
import { getErrorMessage } from "../shared/utils/manageErrors";
import { useContext} from "react";
import { AuthContext } from "./AuthContext";

const EnergyContext = createContext<EnergyContextValue | null>(null);


export const EnergyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = useContext(AuthContext);
  const [energy, setEnergy] = useState<EnergyStatusDto>({
    currentAmount: 0,
    maxAmount: 3,
    secondsUntilNextRecharge: 0,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isAuthenticatedRef = useRef<boolean>(false);
  const isFetchingRef = useRef<boolean>(false);

  // useCallback para evitar recrear la función en cada render
  const fetchEnergy = useCallback(async () => {
    // No intentar obtener energía si no hay contexto de auth o no hay usuario
    if (!auth || !auth.user) {
      console.log("No se puede obtener energía: usuario no autenticado");
      return;
    }

    // Evitar llamadas concurrentes
    if (isFetchingRef.current) {
      console.log("Ya hay una llamada de energía en proceso, esperando...");
      return;
    }
    
    isFetchingRef.current = true;
    
    try {
      const data: EnergyStatusDto = await getEnergyStatus();
      setEnergy(data);
      console.log("Energía obtenida exitosamente:", data);
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      console.error("Error al obtener energía:", message);
    } finally {
      isFetchingRef.current = false;
    }
  }, [auth]);

  // Llamar al backend al montar el provider solo si hay usuario autenticado
  useEffect(() => {
    // Esperar a que el contexto de auth esté listo
    if (!auth) {
      console.log("Esperando contexto de autenticación...");
      return;
    }

    if (!auth.loading && auth.user) {
      // Solo hacer la llamada inicial si cambió el estado de autenticación
      if (!isAuthenticatedRef.current) {
        console.log("Usuario autenticado, esperando antes de obtener energía...");
        isAuthenticatedRef.current = true;
        
        // Esperar 200ms adicionales para asegurar que el token esté listo
        const timeoutId = setTimeout(() => {
          console.log("Obteniendo energía inicial...");
          fetchEnergy();
        }, 200);

        return () => clearTimeout(timeoutId);
      }
    } else if (!auth.loading && !auth.user) {
      // Resetear energía cuando no hay usuario autenticado
      console.log("Usuario no autenticado, reseteando energía");
      isAuthenticatedRef.current = false;
      isFetchingRef.current = false;
      setEnergy({
        currentAmount: 0,
        maxAmount: 3,
        secondsUntilNextRecharge: 0,
      });
    }
    
    return undefined;
  }, [auth, fetchEnergy]);

  // Controlar el countdown visual - SOLO depende del cambio inicial de secondsUntilNextRecharge
  useEffect(() => {
    // Limpiar intervalo anterior
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Verificar que auth esté disponible y el usuario autenticado
    if (!auth || !auth.user) {
      return;
    }

    // Solo iniciar el countdown si hay segundos por contar
    if (energy.secondsUntilNextRecharge != null && energy.secondsUntilNextRecharge > 0) {
      intervalRef.current = setInterval(() => {
        setEnergy((prev) => {
          const next = prev.secondsUntilNextRecharge! - 1;
          if (next <= 0) {
            // Cuando llegue a 0, hacer fetch y devolver el estado anterior
            // para que el próximo dato del backend actualice correctamente
            fetchEnergy();
            return prev;
          }
          return { ...prev, secondsUntilNextRecharge: next };
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, fetchEnergy]); // SOLO depende de auth y fetchEnergy, NO de secondsUntilNextRecharge

  return (
    <EnergyContext.Provider value={{ ...energy, refreshEnergy: fetchEnergy }}>
      {children}
    </EnergyContext.Provider>
  );
};

export default EnergyContext;
