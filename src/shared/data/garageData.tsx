import camaross from "../../assets/images/auto-garage.png";
import mitsubishi from "../../assets/images/auto-garage2.png";
import mathRacer from "../../assets/images/auto.png";
import lamborghini from "../../assets/images/auto-garage3.png";
import pistaDia from "../../assets/images/pista-dia.png";
import pistaNoche from "../../assets/images/pista-noche.png";
import pistaPastel from "../../assets/images/pista-pastel.png";
import pistaAtardecer from "../../assets/images/pista-atardecer.png";
import marioBros from "../../assets/images/mario.png";
import knuckles from "../../assets/images/knuckles.png";
import amongUs from "../../assets/images/among-us.png";

export const autosData = [
    { id: 1, nombre: "Camaro SS", imagen: camaross },
    { id: 2, nombre: "Mitsubishi Lancer EVO X", imagen: mitsubishi },
    { id: 3, nombre: "Math Racer Especial", imagen: mathRacer },
    { id: 4, nombre: "Lamborghini Countach", imagen: lamborghini },
];

export const fondosData = [
    { id: 1, nombre: "Pista de Día", imagen: pistaDia },
    { id: 2, nombre: "Pista de Noche", imagen: pistaNoche },
    { id: 3, nombre: "Pista de Atardecer", imagen: pistaAtardecer },
    { id: 4, nombre: "Pista en Colores Pastel", imagen: pistaPastel },
]

export const personajesData = [
    { id: 1, nombre: "Mario Bros", imagen: marioBros },
    { id: 2, nombre: "Knuckles", imagen: knuckles },
    { id: 3, nombre: "Among Us", imagen: amongUs },
]

// Mapa de datasets
export const dataMap = {
    autos: autosData,
    personajes: personajesData,
    fondos: fondosData,
};