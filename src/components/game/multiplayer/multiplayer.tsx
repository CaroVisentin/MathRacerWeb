import { useState, useEffect } from "react";
import auto1 from "../../../assets/images/auto.png";
import { EndOfMultiplayerModeModal } from "../../../shared/modals/endOfMultiplayerModeModal";
import type { JugadorDto } from "../../../models/ui/jugador";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Wildcards } from "../../../shared/wildcards/wildcards";
import connection from "../../../services/signalR/connection";
import { LookingForRivalModal } from "../../../shared/modals/lookingForRivalModal";
import type { QuestionResponseDto } from "../../../models/domain/questionResponseDto";
import type { PlayerDto } from "../../../models/domain/playerDto";


export const MultiplayerGame = () => {
    
    const [ecuacion, setEcuacion] = useState<QuestionResponseDto>();
    const [opciones, setOpciones] = useState<number[]>();
    const [respuestaCorrecta, setRespuestaCorrecta] = useState<number>();
    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<number | null>(null);

  

    const [resultado, setResultado] = useState<"acierto" | "error" | null>(null);
    const [posicionAuto1, setPosicionAuto1] = useState<number>(0);
    const [posicionAuto2, setPosicionAuto2] = useState<number>(0);
    const [acierto, setAcierto] = useState<number>(0);
    const [ganador, setGanador] = useState<boolean>(false);
    const [jugadoresConectados, setJugadoresConectados] = useState<number>(0);
   
    const [jugadoresPartida, setJugadoresPartida] = useState<JugadorDto[]>([]);
    const [buscandoRival, setBuscandoRival] = useState(true);
    const [jugadorId, setJugadorId] = useState<number | null>(null);
    const [nombreJugador, setNombreJugador] = useState<string>("");
    const [nombreRival, setNombreRival] = useState<string>("");
    const [partidaId, setPartidaId] = useState<number | null>(null);
    const [instruccion, setInstruccion] = useState<string>("");
    const [perdedor, setPerdedor] = useState<boolean>(false);
    const [penalizado, setPenalizado] = useState<boolean>(false);
    const [errorConexion, setErrorConexion] = useState<string | null>(null);

    const cerrarModal = () => setGanador(false);

    const reiniciarJuego = () => {
        setGanador(false);
        setPerdedor(false);
        setAcierto(0);
        setPosicionAuto1(0);
        setPosicionAuto2(0);
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
            const jugadoresActualizados = data.players.map((p: JugadorDto) => ({
                nombreJugador: p.nombreJugador,
                nivelJugador: p.nivelJugador,
                autoId: p.autoId,
                puntos: p.puntos,
            }));

            setJugadoresPartida(jugadoresActualizados);
            setJugadoresConectados(jugadoresActualizados.length);

            const jugadorActual = data.players.find(
                (p: PlayerDto) => p.name.trim().toLowerCase() === nombreJugador.trim().toLowerCase() );
            const otroJugador = data.players.find((p: PlayerDto) => p.id !== jugadorActual?.id);
            

            // Actualizar posiciones en porcentaje
            if (jugadorActual) {
                setJugadorId(jugadorActual.id);
                const avance = (jugadorActual.correctAnswers / 10) * 100;
                setPosicionAuto1(avance);
            }
            
            if (otroJugador) {
                const avanceOtro = (otroJugador.correctAnswers / 10) * 100;
                setPosicionAuto2(avanceOtro);
            }

             
            if (data.winnerId && jugadorActual) {
             if (data.winnerId === jugadorActual.id){
            setGanador(true);
            setPerdedor(false);
             } else{
            setPerdedor(true);
            setGanador(false);
             }
            }

             if (jugadoresActualizados.length >= 2) setBuscandoRival(false);

                       // Actualizar pregunta
            if (data.currentQuestion) {
                setPartidaId(data.gameId);
                setEcuacion({
                    questionId: data.currentQuestion.id,
                    equation: data.currentQuestion.equation,
                    options: data.currentQuestion.options,
                    correctAnswer: data.currentQuestion.correctAnswer,
                });
                setOpciones(data.currentQuestion.options);
                setRespuestaCorrecta(data.currentQuestion.correctAnswer);
                //setContador(10);
                setRespuestaSeleccionada(null);
                setResultado(null);
                setInstruccion(data.expectedResult);
            }
        });

        return () => connection.off("GameUpdate");
    }, [nombreJugador, respuestaSeleccionada]);

       useEffect(() =>{ 
        if (respuestaSeleccionada !== null && respuestaCorrecta !== undefined) {
  const fueCorrecta = respuestaSeleccionada === respuestaCorrecta; 
    setResultado(fueCorrecta ? "acierto" : "error");
    if (!fueCorrecta) {
      setPenalizado(true);
      setTimeout(() => setPenalizado(false),2000);
    }
      }  
    }, [respuestaSeleccionada,respuestaCorrecta]);


    const conectarJugador = async () => {
        if (!nombreJugador.trim()) return;

        try {
            await connection.invoke("FindMatch", nombreJugador);
            console.log("Buscando partida...", nombreJugador);
        } catch (error) {
            setErrorConexion(" Erro de conexion... volvamos a intentarlo");
            console.error("Error al buscar partida:", error);

        }
    };

     const manejarRespuesta = async (opcion: number) => {
   setRespuestaSeleccionada(opcion);
    await  tiempoAgotado(opcion);
    
    setTimeout(() => {
   
   setRespuestaSeleccionada(null);
   setResultado(null);
  }, 3000);
  };
    const tiempoAgotado = async (respuestaSeleccionada: number | null) => {
        if (ganador || !partidaId || respuestaSeleccionada === null) return;
        try {
            await connection.invoke("SendAnswer", partidaId, jugadorId, respuestaSeleccionada);
            console.log("Respuesta enviada:", respuestaSeleccionada);
        } catch (error) {
            console.error("Error al enviar respuesta:", error);
        }
    };
    
    return (

        <div className="juego w-full h-full bg-black text-white relative">

            {/* HEADER */}
            <div className="flex justify-between items-center bg-black absolute top-0 left-0 w-full z-10">
                <button
                    onClick={handleVolver}
                    className="px-3 py-1 rounded"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            </div>
            {/*modal de busqueda de rival*/}
            {buscandoRival && (
                <LookingForRivalModal
                    playerId={nombreJugador}
                    setPlayerId={setNombreJugador}
                    onConnection={conectarJugador} />)}

            {/* Modal de fin de partida */}
            {ganador && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <EndOfMultiplayerModeModal
                        players={jugadoresPartida}
                        currentPlayer={nombreJugador}
                        won={true}
                        onClose={cerrarModal}
                        onRetry={reiniciarJuego}
                    />
                </div>
            )}

            {perdedor && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <EndOfMultiplayerModeModal
                        players={jugadoresPartida}
                        currentPlayer={nombreJugador}
                        won={false}
                        onClose={cerrarModal}
                        onRetry={reiniciarJuego}
                    />
                </div>
            )}

            {/* Fondo cielo */}
            <div className="flex justify-center items-center fondoCielo w-full"></div>


         {/* Ruta */}
