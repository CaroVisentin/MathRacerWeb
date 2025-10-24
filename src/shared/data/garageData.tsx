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

export const carsData = [
    { id: 1, name: "Camaro SS", image: camaross },
    { id: 2, name: "Mitsubishi Lancer EVO X", image: mitsubishi },
    { id: 3, name: "Math Racer Especial", image: mathRacer },
    { id: 4, name: "Lamborghini Countach", image: lamborghini },
];

export const backgroundsData = [
    { id: 1, name: "Pista de Día", image: pistaDia },
    { id: 2, name: "Pista de Noche", image: pistaNoche },
    { id: 3, name: "Pista de Atardecer", image: pistaAtardecer },
    { id: 4, name: "Pista en Colores Pastel", image: pistaPastel },
]

export const charactersData = [
    { id: 1, name: "Mario Bros", image: marioBros },
    { id: 2, name: "Knuckles", image: knuckles },
    { id: 3, name: "Among Us", image: amongUs },
]

// Mapa de datasets
export const dataMap = {
    cars: carsData,
    characters: charactersData,
    backgrounds: backgroundsData,
};