import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireExtinguisher, faSyncAlt, faBolt } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface WildcardProps {
    icon: IconDefinition;
    color: string;
    count: number;
    onActivate?: () => void;
    size?: string; // tamaño del icono
    width?: string; // ancho del card
    height?: string; // alto del card
}

export const Wildcard = ({
    icon,
    color,
    count,
    onActivate,
    size = "2rem",       
    width = "4rem",      
    height = "5rem"     
}: WildcardProps) => {
    const isDisabled = count <= 0;
    const inactiveColor = "gray";
    return (
        <div
            className="flex flex-col items-center justify-center rounded-lg border-2 bg-black font-audiowide  transition ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'} p-2"
            style={{ borderColor: color, width, height }}
            onClick ={isDisabled ? undefined : onActivate}
        >
            <FontAwesomeIcon icon={icon} style={{ color: isDisabled ? inactiveColor : color, fontSize: size }} />
            <span className="text-white text-lg mt-1">{count}</span>
     
           
        </div>
    );
};

// Componentes separados
// Elimina dos opción incorrecta
export const FireExtinguisherCard = ({ count, size, width, height,onActivate }: Omit<WildcardProps, "icon" | "color">) => (
    <Wildcard icon={faFireExtinguisher} 
    color="red" 
    count={count}
     size={size} 
     width={width} 
     height={height}
     onActivate={onActivate} />
);

// mezcla las opciones de la ecuación
export const ChangeEquationCard = ({ count, size, width, height,onActivate }: Omit<WildcardProps, "icon" | "color">) => (
    <Wildcard icon={faSyncAlt} color="gray" count={count} size={size} width={width} height={height} onActivate={onActivate}/>
);

// Hace que la siguiente ecuación cuente x2
export const DobleCountCard = ({ count, size, width, height,onActivate }: Omit<WildcardProps, "icon" | "color">) => (
    <Wildcard icon={faBolt} color="cyan" count={count} size={size} width={width} height={height} onActivate={onActivate}/>
);

// Componente que recibe los 3 juntos
interface WildcardsProps {
    fireExtinguisher: number;
    changeEquation: number;
    dobleCount: number;
    size?: string;
    width?: string;
    height?: string;
    onFireExtinguisher?: () => void;
    onChangeEquation?: () => void;
    onDobleCount?: () => void;
}

export const Wildcards = ({ 
    fireExtinguisher, 
    changeEquation, 
    dobleCount, 
    size, 
    width, 
    height, 
    onFireExtinguisher, 
    onChangeEquation, 
    onDobleCount }: WildcardsProps)  => {
    return (
        <div className="flex gap-4">
            <FireExtinguisherCard count={fireExtinguisher} size={size} width={width} height={height} 
            onActivate={onFireExtinguisher} />
            <ChangeEquationCard count={changeEquation} size={size} width={width} height={height}
            onActivate={onChangeEquation} />
            <DobleCountCard count={dobleCount} size={size} width={width} height={height} 
            onActivate={onDobleCount}/>
        </div>
    );
};
