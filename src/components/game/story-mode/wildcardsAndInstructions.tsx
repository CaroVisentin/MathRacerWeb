import type { LevelDtoUi } from "../../../models/ui/story-mode/levelDtoUi"
import { Wildcards } from "../../../shared/wildcards/wildcards"

interface WildcardsAndInstructionsProps {
    level: LevelDtoUi;
    onWildcardClick?: (wildCardId: number) => void;
    fireExtinguisherQuantity?: number;
    changeEquationQuantity?: number;
    dobleCountQuantity?: number;
}

export const WildcardsAndInstructions = ({ level, onWildcardClick, fireExtinguisherQuantity = 0, changeEquationQuantity = 0, dobleCountQuantity = 0 }: WildcardsAndInstructionsProps) => {
    return (
        <div className="flex justify-center items-center gridComodin mt-4">
            {/* <div className={`!text-3xl !m-5`}>
                {level ? `Elegí la opción para que la Y sea ${level.resultType.toUpperCase()}` : "Esperando instrucción..."}
            </div> */}
            <div className="instruccion tracking-widest text-4xl text-center">
                    {level
                        ? ( 
                            <>
                            Elegí la opción para que {" "}
      <span className="text-cyan-400 drop-shadow-[0_0_5px_#00ffff] ">
        Y
      </span>{" "}                            
                              sea {" "}
                            <span className="text-cyan-400">
                             {level.resultType.toUpperCase()}
                             </span>
                             </>
                             )
                        : ("esperando instruccion")}

                </div>

            <div className={`comodin !mt-2`}>
                {/* Reemplazar por un hook de data del jugador */}
                <Wildcards fireExtinguisher={fireExtinguisherQuantity} changeEquation={changeEquationQuantity} dobleCount={dobleCountQuantity} onWildcardClick={onWildcardClick} />
            </div>
        </div>
    )
}