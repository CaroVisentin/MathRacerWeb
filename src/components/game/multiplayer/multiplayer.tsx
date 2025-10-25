import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { QuestionDto } from '../../../models/domain/questionDto';
import { LookingForRivalModal } from '../../../shared/modals/lookingForRivalModal';
import type { PlayerDto } from '../../../models/domain/playerDto';
import { EndOfMultiplayerModeModal } from '../../../shared/modals/endOfMultiplayerModeModal';
import { Wildcards } from '../../../shared/wildcards/wildcards';
import auto1 from "../../../assets/images/auto-pista.png";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import type { GameUpdateDto } from '../../../models/domain/gameUpdateDto';
import { connection } from '../../../services/signalR/connection';
import { PowerUpType } from '../../../models/enums/powerUpType';
import type { PowerUpDto } from '../../../models/domain/powerUpDto';
const fondos = [
    'pista-noche.png',
    'pista-dia.png',
    'pista-atardecer.png',
    'pista-city.png',
    'pista-montana.png',
    'pista-pastel.png',
];


export const MultiplayerGame = () => {

    const { errorConexion, invoke, on, off } = connection();
    const [ecuacion, setEcuacion] = useState<QuestionDto>();
    const [opciones, setOpciones] = useState<number[]>();
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
    const [mensajeResultado, setMensajeResultado] = useState<string | null>(null);
    const [fondoJugador, setFondoJugador] = useState<string>('');
    const [fondoRival, setFondoRival] = useState<string>('');
    const cerrarModal = () => setGanador(false);
    const [eliminaOpciones, setEliminaOpciones] = useState(false);


    // useCallback para evitar re-creaciones innecesarias
    const conectarJugador = useCallback(async () => {
        // Nueva implementación usando invoke directamente
        if (!nombreJugador.trim()) return;
        await invoke("FindMatch", nombreJugador);
    }, [nombreJugador, invoke]);


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
        // if (connection) connection.stop();    

        // Detener la conexión manualmente, antes de que se desmonte el componente
    };

    const handleFireExtinguisher = () => {

        if (eliminaOpciones || !ecuacion) return;

        const opcionesIncorrectas = ecuacion.options.filter(opt => opt !== ecuacion.correctAnswer);
        // Seleccionar dos opciones incorrectas al azar
        const unaIncorrecta = opcionesIncorrectas[Math.floor(Math.random() * opcionesIncorrectas.length)];

        setOpciones([ecuacion.correctAnswer, unaIncorrecta].sort(() => Math.random() - 0.5));
        setEliminaOpciones(true);
        console.log("Fire extinguisher activated!");
    };

    const handleChangeEquation = async () => {
        if (!partidaId || !jugadorId) return;

        try {
            await invoke("UsePowerUp", partidaId, jugadorId, PowerUpType.ChangeEquation);
            console.log("Change equation activated!");
        } catch (error) {
            console.error("Error using Change Equation power-up:", error);
        }
    };

    const handleDobleCount = async () => {
        if (!partidaId || !jugadorId) return;

        try {
            await invoke("UsePowerUp", partidaId, jugadorId, PowerUpType.DoublePoints);
            console.log("Doble count activated!");
        } catch (error) {
            console.error("Error using Doble Count power-up:", error);
        }
    };

    const sendAnswer = useCallback(async (respuestaSeleccionada: number | null) => {
        // Nueva implementación usando invoke directamente
        if (!partidaId || respuestaSeleccionada === null || !jugadorId) return;
        await invoke("SendAnswer", partidaId, jugadorId, respuestaSeleccionada);
    }, [partidaId, jugadorId, invoke]);

    const manejarRespuesta = async (opcion: number) => {
        setRespuestaSeleccionada(opcion);

        if (ecuacion && opcion === ecuacion.correctAnswer) {
            setResultado("acierto");
            setPenalizado(false);
            setMensajeResultado("¡Correcto!");
            console.log("acierto");
        } else {
            setResultado("error");
            setPenalizado(true);
            setMensajeResultado(" Fallaste!! penalizado por 2 segundos ");
            console.log("error");
        }

        setTimeout(() => setMensajeResultado(null), 1500);
        setTimeout(() => sendAnswer(opcion),200);

    };




    useEffect(() => {
        if (!connection) return; // Esperar a que la conexión esté inicializada

        const gameUpdateHandler = (data: GameUpdateDto) => {
            console.log("GameUpdate recibido:", data);

            //nueva implementacion con connection del hook        
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
            }
            if (otroJugador) {
                const avanceOtro = (otroJugador.correctAnswers / 10) * 100;
                setPosicionAuto2(avanceOtro);
            }

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
                setInstruccion(data.expectedResult);
            }

        };

        const powerUpUsedHandler = (data: PowerUpDto) => {
            console.log("PowerUp usado:", data);

            if (data.powerUpType === PowerUpType.ShuffleRival) {
                // Lógica para mezclar las opciones de la ecuación actual
                console.log("Opciones mezcladas debido a ShuffleRival");
            } else if (data.powerUpType === PowerUpType.DoublePoints) {
                // Lógica para activar doble puntaje en la siguiente respuesta correcta
                console.log("Doble puntaje activado para la siguiente respuesta correcta");
            }
        };



        // Registrar el listener para "GameUpdate"    
        on("GameUpdate", gameUpdateHandler);
        on("PowerUpUsed", powerUpUsedHandler);

        // Función de limpieza para quitar el listener
        return () => off("GameUpdate", gameUpdateHandler);
        // off("PowerUpUsed", powerUpUsedHandler);

    }, [on, off, nombreJugador]); // Depende de 'connection' y 'nombreJugador'




    useEffect(() => {
        const indexJugador = Math.floor(Math.random() * fondos.length);
        const indexRival = (indexJugador + 1 + Math.floor(Math.random() * (fondos.length - 1))) % fondos.length;

        setFondoJugador(fondos[indexJugador]);
        setFondoRival(fondos[indexRival]);
    }, []);

    // compute opponent name
    const opponentName =
        jugadoresPartida.find(
            (p) =>
                p.name &&
                p.name.trim() &&
                p.name.trim().toLowerCase() !== nombreJugador.trim().toLowerCase()
        )?.name ?? "Rival";

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
                        {opponentName}
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
            <div className="flex justify-center  items-center gridComodin mt-4">
                <div className="pl-8 text-3xl text-left">
                    {instruccion
                        ? `Elegí la opción para que Y sea ${instruccion.toUpperCase()}`
                        : "esperando instruccion"}

                </div>
                <div className="comodin">
                    <Wildcards
                        fireExtinguisher={eliminaOpciones ? 0 : 1}
                        // changeEquation={0}
                        // dobleCount={0}
                        onFireExtinguisher={handleFireExtinguisher}
                        // onChangeEquation={handleChangeEquation}
                        // onDobleCount={handleDobleCount}
                    />
                </div>
            </div>

            {/* Ecuación */}
            <div className="flex flex-col justify-center items-center h-full gap-10 mb-10">
                <div className="flex justify-center mb-6">
                    <div className={`inline-block border-2 border-white rounded-lg text-6xl w-100 h-20 text-center align-middle py-2
                    ${penalizado ? 'opacity-50' : 'opacity-100'} transition-opacity`}>
                        {ecuacion?.equation && <span>{ecuacion.equation}</span>}
                    </div>
                </div>
                {/* si anda mal error de conexion */}
                {errorConexion && (
                    <div className="text-red-600 text-lg mt-4">
                        {errorConexion}
                    </div>
                )}

                {/* {mensajeResultado && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className={`text-xl mt-2  ${resultado === "acierto" ? "text-green-400" : "text-red-500"
                                }`}
                        >
                            {mensajeResultado}
                        </motion.div>
                    )} */}

                {/* Opciones */}
                <div className="flex justify-center items-center mt-6 gap-6 opciones">
                    {opciones?.map((opcion, i) => {
                        let clases = `border-2 border-white rounded-lg text-4xl transition 
                        w-20 h-20 `;

                        if (respuestaSeleccionada !== null) {

                            if (resultado === "acierto" && opcion === respuestaSeleccionada) {
                                clases += "bg-green-400"; //es correcta

                            } else if (
                                resultado === "error" && opcion === respuestaSeleccionada) {
                                clases += "bg-red-500 opacity-50 cursor-not-allowed";// dice que es incorrecta

                            }
                            else if (resultado === "error" && opcion === ecuacion?.correctAnswer) {
                                clases += "bg-green-400 opacity-50 cursor-not-allowed"; // muestra cual seria la correcta

                            } else {
                                clases += "bg-transparent";
                            }
                        } else if (penalizado) {
                            clases += "opacity-50 cursor-not-allowed";
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

                </div>
            </div>

        </div>
    );
};


