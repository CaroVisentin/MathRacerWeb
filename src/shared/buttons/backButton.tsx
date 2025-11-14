import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAudio } from "../../contexts/AudioContext";

interface BackButtonProps {
    onClick?: () => void;
}

export const BackButton = ({onClick}: BackButtonProps) => {
    const { playBackSound } = useAudio();
    const navigate = useNavigate();
    const handleClick = onClick ?? (() => {
        playBackSound();
        navigate(-1);
    });

    return (
        <button
            onClick={handleClick} // -1 significa "una página atrás"
            className="text-white text-xl px-2 py-1 hover:text-[#f95ec8] transition border-2 border-[#00f0ff]"
        >
            <FontAwesomeIcon icon={faArrowLeft} />
        </button>
    )
};