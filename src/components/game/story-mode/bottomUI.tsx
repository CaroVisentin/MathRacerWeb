import { RulesButton } from "../../../shared/buttons/buttonReglas"
import { Wildcards } from "../../../shared/wildcards/wildcards";

interface BottomUIProps {
    operations?: string;
    fireExtinguisherQuant: number;
    changeEquationQuant: number;
    dobleCountQuant: number;
}

export const BottomUI = ({ operations, fireExtinguisherQuant, changeEquationQuant, dobleCountQuant }: BottomUIProps) => {
    return (
        <div className="flex items-center justify-between">
            <Wildcards
                fireExtinguisher={fireExtinguisherQuant}
                changeEquation={changeEquationQuant}
                dobleCount={dobleCountQuant}
                size="1rem"
                width="3rem"
                height="4rem"
            />

            {operations && (
                <div className="absolute left-1/2 -translate-x-1/2">
                    {/* Contenedor con fondo translúcido y blur */}
                    <div className="relative bg-[#1a0a2e]/80 border-4 border-cyan-400 px-6 py-3 pixel-corners backdrop-blur-sm">

                        {/* Texto del mundo */}
                        <p className="text-xl text-cyan-300 text-center font-jersey">
                            Operaciones de suma y resta
                        </p>

                        {/* Corner decorations tipo pixel */}
                        <div className="absolute -top-1 -left-1 w-3 h-3 bg-[#ff0066]" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#ffff00]" />
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#00ff00]" />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#ff0066]" />
                    </div>
                </div>
            )}

            <RulesButton />
        </div>
    )
}