import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { QuestionDto } from "../../../models/domain/signalR/questionDto";
import { LookingForRivalModal } from "../../../shared/modals/lookingForRivalModal";
import type { PlayerDto } from "../../../models/domain/signalR/playerDto";
import { EndOfMultiplayerModeModal } from "../../../shared/modals/endOfMultiplayerModeModal";
import { Wildcards } from "../../../shared/wildcards/wildcards";
import auto1 from "../../../assets/images/auto-pista.png";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import type { GameUpdateDto } from "../../../models/domain/signalR/gameUpdateDto";
import { useConnection } from "../../../services/signalR/connection";
import { PowerUpType } from "../../../models/enums/powerUpType";
import mathi from "../../../assets/images/mathi.png";
const fondos = [
  "pista-noche.png",
  "pista-dia.png",
  "pista-atardecer.png",
  "pista-city.png",
  "pista-montana.png",
  "pista-pastel.png",
];

export const MultiplayerGame = () => {
  const { errorConexion, invoke, on, off } = useConnection();
  const [ecuacion, setEcuacion] = useState<QuestionDto>();
  const [opciones, setOpciones] = useState<number[]>();
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<
    number | null
  >(null);
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
  const [fondoJugador, setFondoJugador] = useState<string>("");
  const [fondoRival, setFondoRival] = useState<string>("");
  const cerrarModal = () => setGanador(false);
  const [eliminaOpciones, setEliminaOpciones] = useState(false);
  const [powerUsePosition, setPowerUsePosition] = useState(false);
  const [powerUseOrden, setPowerUseOrden] = useState(false);
  const [mensajeComodin, setMensajeComodin] = useState<string | null>(null);

  const conectarJugador = useCallback(async () => {
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
    conectarJugador();
  };

  const handleVolver = () => {
    // Agregar lógica para abandonar partida
    setGanador(false);
    setPerdedor(true);
  };

  const handleFireExtinguisher = () => {
    if (eliminaOpciones || !ecuacion) return;

    const opcionesIncorrectas = ecuacion.options.filter(
      (opt) => opt !== ecuacion.correctAnswer
    );
    // Seleccionar dos opciones incorrectas al azar
    const unaIncorrecta =
      opcionesIncorrectas[
      Math.floor(Math.random() * opcionesIncorrectas.length)
      ];

    setOpciones(
      [ecuacion.correctAnswer, unaIncorrecta].sort(() => Math.random() - 0.5)
    );
    setEliminaOpciones(true);
    setMensajeComodin("Se han eliminado dos opciones incorrectas.");
  };

  const handleChangeEquation = async () => {
    if (!partidaId || !jugadorId) return;

    try {
      await invoke(
        "UsePowerUp",
        partidaId,
        jugadorId,
        PowerUpType.ShuffleRival
      );
      setPowerUseOrden(true);
      setMensajeComodin(
        "Se han mezclado las opciones de la ecuación del rival."
      );
      setTimeout(() => setMensajeComodin(null), 2000);
    } catch (error) {
      console.error("Error using Change Equation power-up:", error);
    }
  };

  const handleDobleCount = async () => {
    if (!partidaId || !jugadorId) return;

    try {
      await invoke(
        "UsePowerUp",
        partidaId,
        jugadorId,
        PowerUpType.DoublePoints
      );
      setPowerUsePosition(true);
      setMensajeComodin("si contestas bien moves 2 lugares");
      setTimeout(() => setMensajeComodin(null), 2000);
    } catch (error) {
      console.error("Error using Doble Count power-up:", error);
    }
  };

  const sendAnswer = useCallback(
    async (respuestaSeleccionada: number | null) => {
      if (!partidaId || respuestaSeleccionada === null || !jugadorId) return;
      await invoke("SendAnswer", partidaId, jugadorId, respuestaSeleccionada);
    },
    [partidaId, jugadorId, invoke]
  );

  const manejarRespuesta = async (opcion: number) => {
    setRespuestaSeleccionada(opcion);

    if (ecuacion && opcion === ecuacion.correctAnswer) {
      setResultado("acierto");
      setPenalizado(false);
    } else {
      setResultado("error");
      setPenalizado(true);
    }

    setTimeout(() => sendAnswer(opcion), 200);
  };

  useEffect(() => {
    if (!useConnection) return; // Esperar a que la conexión esté inicializada

    const gameUpdateHandler = (data: GameUpdateDto) => {
      setJugadoresPartida(data.players);

      const jugadorActual = data.players.find(
        (p: PlayerDto) =>
          p.name?.trim().toLowerCase() === nombreJugador.trim().toLowerCase()
      );
      const otroJugador = data.players.find(
        (p: PlayerDto) => p.id !== jugadorActual?.id
      );

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

      if (data.winnerId && jugadorActual) {
        if (data.winnerId === jugadorActual.id) {
          setGanador(true);
          setPerdedor(false);
        } else {
          setPerdedor(true);
          setGanador(false);
        }
      }

      if (data.players.length >= 2) setBuscandoRival(false);

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

    // Registrar el listener para "GameUpdate"
    on("GameUpdate", gameUpdateHandler);
    // on("PowerUpUsed", powerUpUsedHandler);

    // Función de limpieza para quitar el listener
    return () => off("GameUpdate", gameUpdateHandler);
    //  off("PowerUpUsed", powerUpUsedHandler);
  }, [on, off, nombreJugador]); // Depende de 'connection' y 'nombreJugador'

  useEffect(() => {
    const indexJugador = Math.floor(Math.random() * fondos.length);
    const indexRival =
      (indexJugador + 1 + Math.floor(Math.random() * (fondos.length - 1))) %
      fondos.length;

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
        <button onClick={handleVolver} className="px-3 py-1 rounded">
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
        <div
          className="flex justify-center items-center fondoRuta w-full relative mt-20 border-3 border-[#5df9f9] rounded-lg"
          style={{
            backgroundImage: `url('../src/assets/images/${fondoRival}')`,
          }}
        >
          {/* Nombre del Jugador 2 (Rival) */}
          <div
            className="absolute text-[#000000] text-l ml-2 px-2 py-1 rounded bg-[#5df9f9]"
            style={{
              left: "0px",
              top: "-2%",
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

        <div
          className="flex justify-center items-center fondoRuta w-full relative mt-20 border-3 border-[#f95ec8] rounded-lg"
          style={{
            backgroundImage: `url('../src/assets/images/${fondoJugador}')`,
          }}
        >
          {/* Nombre del Jugador 1 (Vos) */}
          <div
            className="absolute text-white text-l ml-2 px-2 py-1 rounded bg-[#f95ec8]"
            style={{
              left: "0px",
              top: "-2%",
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
        <div className="instruccion text-3xl text-center">
          {instruccion ? (
            <>
              Elegí la opción para que{" "}
              <span className="text-cyan-400 font-bold drop-shadow-[0_0_5px_#00ffff] ">
                Y
              </span>{" "}
              sea{" "}
              <span className="text-cyan-400 font-bold drop-shadow-[0_0_5px_#00ffff] ">
                {instruccion.toUpperCase()}
              </span>
            </>
          ) : (
            "esperando instruccion"
          )}
        </div>
        <div className="comodin">
          <Wildcards
            fireExtinguisher={eliminaOpciones ? 0 : 1}
            changeEquation={powerUseOrden ? 0 : 1}
            dobleCount={powerUsePosition ? 0 : 1}
            onFireExtinguisher={handleFireExtinguisher}
            onChangeEquation={handleChangeEquation}
            onDobleCount={handleDobleCount}
          />
        </div>
      </div>

      {/* Ecuación */}
      <div className="flex flex-col justify-center items-center h-full gap-5 mb-10 mt-4">
        {mensajeComodin && (
          <div className="w-full flex justify-end px-4">
            <div className="text-cyan-200 text-xl  text-center drop-shadow-[0_0_5px_#00ffff] animate-fade-in">
              {mensajeComodin}
            </div>
          </div>
        )}
        <div className="flex justify-center mb-6">
          <div className="inline-block border-2 border-white rounded-lg text-6xl px-6 py-3">
            {ecuacion?.equation && <span>{ecuacion.equation}</span>}
          </div>
        </div>
        {/* si anda mal error de conexion */}
        {errorConexion && (
          <div className="text-red-600 text-lg mt-4">{errorConexion}</div>
        )}

        {/* Opciones */}
        <div className="flex justify-center items-center mt-6 gap-6 opciones">
          {opciones?.map((opcion, i) => {
            let clases = `border-2 border-white rounded-lg text-4xl transition 
                        w-20 h-20 `;

            if (respuestaSeleccionada !== null) {
              if (resultado === "acierto" && opcion === respuestaSeleccionada) {
                clases += "bg-green-400"; //es correcta
              } else if (
                resultado === "error" &&
                opcion === respuestaSeleccionada
              ) {
                clases += "bg-red-500 opacity-50 cursor-not-allowed"; // dice que es incorrecta
              } else if (
                resultado === "error" &&
                opcion === ecuacion?.correctAnswer
              ) {
                clases += "bg-green-400 opacity-50 cursor-not-allowed"; // muestra cual seria la correcta
              } else {
                clases += "bg-transparent";
              }
            } else if (penalizado) {
              clases += "opacity-50 cursor-not-allowed";
            } else {
              clases += "bg-transparent hover:bg-blue-500";
            }

            const mostrarMascota =
              respuestaSeleccionada !== null &&
              ((resultado === "acierto" && opcion === respuestaSeleccionada) ||
                (resultado === "error" && opcion === ecuacion?.correctAnswer));

            return (
              <div key={i} className="flex flex-col items-center">
                {/* Mascota arriba del botón */}
                {mostrarMascota && (
                  <img
                    src={mathi}
                    alt="Mascota celebrando"
                    className="w-16 h-16 mb-2 animate-bounce drop-shadow-[0_0_10px_#00ffff]"
                  />
                )}

                <button
                  key={i}
                  onClick={() => manejarRespuesta(opcion)}
                  className={clases}
                  disabled={!!respuestaSeleccionada || penalizado}
                >
                  {opcion}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
