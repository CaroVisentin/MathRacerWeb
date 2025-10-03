export const reglas = {
    descripcion: "Math Racer es un juego de carreras donde para avanzar en la pista deberás resolver ecuaciones correctamente. " +
        "Cada respuesta acertada hace que tu auto avance y te acerque a la meta. " +
        "Si respondes mal, verás la respuesta correcta y recibirás otra ecuación para continuar con el juego.",
    tipos_de_desafios: [
        {
            id: "mayor_y",
            titulo: "Encuentra el valor de x para que y sea el número mayor posible",
        },
        {
            id: "menor_y",
            titulo: "Encuentra el valor de x para que y sea el número menor posible",
        },
        {
            id: "resultado_indicado",
            titulo: "Encuentra el valor de x para que la ecuación dé el resultado indicado",
        }
    ],
    modos_de_juego: [
        {
            id: "multijugador",
            titulo: "MULTIJUGADOR",
            descripcion: "Compite contra otros jugadores en carreras rápidas. Gana el que llegue primero a la meta. Cada victoria te da puntos para subir en el ranking"
        },
        {
            id: "historia",
            titulo: "HISTORIA",
            descripcion: "Juega solo contra la máquina, avanza por niveles y mundos con dificultad creciente. Al superar niveles recibes monedas o premios sorpresa."
        },
    ],
    vidas: "El modo HISTORIA cuenta con 3 vidas, al perder un nivel perderá una vida. Las mismas se recargarán con tiempo o canjeandolas por monedas."
};