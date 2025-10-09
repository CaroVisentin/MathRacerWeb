import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const BackButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="text-white text-xl px-2 py-1 hover:text-[#f95ec8] transition border-2 border-[#00f0ff] rounded"
        >
            <FontAwesomeIcon icon={faArrowLeft} />
        </button>
    )
};