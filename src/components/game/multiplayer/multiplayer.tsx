import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HubConnection } from "@microsoft/signalr";
import { buildConnection } from '../../../services/signalR/connection';
import type { QuestionDto } from '../../../models/domain/questionDto';
import { LookingForRivalModal } from '../../../shared/modals/lookingForRivalModal';
import type { PlayerDto } from '../../../models/domain/playerDto';
import { EndOfMultiplayerModeModal } from '../../../shared/modals/endOfMultiplayerModeModal';
import { Wildcards } from '../../../shared/wildcards/wildcards';
import auto1 from "../../../assets/images/auto.png";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import type { GameUpdateDto } from '../../../models/domain/gameUpdateDto';
import { delay, motion } from 'framer-motion';

export const MultiplayerGame = () => {

    const [connection, setConnection] = useState<HubConnection | null>(null);

    const [ecuacion, setEcuacion] = useState<QuestionDto>();
    const [opciones, setOpciones] = useState<number[]>();
    // const [respuestaCorrecta, setRespuestaCorrecta] = useState<boolean>(false);
    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<number | null>(null);

    const [resultado, setResultado] = useState<"acierto" | "error" | null>(null);
    const [posicionAuto1, setPosicionAuto1] = useState<number>(0);
    const [posicionAuto2, setPosicionAuto2] = useState<number>(0);
    const [ganador, setGanador] = useState<boolean>(false);

    const [jugadoresPartida, setJugadoresPartida] = useState<PlayerDto[]>([]);
    const [buscandoRival, setBuscandoRival] = useState(true);
    const [jugadorId, setJugadorId] = useState<number | null>(null);

    const [nombreJugador, setNombreJugador] = useState<string>("");
    const [partidaId, setPartidaId] = useState<number | null>(null);
    const [instruccion, setInstruccion] = useState<string>("");
    const [perdedor, setPerdedor] = useState<boolean>(false);
    const [penalizado, setPenalizado] = useState<boolean>(false);
    const [errorConexion, setErrorConexion] = useState<string | null>(null);
    const [mensajeResultado, setMensajeResultado] = useState<string | null>(null);

    const fondos = [

        'pista-noche.png',
        'pista-dia.png',
        'pista-atardecer.png'
    ];

    const [fondoJugador, setFondoJugador] = useState<string>('');
    const [fondoRival, setFondoRival] = useState<string>('');


    const cerrarModal = () => setGanador(false);

    // useCallback para evitar re-creaciones innecesarias
    const conectarJugador = useCallback(async () => {
        if (!nombreJugador.trim() || !connection) return; // Verificar si la conexión está lista

        try {
            await connection.invoke("FindMatch", nombreJugador);
            console.log("Buscando partida...", nombreJugador);
            setErrorConexion(null); // Limpiar error si la conexión es exitosa
        } catch (error) {
            setErrorConexion("Error de conexión... volvamos a intentarlo");
            console.error("Error al buscar partida:", error);
        }
    }, [nombreJugador, connection]); // Depende de connection y nombreJugador

    const reiniciarJuego = () => {
        setGanador(false);
        setPerdedor(false);
        setPosicionAuto1(0);
        setPosicionAuto2(0);
        setResultado(null);
        setRespuestaSeleccionada(null);
        setBuscandoRival(true);
        conectarJugador(); // Llama a la función ahora con useCallback
    }

    const handleVolver = () => {
        console.log("Volver");
        // Agregar lógica para abandonar partida
        
        setGanador(false);
        setPerdedor(true);
        if (connection) connection.stop();
        
        
        // Detener la conexión manualmente, antes de que se desmonte el componente
    };

    const sendAnswer = useCallback(async (respuestaSeleccionada: number | null) => {
        if (ganador || !partidaId || respuestaSeleccionada === null || !connection) return;
        try {
            await connection.invoke("SendAnswer", partidaId, jugadorId, respuestaSeleccionada);
            console.log("Respuesta enviada:", respuestaSeleccionada);
        } catch (error) {
            console.error("Error al enviar respuesta:", error);
        }
    }, [ganador, partidaId, jugadorId, connection]);

    const manejarRespuesta =  async(opcion: number) => {
        setRespuestaSeleccionada(opcion);
        console.log("respuestacorrecta", ecuacion);
        console.log("opcion", opcion);

        if (ecuacion && opcion === ecuacion.correctAnswer) {
            setResultado("acierto");
            setPenalizado(false);
            setMensajeResultado("¡Correcto!");
            setTimeout(() => setMensajeResultado(null),1500);
           console.log("acierto");
        } else {
            setResultado("error");
            setPenalizado(true);
            setMensajeResultado(" Fallaste!! penalizado por 2 segundos ");
            console.log("error");
            setTimeout(() => setMensajeResultado(null),1500);
        }
          setTimeout(async() => {

             await sendAnswer(opcion);
        }, 1500); // Espera 2 segundos antes de resetear


    };

    // ***********************************************
    // 1. INICIAR CONEXIÓN Y LIMPIEZA AL DESMONTAJE
    // ***********************************************
    useEffect(() => {
        const newConnection = buildConnection();
        setConnection(newConnection);

        newConnection.start()
            .then(() => {
                console.log("Conectado al servidor de SignalR");
                setErrorConexion(null);
            })
            .catch((err) => {
                setErrorConexion("Error al iniciar la conexión con SignalR.");
                console.error("Error al conectar con el servidor de SignalR: ", err);
            });

        // Función de limpieza: Se ejecuta al desmontar el componente.
        return () => {
            console.log("Desconectando la conexión de SignalR.");
            newConnection.stop();
        };
    }, []); // Array vacío para ejecución única al montar/desmontar

    // ***********************************************
    // 2. CONFIGURAR LISTENERS DE SIGNALR
    // ***********************************************
    useEffect(() => {
        if (!connection) return; // Esperar a que la conexión esté inicializada

        const gameUpdateHandler = (data: GameUpdateDto) => {
            console.log("GameUpdate recibido:", data);

            setJugadoresPartida(data.players);

            // Comparación de nombres
            const jugadorActual = data.players.find(
                (p: PlayerDto) => p.name?.trim().toLowerCase() === nombreJugador.trim().toLowerCase());
            const otroJugador = data.players.find((p: PlayerDto) => p.id !== jugadorActual?.id);

            // Actualizar posiciones en porcentaje
            if (jugadorActual) {

                setJugadorId(jugadorActual.id);
                const avance = (jugadorActual.correctAnswers / 10) * 100;
                setPosicionAuto1(avance);

                // Lógica de Penalización
                if (jugadorActual?.penaltyUntil) {
                    const ahora = new Date();
                    const penalizacionTermina = new Date(jugadorActual.penaltyUntil);

                    if (penalizacionTermina > ahora) {
                        setPenalizado(true);

                        const msRestantes = penalizacionTermina.getTime() - ahora.getTime();
                        setTimeout(() => {
                            setPenalizado(false);
                        }, msRestantes);
                    } else {
                        setPenalizado(false);
                    }
                }
            }

            if (otroJugador) {
                const avanceOtro = (otroJugador.correctAnswers / 10) * 100;
                setPosicionAuto2(avanceOtro);
            }

            // Lógica de Ganador
            if (data.winnerId && jugadorActual) {
                if (data.winnerId === jugadorActual.id) {
                    setGanador(true);
                    setPerdedor(false);
                } else {
                    setPerdedor(true);
                    setGanador(false);
                }
            }

            // Iniciar juego si hay 2 jugadores
            if (data.players.length >= 2) setBuscandoRival(false);

            // Actualizar pregunta
            if (data.currentQuestion) {
                setPartidaId(data.gameId);
                setRespuestaSeleccionada(null);
                setResultado(null);

                setEcuacion({
                    id: data.currentQuestion.id,
                    equation: data.currentQuestion.equation,
                    options: data.currentQuestion.options,
                    correctAnswer: data.currentQuestion.correctAnswer,
                });
                setOpciones(data.currentQuestion.options);
                // setTimeout(()=>{
                //         setRespuestaSeleccionada(null);
                // setResultado(null);

                // },3000);

                setInstruccion(data.expectedResult);
            }
        };

        connection.on("GameUpdate", gameUpdateHandler);

        // Función de limpieza para quitar el listener
        return () => connection.off("GameUpdate", gameUpdateHandler);

    }, [connection, nombreJugador]); // Depende de 'connection' y 'nombreJugador'

    useEffect(() => {
        console.log("Penalizado cambió: ", penalizado);
    }, [penalizado])

    //fondos aleatorios para jugadores

    useEffect(() => {
        const randomFondoJugador = fondos[Math.floor(Math.random() * fondos.length)];
        const randomFondoRival = fondos[Math.floor(Math.random() * fondos.length)];
        setFondoJugador(randomFondoJugador);
        setFondoRival(randomFondoRival);
    }, []);

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
                    onConnection={conectarJugador}
                />
            )}

            {/* Modal de fin de partida (Ganador) */}
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

            {/* Modal de fin de partida (Perdedor) */}
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

            {/* Ruta */}
            <div className="mt-20 flex flex-col gap-3 justify-end">
                <div className="flex justify-center items-center fondoRuta w-full relative mt-20 border-3 border-[#5df9f9] rounded-lg"
                    style={{
                        backgroundImage: `url('../src/assets/images/${fondoRival}')`,
                    }}>
                    {/* Nombre del Jugador 2 (Rival) */}
                    <div
                        className="absolute text-[#000000] text-l ml-2 px-2 py-1 rounded bg-[#5df9f9]"
                        style={{
                            left: '0px',
                            top: '-2%',

                        }}
                    >
                        Rival
                    </div>

                    {/* Auto 2 */}
                    <img
                        src={auto1}
                        alt="Auto 2"
                        className="absolute bottom-[180px] auto auto2"
                        style={{ left: `${posicionAuto2}%` }}
                    />
                </div>

                <div className="flex justify-center items-center fondoRuta w-full relative mt-20 border-3 border-[#f95ec8] rounded-lg"
                    style={{
                        backgroundImage: `url('../src/assets/images/${fondoJugador}')`,
                    }}>

                    {/* Nombre del Jugador 1 (Vos) */}
                    <div
                        className="absolute text-white text-l ml-2 px-2 py-1 rounded bg-[#f95ec8]"
                        style={{
                            left: '0px',
                            top: '-2%',
                        }}
                    >
                        {nombreJugador}
                    </div>

                    {/* Auto 1 */}
                    <img
                        src={auto1}
                        alt="Auto 1"
                        className="absolute auto transition-all duration-500"
                        style={{ left: `${posicionAuto1}%` }}
                    />

                </div>
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
                        //     if (respuestaSeleccionada === opcion) {
                        //         clases += resultado === "acierto" ? "bg-green-400" : "bg-red-500";
                        //     } else if (
                        //         resultado === "error") {
                        //         clases += "bg-green-400";// mostrar cuál era la correcta


                        //     } else {
                        //         clases += "bg-transparent";
                        //     }
                        // } else {
                        //     clases += "bg-transparent hover:bg-blue-500";
                        // }
                          if (resultado === "acierto" && opcion === respuestaSeleccionada) {
                                clases +=  "bg-green-400" ; //es correcta

                            } else if (
                                resultado === "error" && opcion === respuestaSeleccionada) {
                                clases += "bg-red-500";// dice que es incorrecta

                                }
                                else if (resultado === "error" && opcion === ecuacion?.correctAnswer){
                                    clases+= "bg-green-400"; // muestra cual seria la correcta

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
                                disabled={!!respuestaSeleccionada || penalizado} // Deshabilitar si ya respondió o si está penalizado
                            >
                                {opcion}
                            </button>
                        );
                    })}
                    {mensajeResultado && (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className={`text-xl mt-6  ${
            resultado === "acierto" ? "text-green-400" : "text-red-500"
        }`}
    >
        {mensajeResultado}
    </motion.div>
)}
                    {/* {penalizado && (
                        <div className="text-red-500 text-xl mt-4">
                            ¡Respuesta incorrecta! Penalización de 2 segundos.
                        </div>
                    )} */}

                </div>
            </div>

        </div>
    );
};


