import { useContext } from "react";
import EnergyContext from "../contexts/energyContext";

export const useEnergy = () => {
    const context = useContext(EnergyContext);
    if (!context) throw new Error("useEnergy debe usarse dentro de EnergyProvider");
    return context;
};