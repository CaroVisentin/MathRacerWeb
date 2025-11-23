import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface GameHeaderProps {
    totalCorrectAnswers: number;
    onBack: () => void;
}

export const InfiniteModeGameHeader = ({ totalCorrectAnswers, onBack }: GameHeaderProps) => {
    return (
        <div className="flex justify-between items-center bg-black px-4 py-3 z-10">
            {/* Botón de volver */}
            <button className="px-3 py-1 rounded" onClick={onBack}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            <div>
                Respuestas correctas: {totalCorrectAnswers}
            </div>
        </div>
    );
};
