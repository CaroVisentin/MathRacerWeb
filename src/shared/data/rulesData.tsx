export const rules = {
    description: "Math Racer es un juego de carreras donde para avanzar en la pista deberás resolver ecuaciones correctamente. " +
        "Cada respuesta acertada hace que tu auto avance y te acerque a la meta. " +
        "Si respondes mal, verás la respuesta correcta y recibirás otra ecuación para continuar con el juego.",
    challenge_types: [
        {
            id: "mayor_y",
            title: "Encuentra el valor de x para que y sea el número mayor posible",
        },
        {
            id: "menor_y",
            title: "Encuentra el valor de x para que y sea el número menor posible",
        },
        {
            id: "resultado_indicado",
            title: "Encuentra el valor de x para que la ecuación dé el resultado indicado",
        }
    ],
    game_modes: [
        {
            id: "multijugador",
            title: "MULTIJUGADOR",
            description: "Compite contra otros jugadores en carreras rápidas. Gana el que llegue primero a la meta. Cada victoria te da puntos para subir en el ranking"
        },
        {
            id: "historia",
            title: "HISTORIA",
            description: "Juega solo contra la máquina, avanza por niveles y mundos con dificultad creciente. Al superar niveles recibes monedas o premios sorpresa."
        },
    ],
    lives: "El modo HISTORIA cuenta con 3 vidas, al perder un nivel perderá una vida. Las mismas se recargarán con tiempo o canjeandolas por monedas."
};