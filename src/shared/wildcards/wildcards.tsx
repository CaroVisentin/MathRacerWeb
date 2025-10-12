import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireExtinguisher, faSyncAlt, faBolt } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface WildcardProps {
    icon: IconDefinition;
    color: string;
    count: number;
    size?: string; // tamaño del icono
    width?: string; // ancho del card
    height?: string; // alto del card
}

export const Wildcard = ({
    icon,
    color,
    count,
    size = "2rem",       
    width = "4rem",      
    height = "5rem"     
}: WildcardProps) => {
    return (
        <div
            className="flex flex-col items-center justify-center rounded-lg border-2 bg-black font-audiowide"
            style={{ borderColor: color, width, height }}
        >
            <FontAwesomeIcon icon={icon} style={{ color, fontSize: size }} />
            <span className="text-white text-lg mt-1">{count}</span>
        </div>
    );
};

// Componentes separados
// Elimina una opción incorrecta
export const FireExtinguisherCard = ({ count, size, width, height }: Omit<WildcardProps, "icon" | "color">) => (
    <Wildcard icon={faFireExtinguisher} color="red" count={count} size={size} width={width} height={height} />
);

// Cambia la ecuación actual por otra
export const ChangeEquationCard = ({ count, size, width, height }: Omit<WildcardProps, "icon" | "color">) => (
    <Wildcard icon={faSyncAlt} color="gray" count={count} size={size} width={width} height={height} />
);

// Hace que la siguiente ecuación cuente x2
export const DobleCountCard = ({ count, size, width, height }: Omit<WildcardProps, "icon" | "color">) => (
    <Wildcard icon={faBolt} color="cyan" count={count} size={size} width={width} height={height} />
);

// Componente que recibe los 3 juntos
interface WildcardsProps {
    fireExtinguisher: number;
    changeEquation: number;
    dobleCount: number;
    size?: string;
    width?: string;
    height?: string;
}

export const Wildcards = ({ fireExtinguisher, changeEquation, dobleCount, size, width, height }: WildcardsProps) => {
    return (
        <div className="flex gap-4">
            <FireExtinguisherCard count={fireExtinguisher} size={size} width={width} height={height} />
            <ChangeEquationCard count={changeEquation} size={size} width={width} height={height} />
            <DobleCountCard count={dobleCount} size={size} width={width} height={height} />
        </div>
    );
};
