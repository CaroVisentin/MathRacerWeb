import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

interface ButtonReglasProps {
    onClick?: () => void;
}

export const ButtonReglas = ({ onClick }: ButtonReglasProps) => {
    const navigate = useNavigate();
    const handleClick = onClick ?? (() => navigate("/reglas"));

    return (
        <>
            <div className="flex justify-end w-full px-6 py-4 mb-8">
                <button
                    className="border border-cyan-400 p-2 rounded text-cyan-400 hover:text-[#f95ec8] transition"
                    onClick={handleClick}
                >
                    <FontAwesomeIcon icon={faQuestion} />
                </button>
            </div>
        </>
    )
}