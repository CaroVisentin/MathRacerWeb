import { ButtonReglas } from "../../../shared/buttons/buttonReglas"
import { Comodines } from "../../../shared/comodines/comodines"

interface BottomUIProps {
    matafuegoCant: number;
    syncCant: number;
    thunderCant: number;
}

export const BottomUI = ({ matafuegoCant, syncCant, thunderCant }: BottomUIProps) => {
    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <Comodines matafuego={matafuegoCant} sync={syncCant} thunder={thunderCant} />
                </div>

                <div>
                    <div className="rounded-lg border-2 border-cyan-400/70 bg-cyan-950/40 px-6 py-3 text-center backdrop-blur-sm">
                        <p className="text-xl text-cyan-300">Operaciones de suma y resta</p>
                    </div>
                </div>

                <div>
                    <ButtonReglas />
                </div>
            </div>
        </>
    )
}