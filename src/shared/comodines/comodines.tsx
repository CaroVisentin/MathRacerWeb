import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireExtinguisher, faSyncAlt, faBolt } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface ComodinCardProps {
    icon: IconDefinition;
    color: string;
    count: number;
    size?: string; // tamaño del icono
    width?: string; // ancho del card
    height?: string; // alto del card
}

export const ComodinCard = ({ icon, color, count, size = "2.5rem", width = "6rem", height = "9rem" }: ComodinCardProps) => {
    return (
        <div
            className="flex flex-col items-center justify-center rounded-lg border-4 bg-black font-audiowide"
            style={{ borderColor: color, width, height }}
        >
            <FontAwesomeIcon icon={icon} style={{ color, fontSize: size }} />
            <span className="text-white text-2xl mt-2">{count}</span>
        </div>
    );
};

// Componentes separados
// Elimina una opción incorrecta
export const MatafuegoCard = ({ count, size, width, height }: Omit<ComodinCardProps, "icon" | "color">) => (
    <ComodinCard icon={faFireExtinguisher} color="red" count={count} size={size} width={width} height={height} />
);

// Cambia la ecuación actual por otra
export const CambiarEcuacionCard = ({ count, size, width, height }: Omit<ComodinCardProps, "icon" | "color">) => (
    <ComodinCard icon={faSyncAlt} color="gray" count={count} size={size} width={width} height={height} />
);

// Hace que la siguiente ecuación cuente x2
export const DobleCard = ({ count, size, width, height }: Omit<ComodinCardProps, "icon" | "color">) => (
    <ComodinCard icon={faBolt} color="cyan" count={count} size={size} width={width} height={height} />
);

// Componente que recibe los 3 juntos
interface ComodinesProps {
    matafuego: number;
    sync: number;
    thunder: number;
    size?: string;
    width?: string;
    height?: string;
}

export const Comodines = ({ matafuego, sync, thunder, size, width, height }: ComodinesProps) => {
    return (
        <div className="flex gap-4">
            <MatafuegoCard count={matafuego} size={size} width={width} height={height} />
            <CambiarEcuacionCard count={sync} size={size} width={width} height={height} />
            <DobleCard count={thunder} size={size} width={width} height={height} />
        </div>
    );
};
