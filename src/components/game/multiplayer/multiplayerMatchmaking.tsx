import { useState, useEffect, useCallback, useRef } from "react";
import { getAuth } from "firebase/auth";
import { useParams, useNavigate } from "react-router-dom";
import type { QuestionDto } from "../../../models/domain/signalR/questionDto";
import type { PlayerDto } from "../../../models/domain/signalR/playerDto";
import { EndOfMultiplayerModeModal } from "../../../shared/modals/endOfMultiplayerModeModal";
import { Wildcards } from "../../../shared/wildcards/wildcards";
import autoDefault from "../../../assets/images/auto-pista.png";
import { resolveImageUrl } from "../../../shared/utils/imageResolver";
import type { GameUpdateDto } from "../../../models/domain/signalR/gameUpdateDto";
import { useConnection } from "../../../services/signalR/connection";
import { PowerUpType } from "../../../models/enums/powerUpType";
import mathi from "../../../assets/images/mathi.png";
import { usePlayer } from "../../../hooks/usePlayer";
import { BackButton } from "../../../shared/buttons/backButton";

// Arrays de IDs (solo para random fallback si no hay equipado)
const fondoFallbackIds = [8, 5, 13, 18, 19]; // background product IDs según imageResolver
const autoFallbackIds = [6, 9, 12, 15, 18, 19, 20, 3]; // car product IDs según imageResolver

interface MultiplayerMatchmakingProps {
  gameIdProp?: number;
  initialData?: GameUpdateDto;
}

