import { useState, useEffect } from "react";
import auto1 from "../../../assets/images/auto.png";
import { ModalFinMultijugador } from "../../../shared/modals/modalFinMultijugador";
import type { JugadorDto } from "../../../types/jugador/jugador";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FuelIndicator } from "../../../shared/energia/energia";
import { Comodines } from "../../../shared/comodines/comodines";
import connection from "../../../signalR/conexion";
import { ModalBuscandoRival } from "../../../shared/modals/modalBuscandoRival";

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
    const [posicionAuto2, setPosicionAuto2] = useState<number>(0);
    const [acierto, setAcierto] = useState<number>(0);
    const [ganador, setGanador] = useState<boolean>(false);
    const [vidasRestantes, setVidasRestantes] = useState(3);
    const [jugadoresPartida, setJugadoresPartida] = useState<JugadorDto[]>([]);
    const [buscandoRival,setBuscandoRival]= useState(true);
    const [jugadoresConectados, setJugadoresConectados] = useState<number>(0);
    const [jugadorId, setJugadorId] = useState<number | null>(null);
    const [nombreJugador,setNombreJugador] = useState<string>("");
    const [partidaId, setPartidaId] = useState<number| null>(null);
    const [instruccion, setInstruccion] = useState<string>("");
    const [perdedor, setPerdedor]= useState<boolean>(false);
    const cerrarModal = () => setGanador(false);

    const reiniciarJuego = () => {
        setGanador(false);
        setPerdedor(false);
        setAcierto(0);
        setPosicionAuto1(0);
        setPosicionAuto2(0);
            setContador(5);
        setVidasRestantes(3);
        setResultado(null);
        setRespuestaSeleccionada(null);
        setBuscandoRival(true);
        conectarJugador();
      
    }

       const handleVolver = () => {
        console.log("Volver");
    };

    useEffect(() => {
       connection.on("GameUpdate", (data) => {
      console.log("GameUpdate recibido:", data);
      console.log("Jugador recibido:", data.player?.name);
console.log("Jugador actual:", jugadorId);

      const jugadoresActualizados = data.players.map((p: any) => ({
          nombreJugador: p.name,
          nivelJugador: p.level,
            autoId: p.carId,
            puntos: p.score,
        }));
      setJugadoresPartida(jugadoresActualizados);
      setJugadoresConectados(jugadoresActualizados.length);

      const jugadorActual = data.players.find((p:any)=> 
        p.name.trim().toLowerCase() === nombreJugador.trim().toLowerCase());
      
      const otroJugador = data.players.find((p: any) => p.id !== jugadorActual.id);

if (otroJugador) {
  const avanceOtro = (otroJugador.correctAnswers / 10) * 100;
  setPosicionAuto2(avanceOtro);
}
      if(jugadorActual){
        setJugadorId(jugadorActual.id);      
  const avance = (jugadorActual.correctAnswers / 10) * 100; // 100% es la meta
  setPosicionAuto1(avance);
      }

  // Mostrar resultado (correcto/error)
  if (respuestaSeleccionada !== null && respuestaCorrecta !== undefined) {
   // const opciones = ecuacion?.options || [];
  //  const fueCorrecta = opciones.includes(respuestaSeleccionada);
  const fueCorrecta = respuestaSeleccionada === respuestaCorrecta; 
    setResultado(fueCorrecta ? "acierto" : "error");
    if (!fueCorrecta) {
      setVidasRestantes(prev => prev - 1);
    }
      }  

          // Ganador
  if (data.winnerId && jugadorActual) {
    if (data.winnerId === jugadorActual.id){
setGanador(true);
setPerdedor(false);
    } else{
    setPerdedor(true);
    setGanador(false);
  }
}

      if(jugadoresActualizados.length >=2){
         setBuscandoRival(false);
      }      

      if (data.currentQuestion) {
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
        setInstruccion(data.currentQuestion.instruccion)  ;
      }
    });

     return () => {
            connection.off("GameUpdate");
        };
    }, [nombreJugador]);

    
const conectarJugador = async () => {
  if (!nombreJugador.trim()) return;

  try {
    await connection.invoke("FindMatch", nombreJugador);
    console.log("Buscando partida...", nombreJugador);
  } catch (error) {
    console.error("Error al buscar partida:", error);
  }
};
    const tiempoAgotado = async (respuestaSeleccionada: number | null) => {
  if (ganador || !partidaId || respuestaSeleccionada === null) return;
    try {
    await connection.invoke("SendAnswer",partidaId,jugadorId,respuestaSeleccionada.toString());
    console.log("Respuesta enviada:", respuestaSeleccionada);
    } catch (error) {
    console.error("Error al enviar respuesta:", error);
    }
};

const manejarRespuesta = (opcion: number) => {
    setRespuestaSeleccionada(opcion);
    tiempoAgotado(opcion);
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
            {/*modal de busqueda de rival*/}
            { buscandoRival && (
                <ModalBuscandoRival
                jugadorId={nombreJugador}
                setJugadorId={setNombreJugador}
                onConectar={conectarJugador}/>)}

            {/* Modal de fin de partida */}
            {ganador && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <ModalFinMultijugador
                        jugadores={jugadoresPartida}
                        jugadorActual={nombreJugador}
                        gano={true}
                        onClose={cerrarModal}
                        onRetry={reiniciarJuego}
                    />
                </div>
            )}

            {perdedor &&(
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <ModalFinMultijugador
                jugadores={jugadoresPartida}
                jugadorActual={nombreJugador}
                gano={false}
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
                    className="absolute bottom-[180px] auto left-[0%] auto2" 
                   style={{ left: `${posicionAuto2}%` }} />
            </div>

            {/* Instrucciones y Comodines */}
            <div className="flex justify-center items-center gridComodin mt-4">
                <div className="instruccion">
                    {instruccion
                    ? `Elegí la opción para que Y sea ${instruccion.toUpperCase()}`
                    :"esperando instruccion"  }
                   
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
