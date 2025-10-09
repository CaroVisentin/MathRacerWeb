import { useState, useEffect } from "react";
import auto1 from "../../../assets/images/auto.png";
import { ModalFinMultijugador } from "../../../shared/modals/modalFinMultijugador";
import type { JugadorDto } from "../../../types/jugador/jugador";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FuelIndicator } from "../../../shared/energia/energia";
import { Comodines } from "../../../shared/comodines/comodines";
//import { crearPartida, unirsePartida, obtenerEcuacion,responderEcuacion } from "../../../api/partidaApi";
import connection from "../../../signalR/conexion";

interface Ecuacion {
    equationString: string;
    options : number[];
    correctAnswer: number;
}

export const JuegoMultijugador = () => {
    const [ecuacion, setEcuacion] = useState<Ecuacion>();
    const [opciones, setOpciones] = useState<number[]>();
    const [respuestaCorrecta, setRespuestaCorrecta] = useState<number>();
    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<number | null>(null);
    const [contador, setContador] = useState<number>(5);
    const [resultado, setResultado] = useState<"acierto" | "error" | null>(null);
    const [posicionAuto1, setPosicionAuto1] = useState<number>(0);
    const [acierto, setAcierto] = useState<number>(0);
    const [ganador, setGanador] = useState<boolean>(false);
    const [vidasRestantes, setVidasRestantes] = useState(3);
    const [jugadoresPartida, setJugadoresPartida] = useState<JugadorDto[]>([]);

   //const jugadores: JugadorDto[] = [
  //     { nombreJugador: "mariela", nivelJugador: 7548, autoId: 1, puntos: acierto },
   //   { nombreJugador: "jugador2", nivelJugador: 2542, autoId: 2, puntos: 4 },
   //];

    const [jugadorId] = useState<string> ("mariela");

    const [partidaId, setPartidaId] = useState<string | null>(null);

    const cerrarModal = () => setGanador(false);

    const reiniciarJuego = () => {
        setGanador(false);
        setAcierto(0);
        setPosicionAuto1(0);
        setContador(5);
        setVidasRestantes(3);
        setResultado(null);
        setRespuestaSeleccionada(null);
      
    }

       const handleVolver = () => {
        console.log("Volver");
    };

    useEffect(() => {
        const iniciarPartida = async () => {
            try {
                await connection.invoke("FindMatch", jugadorId);
                console.log("Buscando partida...", jugadorId);
            } catch (error) {
                console.error("Error al buscar partida:", error);
            }
        };
         connection.on("GameUpdate", (data) => {
      console.log("GameUpdate recibido:", data);

      if (data.player?.name === jugadorId && data.currentQuestion) {
        setPartidaId(data.gameId);
        setEcuacion({
          equationString: data.currentQuestion.equation,
          options: data.currentQuestion.options,
          correctAnswer: data.currentQuestion.correctAnswer,
        });
        setOpciones(data.currentQuestion.options);
        setRespuestaCorrecta(data.currentQuestion.correctAnswer);
        setContador(5);
        setRespuestaSeleccionada(null);
        setResultado(null);

        const jugadoresActualizados = data.players.map((p: any) => ({
          nombreJugador: p.name,
          nivelJugador: p.level,
            autoId: p.carId,
            puntos: p.score,
        }));
        setJugadoresPartida(jugadoresActualizados);
      }
    });
        iniciarPartida();

        return () => {
            connection.off("GameUpdate");
        };
    }, []);

    const tiempoAgotado = async (respuestaSeleccionada: number | null) => {
  if (ganador || !partidaId || respuestaSeleccionada === null) return;
    try {
    await connection.invoke("SubmitAnswer",partidaId,jugadorId,respuestaSeleccionada);
    console.log("Respuesta enviada:", respuestaSeleccionada);
    } catch (error) {
    console.error("Error al enviar respuesta:", error);
    }
};

const manejarRespuesta = (opcion: number) => {
    setRespuestaSeleccionada(opcion);
    tiempoAgotado(opcion);
  };

  




        /*}
    useEffect(()=>{
        const iniciarPartida = async () =>{
            try{
                const partida = await crearPartida(jugadorId);
                if (!partida?.gameId) {
  console.error("La partida no devolvió un ID válido:", partida);
  return;
}

                setPartidaId(partida.gameId);
    // Simular otro jugador uniéndose (para pruebas)
                await unirsePartida(partida.gameId, "fulanini");

                const ecuacion = await obtenerEcuacion(partida.gameId, jugadorId);
                console
                setEcuacion({ 
                    equationString: ecuacion.equationString ,
                     options: ecuacion.options, 
                     correctAnswer: ecuacion.correctAnswer });
            
                setOpciones(ecuacion.opciones);
                setRespuestaCorrecta(ecuacion.respuestaCorrecta);
                
            } catch (error){
                console.error("error al iniciar la partida", error);
            }
        };
        iniciarPartida();
    }, []);


    const tiempoAgotado = async (respuestaSeleccionada: number | null) => {
  if (ganador || !partidaId || respuestaSeleccionada === null) return;

  try {
    const resultadoApi = await responderEcuacion(partidaId, jugadorId,respuestaSeleccionada);

    if (resultadoApi.correcta) {
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
        setVidasRestantes(vidasRestantes - 1);
      }
    }

    setTimeout(async () => {
      if (!ganador) {
        const nuevaEcuacion = await obtenerEcuacion(partidaId, jugadorId);
        setEcuacion({ 
           equationString: nuevaEcuacion.equationString,
           options: nuevaEcuacion.options, 
           correctAnswer: nuevaEcuacion.correctAnswer
        });
        setOpciones(nuevaEcuacion.opciones);
        setRespuestaCorrecta(nuevaEcuacion.respuestaCorrecta);
        setRespuestaSeleccionada(null);
        setResultado(null);
        setContador(5);
      }
    }, 1000);

    
  } catch (error) {
    console.error("Error al responder:", error);
  }*/

   
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
                        jugadores={jugadoresPartida}
                        jugadorActual={jugadorId}
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
                      {/* Mostrar ecuación solo si está definida */}
                      {ecuacion?.equationString && <span>{ecuacion.equationString}</span>}
                    </div>
                </div>

                {/* Opciones */}
                <div className="flex justify-center items-center mt-6 gap-6 opciones">
                    {opciones?.map((opcion, i) => {
                        let bgColor = "";
                        if (respuestaSeleccionada === opcion) {
                            if (resultado === "acierto") bgColor = "#a6ff00";
                            else if (resultado === "error") bgColor = "#ff0040";
                        }

                        return (
                            <button
                                key={i}
                                onClick={() => manejarRespuesta(opcion)}
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
};
