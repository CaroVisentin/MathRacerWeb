import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

interface RulesButtonProps {
    onClick?: () => void;
}

export const RulesButton = ({ onClick }: RulesButtonProps) => {
    const navigate = useNavigate();
    const handleClick = onClick ?? (() => navigate("/reglas"));

    return (
        

            <div className="fixed bottom-4 right-6 z-50">
                <button
                    className="border border-cyan-400 p-2 rounded text-cyan-400 hover:text-[#f95ec8] transition"
                    onClick={handleClick}
                >
                    <FontAwesomeIcon icon={faQuestion} />
                </button>
            </div>
        
    )
}