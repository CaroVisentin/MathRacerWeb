import React from "react";

interface RewardBackgroundProps {
    backgroundImage?: string;
    children: React.ReactNode;
}

export const RewardBackground: React.FC<RewardBackgroundProps> = ({ backgroundImage, children }) => {
    return (
        <div className="relative min-h-screen min-w-screen">
            {/* Fondo */}
            <div
                className={`absolute inset-0 ${backgroundImage ? "bg-cover bg-center bg-no-repeat" : "bg-black"}`}
                style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
            >
                {/* Capa oscura solo si hay imagen */}
                {backgroundImage && <div className="absolute inset-0 bg-black/60"></div>}
            </div>

            {/* Contenido centrado */}
            <div className="relative z-10 w-full h-full flex flex-col justify-center items-center gap-4">
                {children}
            </div>
        </div>
    );
};
