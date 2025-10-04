import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
    return (
        <button
            onClick={() => console.log("Volver atrás")}
            className="text-white text-xl px-2 py-1 hover:text-cyan-400 transition"
        >
            <FontAwesomeIcon icon={faArrowLeft} />
        </button>
    )
};

export default BackButton;
