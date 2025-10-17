import { RulesButton } from "../../../shared/buttons/buttonReglas"
import { Wildcards } from "../../../shared/wildcards/wildcards";

interface BottomUIProps {
    fireExtinguisherQuant: number;
    changeEquationQuant: number;
    dobleCountQuant: number;
}

export const BottomUI = ({ fireExtinguisherQuant, changeEquationQuant, dobleCountQuant }: BottomUIProps) => {
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

            {/* Texto centrado absoluto para alinear con TopBar */}
            <div className="absolute left-1/2 -translate-x-1/2">
                <div className="rounded-lg border-2 border-cyan-400/70 bg-cyan-950/40 px-6 py-3 text-center backdrop-blur-sm">
                    <p className="text-xl text-cyan-300">Operaciones de suma y resta</p>
                </div>
            </div>

            <RulesButton />
        </div>
    )
}