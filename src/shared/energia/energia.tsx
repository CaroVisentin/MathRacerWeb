import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";

interface FuelIndicatorProps {
    vidasRestantes: number; // número de vidas actuales
    iconSize?: string;
    squareSize?: string;
    gap?: string;
}

export const FuelIndicator = ({
    vidasRestantes,
    iconSize = "1.5rem",
    squareSize = "1.5rem",
    gap = "0.25rem",
}: FuelIndicatorProps) => {
    const cantVidasPorPartida = 3;

    // array de colores según las vidas restantes
    const colores = Array.from({ length: cantVidasPorPartida }, (_, i) =>
        i < vidasRestantes ? "ffe600" : "394a59"
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
