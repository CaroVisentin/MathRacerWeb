import { useState, useEffect } from "react";
import auto1 from "../../../assets/images/auto.png";
import { ModalFinMultijugador } from "../../../shared/modals/modalFinMultijugador";
import type { JugadorDto } from "../../../types/jugador/jugador";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FuelIndicator } from "../../../shared/energia/energia";
import { Comodines } from "../../../shared/comodines/comodines";

interface Ecuacion {
    x: number;
    y: number;
}

export const JuegoMultijugador = () => {
    const [ecuacion, setEcuacion] = useState<Ecuacion>({ x: 9, y: 10 });
    const [opciones, setOpciones] = useState<number[]>([9, 10]);
    const [respuestaCorrecta, setRespuestaCorrecta] = useState<number>(9);
    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<number | null>(null);
    const [contador, setContador] = useState<number>(5);
    const [resultado, setResultado] = useState<"acierto" | "error" | null>(null);
    const [posicionAuto1, setPosicionAuto1] = useState<number>(0);
    const [acierto, setAcierto] = useState<number>(0);
    const [ganador, setGanador] = useState<boolean>(false);
    const [vidasRestantes, setVidasRestantes] = useState(3);

    const jugadores: JugadorDto[] = [
        { nombreJugador: "mariela", nivelJugador: 7548, autoId: 1, puntos: acierto },
        { nombreJugador: "jugador2", nivelJugador: 2542, autoId: 2, puntos: 4 },
    ];

    const cerrarModal = () => setGanador(false);

    const reiniciarJuego = () => {
        setGanador(false);
        setAcierto(0);
        setPosicionAuto1(0);
        setContador(5);
        generarNuevaEcuacion();
    }

    useEffect(() => {
        if (ganador) return;
        if (contador > 0) {
            const timer = setTimeout(() => setContador(contador - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            tiempoAgotado(null);
        }
    }, [contador, ganador]);

    const tiempoAgotado = (respuestaSeleccionada: number | null) => {
        if (ganador) return;
        if (respuestaSeleccionada === respuestaCorrecta) {
            setResultado("acierto");
            setAcierto((a) => {
                const total = a + 1;
                setPosicionAuto1(posicionAuto1 + 10);
                if (total >= 10) setGanador(true);
                return total;
            });
        } else {
            setResultado("error");

            if (vidasRestantes > 0) {
                setVidasRestantes(vidasRestantes - 1)
            } else {
                // Dar el juego por terminado si no tiene vidas restantes
            }
        }

        setTimeout(() => {
            if (!ganador) {
                generarNuevaEcuacion();
                setRespuestaSeleccionada(null);
                setResultado(null);
                setContador(5);
            }
        }, 1000);
    };

    const generarNuevaEcuacion = () => {
        const nuevoX = Math.floor(Math.random() * 10) + 1;
        const nuevoY = nuevoX + 5;
        const nuevasOpciones = [nuevoY, nuevoY + 5];
        setEcuacion({ x: nuevoX, y: nuevoY });
        setOpciones(nuevasOpciones);
        setRespuestaCorrecta(nuevoY);
    };

    const handleVolver = () => {
        console.log("Volver");
    };

    return (
        <div className="juego w-full h-full bg-black text-white relative">

            {/* HEADER */}
            <div className="flex justify-between items-center p-4 bg-black absolute top-0 left-0 w-full z-10">
                <button
                    onClick={handleVolver}
                    className="px-3 py-1 rounded"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>

                <div className="text-white text-6xl">
                    {contador}s
                </div>

                {/* Vidas */}
                <FuelIndicator vidasRestantes={vidasRestantes} />
            </div>

            {/* Modal de fin de partida */}
            {ganador && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <ModalFinMultijugador
                        jugadores={jugadores}
                        jugadorActual="mariela"
                        gano={true}
                        onClose={cerrarModal}
                        onRetry={reiniciarJuego}
                    />
                </div>
            )}

            {/* Fondo cielo */}
            <div className="flex justify-center items-center fondoCielo w-full"></div>

            {/* Ruta */}
            <div className="flex justify-center items-center fondoRuta w-full relative mt-20">
                <img src={auto1}
                    alt="Auto 1"
                    className="absolute bottom-[120px] auto transition-all duration-500"
                    style={{ left: `${posicionAuto1}%` }} />
                <img src={auto1}
                    alt="Auto 2"
                    className="absolute bottom-[180px] auto left-[0%] auto2" />
            </div>

            {/* Instrucciones y Comodines */}
            <div className="flex justify-center items-center gridComodin mt-4">
                <div className="instruccion">
                    Elegí la opción para que Y sea MAYOR
                </div>
                <div className="comodin">
                    <Comodines
                        matafuego={3}
                        sync={1}
                        thunder={5}
                    />
                </div>
            </div>

            {/* Ecuación */}
            <div className="flex flex-col justify-center items-center h-full gap-10 mb-10">
                <div className="flex justify-center mb-6">
                    <div className="inline-block border-2 border-white rounded-lg text-6xl px-6 py-3">
                        y = {ecuacion.x} + 5
                    </div>
                </div>

                {/* Opciones */}
                <div className="flex justify-center items-center mt-6 gap-6 opciones">
                    {opciones.map((opcion, i) => {
                        let bgColor = "";
                        if (respuestaSeleccionada === opcion) {
                            if (resultado === "acierto") bgColor = "#a6ff00";
                            else if (resultado === "error") bgColor = "#ff0040";
                        }

                        return (
                            <button
                                key={i}
                                onClick={() => {
                                    setRespuestaSeleccionada(opcion);
                                    tiempoAgotado(opcion);
                                }}
                                className="border-2 border-white px-6 py-3 rounded-lg text-xl transition"
                                style={{ backgroundColor: bgColor }}
                            >
                                {opcion}
                            </button>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}