export const MultiplayerMatchmaking = ({ gameIdProp, initialData }: MultiplayerMatchmakingProps) => {
  const { gameId: gameIdFromUrl } = useParams<{ gameId: string }>();
  const gameId = gameIdProp?.toString() || gameIdFromUrl;
  const { player } = usePlayer();
  const navigate = useNavigate();
  const { conn, errorConexion, invoke, on, off } = useConnection();
  const [ecuacion, setEcuacion] = useState<QuestionDto>();
  const [opciones, setOpciones] = useState<number[]>();
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<number | null>(null);
  const [resultado, setResultado] = useState<"acierto" | "error" | null>(null);
  const [posicionAuto1, setPosicionAuto1] = useState<number>(0);
  const [posicionAuto2, setPosicionAuto2] = useState<number>(0);
  const [ganador, setGanador] = useState<boolean>(false);
  const [jugadoresPartida, setJugadoresPartida] = useState<PlayerDto[]>([]);
  const [jugadorId, setJugadorId] = useState<number | null>(null);
  const [partidaId, setPartidaId] = useState<number | null>(null);
  const [instruccion, setInstruccion] = useState<string>("");
  const [perdedor, setPerdedor] = useState<boolean>(false);
  const [penalizado, setPenalizado] = useState<boolean>(false);
  const [fondoJugador, setFondoJugador] = useState<string>("");
  const [fondoRival, setFondoRival] = useState<string>("");
  const [carJugador, setCarJugador] = useState<string>(autoDefault);
  const [carRival, setCarRival] = useState<string>(autoDefault);
  const [eliminaOpciones, setEliminaOpciones] = useState(false);
  const [powerUsePosition, setPowerUsePosition] = useState(false);
  const [powerUseOrden, setPowerUseOrden] = useState(false);
  const [mensajeComodin, setMensajeComodin] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const nombreJugador = player?.name || "";
  const cerrarModal = () => setGanador(false);

  // Usar ref para el nombre del jugador para evitar re-renders
  const nombreJugadorRef = useRef(nombreJugador);

  useEffect(() => {
    nombreJugadorRef.current = nombreJugador;
  }, [nombreJugador]);

  useEffect(() => {
    if (!mensajeComodin) {
      return;
    }

    const timeoutId = setTimeout(() => setMensajeComodin(null), 3000);
    return () => clearTimeout(timeoutId);
  }, [mensajeComodin]);

  // PASO 1: REGISTRAR LISTENERS PRIMERO - CRÍTICO
  useEffect(() => {

    const gameUpdateHandler = (data: GameUpdateDto) => {

      setJugadoresPartida(data.players);
      setPartidaId(data.gameId);

      // Identificar al jugador actual
      const auth = getAuth();
      const myUid = auth.currentUser?.uid;


      let jugadorActual: PlayerDto | undefined;
      if (myUid) {
        jugadorActual = data.players.find(p => p.uid === myUid);

      }

      if (!jugadorActual) {

        jugadorActual = data.players.find(p => p.name?.trim() === nombreJugadorRef.current.trim());

      }

      const otroJugador = data.players.find(p => p.id !== jugadorActual?.id);

      if (jugadorActual) {
        setJugadorId(jugadorActual.id);
        const avance = (jugadorActual.correctAnswers / 10) * 100;
        setPosicionAuto1(avance);
        if (jugadorActual.equippedBackground?.id) {
          setFondoJugador(resolveImageUrl("background", jugadorActual.equippedBackground.id));
        }
        if (jugadorActual.equippedCar?.id) {
          setCarJugador(resolveImageUrl("car", jugadorActual.equippedCar.id));
        }
      }
      if (otroJugador) {
        const avanceOtro = (otroJugador.correctAnswers / 10) * 100;
        setPosicionAuto2(avanceOtro);
        // Apariencia rival (solo cambiar si viene equipado)
        if (otroJugador.equippedBackground?.id) {
          setFondoRival(resolveImageUrl("background", otroJugador.equippedBackground.id));
        }
        if (otroJugador.equippedCar?.id) {
          setCarRival(resolveImageUrl("car", otroJugador.equippedCar.id));
        }
      }

      // Penalización
      if (jugadorActual?.penaltyUntil) {
        const ahora = new Date();
        const penalizacionTermina = new Date(jugadorActual.penaltyUntil);

        if (penalizacionTermina > ahora) {
          setPenalizado(true);
          const msRestantes = penalizacionTermina.getTime() - ahora.getTime();
          setTimeout(() => setPenalizado(false), msRestantes);
        } else {
          setPenalizado(false);
        }
      }

      // Verificar ganador
      if (data.winnerId && jugadorActual) {
        if (data.winnerId === jugadorActual.id) {
          setGanador(true);
          setPerdedor(false);
        } else {
          setPerdedor(true);
          setGanador(false);
        }
      }

      // Actualizar pregunta actual
      if (data.currentQuestion) {

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

    const errorHandler = (message: string) => {
      console.error("Error del servidor SignalR:", message);
      setError(message);
    };


    on("GameUpdate", gameUpdateHandler);
    on("gameUpdate", gameUpdateHandler);
    on("game-update", gameUpdateHandler);
    on("gameupdate", gameUpdateHandler);

    on("Error", errorHandler);
    on("error", errorHandler);


    return () => {

      off("GameUpdate", gameUpdateHandler);
      off("gameUpdate", gameUpdateHandler);
      off("game-update", gameUpdateHandler);
      off("gameupdate", gameUpdateHandler);
      off("Error", errorHandler);
      off("error", errorHandler);
    };
  }, [conn, on, off]); // Dependencias mínimas


  useEffect(() => {
    if (!initialData) return;

    const players = initialData.players || [];
    const gid = initialData.gameId;

    if (players.length > 0) {
      setJugadoresPartida(players);
      setPartidaId(gid);

      // Identificar al jugador actual
      const auth = getAuth();
      const myUid = auth.currentUser?.uid;


      let jugadorActual: PlayerDto | undefined;
      if (myUid) {
        jugadorActual = players.find((p: PlayerDto) => p.uid === myUid);

      }

      if (!jugadorActual) {
        jugadorActual = players.find((p: PlayerDto) => p.name?.trim() === nombreJugadorRef.current.trim());
      }

      if (jugadorActual) {
        setJugadorId(jugadorActual.id);
        const avance = (jugadorActual.correctAnswers / 10) * 100;
        setPosicionAuto1(avance);
      } else {
        console.error("❌ No se pudo identificar al jugador actual en initialData!");

      }

      // También procesar la pregunta si viene (inicial)
      if (initialData?.currentQuestion) {
        setEcuacion({
          id: initialData.currentQuestion.id,
          equation: initialData.currentQuestion.equation,
          options: initialData.currentQuestion.options,
          correctAnswer: initialData.currentQuestion.correctAnswer,
        });
        setOpciones(initialData.currentQuestion.options);
        setInstruccion(initialData.expectedResult);
      }
    }
  }, [initialData]); // Solo depende de initialData

  const randomFrom = (arr: number[]) => arr[Math.floor(Math.random() * arr.length)];

  //const resolveBackground = (id?: number) => resolveImageUrl("background", id);
  //const resolveCar = (id?: number) => resolveImageUrl("car", id);

  useEffect(() => {
    const resolvedBg = resolveImageUrl("background", player?.equippedBackground?.id || player?.background?.id || randomFrom(fondoFallbackIds));
    setFondoJugador(resolvedBg);
    // Fallback del rival: usar el mismo fondo del jugador si el rival no trae uno
    setFondoRival(resolvedBg);
    const resolvedCar = resolveImageUrl("car", player?.equippedCar?.id || player?.car?.id || randomFrom(autoFallbackIds));
    setCarJugador(resolvedCar);
    // Fallback del rival: usar el mismo auto del jugador si el rival no trae uno
    setCarRival(resolvedCar);
  }, [player]);

  const handleVolver = async () => {
    // Si aún no tenemos IDs simplemente salir
    if (!partidaId || !jugadorId) {
      navigate('/menu');
      return;
    }

    try {
      // Marcar localmente como perdedor para mostrar feedback inmediato
      setPerdedor(true);
      setGanador(false);

      // Dar un pequeño margen para que el servidor procese la desconexión y
      // envíe el GameUpdate al rival con winnerId.
      setTimeout(async () => {
        try {
          if (conn) {
            await conn.stop();
          }
        } catch (e) {
          console.warn("[Matchmaking] Error al detener conexión:", e);
        } finally {
          navigate('/menu');
        }
      }, 1200); // ~1.2s de margen
    } catch (error) {
      console.error("Error al abandonar la partida:", error);
      navigate('/menu');
    }
  };

  const reiniciarJuego = () => {
    navigate('/menu');
  };

  const sendAnswer = useCallback(
    async (respuestaSeleccionada: number | null) => {

      try {

        await invoke("SendAnswer", partidaId, jugadorId, respuestaSeleccionada);

      } catch (error) {
        console.error("❌ Error al invocar SendAnswer:", error);
      }
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

  const handleFireExtinguisher = () => {
    if (eliminaOpciones || !ecuacion) return;
    const opcionesIncorrectas = ecuacion.options.filter((opt) => opt !== ecuacion.correctAnswer);
    const unaIncorrecta = opcionesIncorrectas[Math.floor(Math.random() * opcionesIncorrectas.length)];
    setOpciones([ecuacion.correctAnswer, unaIncorrecta].sort(() => Math.random() - 0.5));
    setEliminaOpciones(true);
    setMensajeComodin("Se han eliminado dos opciones incorrectas.");
  };

  const handleChangeEquation = async () => {
    if (!partidaId || !jugadorId) return;
    try {
      await invoke("UsePowerUp", partidaId, jugadorId, PowerUpType.ShuffleRival);
      setPowerUseOrden(true);
      setMensajeComodin("Se han mezclado las opciones de la ecuación del rival.");
      setTimeout(() => setMensajeComodin(null), 2000);
    } catch (error) {
      console.error("Error using Change Equation power-up:", error);
    }
  };

  const handleDobleCount = async () => {
    if (!partidaId || !jugadorId) return;
    try {
      await invoke("UsePowerUp", partidaId, jugadorId, PowerUpType.DoublePoints);
      setPowerUsePosition(true);
      setMensajeComodin("Si contestas bien avanzas 2 lugares");
      setTimeout(() => setMensajeComodin(null), 2000);
    } catch (error) {
      console.error("Error using Doble Count power-up:", error);
    }
  };

  const opponentName = jugadoresPartida.find(
    (p) => p.name && p.name.trim() && p.name.trim().toLowerCase() !== nombreJugador.trim().toLowerCase()
  )?.name ?? "Rival";

  // Renderizar pantalla de carga mientras esperamos al rival
  const esperandoRival = jugadoresPartida.length < 2 && !error;

  return (
    <div className="juego w-full h-full bg-neutral-900 text-white relative">
      {esperandoRival ? (
        // Pantalla de espera
        <div className="h-screen w-screen bg-[#1C092D] flex items-center justify-center">
          <div className="bg-black/90 border-2 border-cyan-400 rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-[#5df9f9] mx-auto mb-4"></div>
            <h2 className="text-3xl text-[#f95ec8] mb-4">Esperando rival...</h2>
            <p className="text-white text-xl">{nombreJugador}</p>
            <p className="text-gray-400 mt-2">Jugadores: {jugadoresPartida.length}/2</p>
            <p className="text-gray-400 mt-1">Partida ID: {gameId}</p>
            <button
              onClick={handleVolver}
              className="mt-6 bg-red-600 text-white px-6 py-3 rounded text-xl hover:bg-red-700"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        // Pantalla de juego
        <>
          {/* HEADER */}
          <div className="flex justify-between items-center p-1 bg-neutral-900 absolute top-0 left-0 w-full z-10">
            <BackButton onClick={handleVolver} />
          </div>

          {/* Modal de error */}
          {error && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
              <div className="bg-black/90 border-2 border-red-500 rounded-lg p-8 text-center max-w-md">
                <h2 className="text-3xl text-red-500 mb-4">❌ Error</h2>
                <p className="text-white text-xl mb-6">{error}</p>
                <button onClick={() => navigate('/menu')} className="bg-[#5df9f9] text-black px-6 py-3 rounded text-xl">
                  <i className="ri-arrow-left-line mr-2"></i> Volver
                </button>
              </div>
            </div>
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

          {/* Pistas */}
          <div className="mt-20 flex flex-col gap-3 justify-end">
            <div
              className="flex justify-center items-center fondoRuta w-full relative mt-20 border-3 border-[#5df9f9] rounded-lg"
              style={{
                backgroundImage: `url('${fondoRival}')`
              }}
            >
              <div className="absolute text-[#000000] text-l ml-2 px-2 py-1 rounded bg-[#5df9f9]" style={{ left: "0px", top: "-2%" }}>
                {opponentName}
              </div>
              <img src={carRival} alt="Auto 2" className="absolute bottom-[180px] auto auto2" style={{ left: `${posicionAuto2}%` }} />
            </div>

            <div
              className="flex justify-center items-center fondoRuta w-full relative mt-20 border-3 border-[#f95ec8] rounded-lg"
              style={{
                backgroundImage: `url('${fondoJugador}')`
              }}
            >
              <div className="absolute text-white text-l ml-2 px-2 py-1 rounded bg-[#f95ec8]" style={{ left: "0px", top: "-2%" }}>
                {nombreJugador}
              </div>
              <img src={carJugador} alt="Auto 1" className="absolute auto transition-all duration-500" style={{ left: `${posicionAuto1}%` }} />
            </div>
          </div>

          {/* Instrucciones y Comodines */}
          <div className="flex justify-center items-center gridComodin mt-4">
            <div className="instruccion text-3xl text-center">
              {instruccion ? (
                <>
                  Elegí la opción para que <span className="text-cyan-400 drop-shadow-[0_0_5px_#00ffff]">Y</span> sea{" "}
                  <span className="text-cyan-400">{instruccion.toUpperCase()}</span>
                </>
              ) : (
                "Esperando instrucción"
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

          {/* Ecuación y Opciones */}
          <div className="flex flex-col justify-center items-center h-full gap-5 mb-10 mt-4">
            {mensajeComodin && (
              <div className="w-full flex justify-end px-4">
                <div className="text-cyan-200 text-3xl text-center drop-shadow-[0_0_5px_#00ffff] animate-fade-in">
                  {mensajeComodin}
                </div>
              </div>
            )}

            <div className="flex justify-center mb-6">
              <div className="border-2 border-white rounded-lg text-6xl px-6 py-3 min-h-[90px] flex items-center justify-center">
                {ecuacion?.equation ? (
                  <span>{ecuacion.equation}</span>
                ) : (
                  <span className="text-xl animate-pulse">Cargando ecuación...</span>
                )}
              </div>
            </div>

            {errorConexion && <div className="text-red-600 text-lg mt-4">{errorConexion}</div>}

            {/* Opciones */}
            <div className="flex justify-center items-center mt-6 gap-6 opciones">
              {opciones?.map((opcion, i) => {
                let clases = `border-2 border-white rounded-lg text-4xl transition w-20 h-20 `;

                if (respuestaSeleccionada !== null) {
                  if (resultado === "acierto" && opcion === respuestaSeleccionada) {
                    clases += "bg-green-400";
                  } else if (resultado === "error" && opcion === respuestaSeleccionada) {
                    clases += "bg-red-500 opacity-50 cursor-not-allowed";
                  } else if (resultado === "error" && opcion === ecuacion?.correctAnswer) {
                    clases += "bg-green-400 opacity-50 cursor-not-allowed";
                  } else {
                    clases += "bg-[#0F7079]";
                  }
                } else if (penalizado) {
                  clases += "opacity-50 cursor-not-allowed";
                } else {
                  clases += "bg-[#0F7079] hover:bg-blue-500";
                }

                const mostrarMascota =
                  respuestaSeleccionada !== null &&
                  ((resultado === "acierto" && opcion === respuestaSeleccionada) ||
                    (resultado === "error" && opcion === ecuacion?.correctAnswer));

                return (
                  <div key={i} className="flex flex-col items-center">
                    {mostrarMascota && (
                      <img src={mathi} alt="Mascota" className="w-16 h-16 mb-2 animate-bounce drop-shadow-[0_0_10px_#00ffff]" />
                    )}
                    <button onClick={() => manejarRespuesta(opcion)} className={clases} disabled={!!respuestaSeleccionada || penalizado}>
                      {opcion}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
