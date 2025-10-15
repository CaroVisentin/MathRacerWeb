import React from "react";
import { Link } from "react-router-dom";

interface ActionButtonProps {
    size?: "small" | "large";
    to?: string;
    children: React.ReactNode;
    className?: string;
}

export const ActionButton = ({ size = "large", to, children, className = "" }: ActionButtonProps) => {
    const sizeClasses =
        size === "large"
            ? "w-56 h-16 text-3xl"
            : "w-16 h-16 text-2xl";

    const button = (
        <button
            className={`${sizeClasses}
        flex items-center justify-center rounded-xl shadow bg-[#5df9f9] text-[#0f0f0f] 
        transition-all duration-300 ease-in-out hover:bg-[#f95ec8] hover:scale-105 active:scale-95
        ${className} `}>      
      {children}
        </button>
    );

    return to ? <Link to={to}>{button}</Link> : button;
};
