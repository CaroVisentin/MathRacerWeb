import { useState, useEffect } from "react";
import auto1 from "../assets/images/auto.png";
import { ModalFinMultijugador } from "../shared/modals/modalFinMultijugador";
import type { JugadorDto } from "../types/jugador/jugador";
import fondoCielo from "../assets/images/fondo2.png";

interface Ecuacion {
    x: number;
    y: number;
}

export const JuegoMultijugador = () => {
    const [ecuacion, setEcuacion] = useState<Ecuacion>({ x: 9, y: 10 });
    const [opciones, setOpciones] = useState<number[]>([9, 10]);
    const [respuestaCorrecta, setRespuestaCorrecta] = useState<number>(9);
    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<number | null>(null);
    // const [vidas, setVidas] = useState<number>(3);
    const [contador, setContador] = useState<number>(5);
    const [resultado, setResultado] = useState<"acierto" | "error" | null>(null);
    const [posicionAuto1, setPosicionAuto1] = useState<number>(0);
    const [acierto, setAcierto] = useState<number>(0);
    const [ganador, setGanador] = useState<boolean>(false);
    const jugadores: JugadorDto[]= [
        {nombreJugador : "mariela", nivelJugador:7548 , autoId: 1, puntos: acierto},
        { nombreJugador: "jugador2", nivelJugador: 2542,autoId: 2, puntos: 4},
    ];
    const cerrarModal = () => setGanador(false);

    const reiniciarJuego = ()=>{
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

                // else {setPosicionAuto2(posicionAuto2 +10)} seria el rivall 
                if (total >= 10) {
                    setGanador(true);
                }
                return total;
            });

        } else {
            setResultado("error");
            //  setVidas(vidas - 1);
            // si erramos podemos hacer algo a favor del otro
        }

        setTimeout(() => {
            if (!ganador) {
                generarNuevaEcuacion(); //cambiar porque pida de la api
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

    return (
        <div className="juego">

            
 {/* Modal de fin de partida */}
     
{ganador && (
  <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <ModalFinMultijugador 
        jugadores= {jugadores}
        jugadorActual="mariela"
        gano={true}
        onClose={cerrarModal}
        onRetry={reiniciarJuego}/>
  </div>
)}

            {/*fondo cielo*/}
            <div className="filas fondoCielo w-full "></div>
            
            {/*contenido del juego*/}
            
                {/*ruta*/}
                <div className="filas fondoRuta w-full  relative" >
                    {/*auto1*/}
                    <img src={auto1}
                        alt="Auto 1"
                        className="absolute bottom-[120px] auto transition-all duration-500"
                        style={{ left: `${posicionAuto1}%` }} />

                    {/*auto2*/}
                    <img src={auto1}
                        alt="Auto 2"
                        className="absolute bottom-[180px] auto left-[0%] auto2" />
                </div>

                {/*vidas*
                <div className="absolute right-6 text-lg text-white bg-black/50 px-4 py-2 rounded">
                    <i className="ri-oil-line"></i>
                    <span>Vidas: </span>
                </div>*/}

                {/*instrucciones*/}
                <div className="filas gridComodin">
                <div className="instruccion">
                    Elegí la opcon para que Y sea MAYOR
                </div>

                <div className="comodin">
                    <button>comodin1</button>
                    <button>comodin2</button>
                    <button>comodin3</button>
                </div>
                </div>

                {/*ecuacion*/}
                <div className="filas ecuacion">
                   <h2> y = {ecuacion.x} + 5 </h2>
                </div>

                {/*opciones*/}
                <div className="filas opciones">
                    {opciones.map((opcion, i) => (
                        <button
                            key={i}
                            onClick={() => tiempoAgotado(opcion)}
                            className="bg-white border-2 border-black px-6 py-3 rounded-lg text-xl hover:bg-yellow-200 transition"  >
                            {opcion}</button>
                    ))}
                </div>

                {/*resultado*/}
                <div className="text-center text-2xl font-bold mt-4 ">
                    <i className={`ri-check-line text-green-500 ${resultado === "acierto" ? "opacity-100" : "opacity-0"}`}></i>
                    <i className={`ri-close-line text-red-500 ${resultado === "error" ? "opacity-100" : "opacity-0"}`}></i>
                </div>

                {/*contador*/}
                <div className="text-center text-lg text-gray-700 mt-2">
                    <i className="ri-time-line"></i>
                    <span> Tiempo: {contador}s </span>
                </div>
            
        </div>

    );
}
