import type { LevelDtoUi } from "../../../models/ui/story-mode/levelDtoUi"
import { Wildcards } from "../../../shared/wildcards/wildcards"

interface WildcardsAndInstructionsProps {
    level: LevelDtoUi;
}

export const WildcardsAndInstructions = ({ level }: WildcardsAndInstructionsProps) => {
    return (
        <div className="flex justify-center items-center gridComodin mt-4">
            <div className={`!text-3xl !m-5`}>
                {level ? `Elegí la opción para que la Y sea ${level.resultType.toUpperCase()}` : "Esperando instrucción..."}
            </div>
            <div className={`comodin !mt-2`}>
                {/* Reemplazar por un hook de data del jugador */}
                <Wildcards fireExtinguisher={3} changeEquation={3} dobleCount={3} />
            </div>
        </div>
    )
}