<div className="flex justify-center items-center fondoRuta w-full relative mt-20">

  {/* Nombre del Jugador 1 (Vos) */}
  <div
    className="absolute bottom-[120px]  text-green-500  text-l ml-2"
    style={{ 
        left: `${posicionAuto1}%`,
        top: '80%',
        transform: 'translateX(0%)' }}
  >
    {nombreJugador}
  </div>

  {/* Auto 1 */}
  <img
    src={auto1}
    alt="Auto 1"
    className="absolute bottom-[120px] auto transition-all duration-500"
    style={{ left: `${posicionAuto1}%` }}
  />

  {/* Nombre del Jugador 2 (Rival) */}
  <div
    className="absolute bottom-[180px] text-red-500 letf-2 t-8  text-l ml-2"
    style={{ left: `${posicionAuto2}%`,
    top: '7%',
        transform: 'translateX(0%)' }}
    
  >
    rival
  </div>

  {/* Auto 2 */}
  <img
    src={auto1}
    alt="Auto 2"
    className="absolute bottom-[180px] auto auto2"
    style={{ left: `${posicionAuto2}%` }}
  />
</div>

            {/* Instrucciones y Comodines */}
            <div className="flex justify-center items-center gridComodin mt-4">
                <div className="instruccion">
                    {instruccion
                        ? `Elegí la opción para que Y sea ${instruccion.toUpperCase()}`
                        : "esperando instruccion"}

                </div>
                <div className="comodin">
                    <Wildcards
                        fireExtinguisher={3}
                        changeEquation={1}
                        dobleCount={5}
                    />
                </div>
            </div>

            {/* Ecuación */}
            <div className="flex flex-col justify-center items-center h-full gap-10 mb-10">
                <div className="flex justify-center mb-6">
                    <div className="inline-block border-2 border-white rounded-lg text-6xl px-6 py-3">
                        {/* Mostrar ecuación solo si está definida */}
                        {ecuacion?.equation && <span>{ecuacion.equation}</span>}
                    </div>
                </div>
                {/* si anda mal error de conexion */}
                {errorConexion && (
                    <div className="text-red-600 text-lg mt-4">
                        {errorConexion}
                    </div>
                )}

                {/* Opciones */}
                <div className="flex justify-center items-center mt-6 gap-6 opciones">
                    {opciones?.map((opcion, i) => {
                        let clases = "border-2 border-white px-6 py-3 rounded-lg text-xl transition ";

                        if (respuestaSeleccionada !== null) {
                            if (respuestaSeleccionada === opcion) {
                                clases += resultado === "acierto" ? "bg-green-400" : "bg-red-500";
                            } else if (
                                resultado === "error" && opcion === respuestaCorrecta) {
                                clases += "bg-green-400";// mostrar cuál era la correcta


                            } else {
                                clases += "bg-transparent";
                            }
                        } else {
                            clases += "bg-transparent hover:bg-blue-500";
                        }
                        return (
                            <button
                                key={i}
                                onClick={() => manejarRespuesta(opcion)}
                                className={clases}
                                disabled={!!respuestaSeleccionada}
                            >
                                {opcion}
                            </button>
                        );
                    })}
                    {penalizado && (
                        <div className="text-red-500 text-xl mt-4">
                            ¡Respuesta incorrecta! Penalización de 2 segundos.
                        </div>
                    )}

                </div>
            </div>

        </div>
    );
};
