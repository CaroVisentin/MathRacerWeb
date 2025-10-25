import React from "react";

interface ActionButtonProps {
    size?: "small" | "large";
    to?: string;
    children: React.ReactNode;
    className?: string;
}


//#0f0f0f 5df9f9
export const ActionButton = ({ size = "large", to, children, className = "" }: ActionButtonProps) => {
  const sizeClasses =
    size === "large"
      ? "w-56 h-16 text-3xl"
      : "w-16 h-16 text-2xl";

  const button = (
    <button
      className={`
        ${sizeClasses}
        flex items-center justify-center
        bg-black/50 rounded-sm border-[4px] border-[#5df9f9]
        text-[#5df9f9]
        shadow-[4px_4px_0_#0f0f0f]
        uppercase tracking-wider font-retro
        transition-all duration-300 ease-out
        cursor-pointer
        ${className}

        hover:scale-105
        hover:text-[#5df9f9] 
        hover:border-[#5df9f9]
        hover:shadow-[0_0_3px_rgba(255,255,255,0.5),0_0_20px_rgba(93,249,249,0.5),0_0_11px_rgba(93,249,249,0.5)]
        active:scale-95
      `}
    >
      {children}
    </button>
  );

  return to ? <a href={to}>{button}</a> : button;
};


