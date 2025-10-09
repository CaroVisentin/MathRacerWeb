import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ButtonReglasProps {
    onClick: () => void;
}

export const ButtonReglas = ({ onClick }: ButtonReglasProps) => {
    return (
        <>
            <div className="flex justify-end w-full px-6 py-4 mb-8">
                <button
                    className="border border-cyan-400 p-2 rounded text-cyan-400 hover:text-[#f95ec8] transition"
                    onClick={onClick}
                >
                    <FontAwesomeIcon icon={faQuestion} />
                </button>
            </div>
        </>
    )
}