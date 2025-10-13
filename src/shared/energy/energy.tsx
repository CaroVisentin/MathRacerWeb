import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";

interface FuelIndicatorProps {
    remainingLives: number; // número de vidas actuales
    iconSize?: string;
    squareSize?: string;
    gap?: string;
}

export const FuelIndicator = ({
    remainingLives,
    iconSize = "1.5rem",
    squareSize = "1.5rem",
    gap = "0.25rem",
}: FuelIndicatorProps) => {
    const livesPerGame = 3;

    // array de colores según las vidas restantes
    const colores = Array.from({ length: livesPerGame }, (_, i) =>
        i < remainingLives ? "#ffe600" : "#394a59"
    );

    return (
        <div className="flex items-center">
            <FontAwesomeIcon icon={faGasPump} style={{ fontSize: iconSize, color: "ffe600" }} />
            <div className="flex ml-2" style={{ gap }}>
                {colores.map((color, index) => (
                    <div
                        key={index}
                        style={{
                            width: squareSize,
                            height: squareSize,
                            backgroundColor: color,
                            borderRadius: "0.2rem",
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
