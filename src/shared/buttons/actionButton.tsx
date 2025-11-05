import React from "react";
import { Link } from "react-router-dom";

interface ActionButtonProps {
    size?: "small" | "large";
    to?: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}


//#0f0f0f 5df9f9
export const ActionButton = ({
  size = "large",
  to,
  children,
  className = "",
  onClick,
}: ActionButtonProps) => {
  const sizeClasses =
    size === "large"
      ? "w-56 h-16 text-3xl"
      : "w-16 h-16 text-2xl";

  const baseClasses = `
    ${sizeClasses}
    relative z-20 flex items-center justify-center
    bg-black/50 rounded-sm border-[4px] border-[#5df9f9]
    text-[#5df9f9]
    shadow-[4px_4px_0_#0f0f0f]
    uppercase tracking-wider font-retro
    transition-all duration-300 ease-out
    cursor-pointer
    ${className}
    hover:scale-105
    hover:text-[#f95ec8]
    hover:border-[#f95ec8]
    hover:shadow-[0_0_3px_rgba(249,94,200,0.5),0_0_20px_rgba(249,94,200,0.6),0_0_11px_rgba(249,94,200,0.4)]
    active:scale-95
  `;

  if (to) {
    return (
      <Link to={to} className={baseClasses} onClick={onClick} role="button">
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={baseClasses} onClick={onClick}>
      {children}
    </button>
  );
};


