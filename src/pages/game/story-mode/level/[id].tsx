import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FuelIndicator } from "../../../../shared/energy/energy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { EndOfStoryModeModal } from "../../../../shared/modals/endOfStoryModeModal";
import { Wildcards } from "../../../../shared/wildcards/wildcards";
import fondoRival from "../../../../assets/images/pista-montana.png";
import fondoJugador from "../../../../assets/images/pista-noche.png";
import auto1 from "../../../../assets/images/auto.png";
import { getGameStatus, startGame, submitAnswer } from "../../../../services/game/story-mode/storyModeGameService";
import type { StartSoloGameResponseDto } from "../../../../models/domain/story-mode/startSoloGameResponseDto";
import type { SoloGameStatusResponseDto } from "../../../../models/domain/story-mode/soloGameStatusResponseDto";
import type { SubmitSoloAnswerResponseDto } from "../../../../models/domain/story-mode/submitSoloAnswerResponseDto";
import { SoloGameStatus } from "../../../../models/enums/soloGameStatus";
import type { LevelDtoUi } from "../../../../models/ui/story-mode/levelDtoUi";

export const StoryModeGame = () => {
    const { id } = useParams();
    const levelId = Number(id);
    const location = useLocation();
    const stateLevel = location.state?.level ?? null;

    const [level, setLevel] = useState<LevelDtoUi | null>(stateLevel);

    const [playerPosition, setPlayerPosition] = useState<number>(0);
    const [machinePosition, setMachinePosition] = useState<number>(0);
    const [winnerModal, setWinnerModal] = useState(false);
    const [startMatch, setStartMatch] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [showCountdown, setShowCountdown] = useState(true);
    const navigate = useNavigate();

    const [gameData, setGameData] = useState<StartSoloGameResponseDto | null>(null); // Inicial
    const [gameSubmitAnswer, setGameSubmitAnswer] = useState<SubmitSoloAnswerResponseDto | null>(null); // dinámico después de enviar una respuesta
    const [gameStatus, setGameStatus] = useState<SoloGameStatusResponseDto | null>(null); // dinámico después de enviar respuesta

    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [answerResult, setAnswerResult] = useState<"correct" | "wrong" | null>(null);
    const [isAnswering, setIsAnswering] = useState(false);
    const [timeLeft, setTimeLeft] = useState<number>(10);

    useEffect(() => {
        if (!stateLevel) {
            const saved = sessionStorage.getItem("selectedLevel");
            if (saved) {
                setLevel(JSON.parse(saved));
            }
        }
    }, [stateLevel]);

    useEffect(() => {
        if (showCountdown && countdown > 1) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 1) {
            setTimeout(() => {
                setShowCountdown(false);
                setStartMatch(true);
            }, 1000)
        }
        return;
    }, [countdown, showCountdown])

    useEffect(() => {
        if (startMatch) {
            const iniciarPartida = async () => {
                try {
                    // Crear la partida
                    const response: StartSoloGameResponseDto = await startGame(levelId);
                    setGameData(response);
                } catch (error) {
                    console.error(error)
                }
            }

            iniciarPartida()
        }
    }, [startMatch])

    useEffect(() => {
        if (!gameData?.gameId) return;

        const savedTimerData = localStorage.getItem(`game_${gameData.gameId}_timer`);
        if (savedTimerData) {
            try {
                const { timeLeft: savedTime, timestamp, questionId } = JSON.parse(savedTimerData);

                const currentQuestionId = gameStatus?.currentQuestion?.id || gameData?.currentQuestion?.id;
                if (questionId === currentQuestionId) {
                    const elapsedSeconds = Math.floor((Date.now() - timestamp) / 1000);
                    const restoredTime = Math.max(0, savedTime - elapsedSeconds);
                    setTimeLeft(restoredTime);
                }
            } catch (error) {
                console.error("Error restoring timer from localStorage:", error);
            }
        }
    }, [gameData])

    useEffect(() => {
        const currentQuestion = gameStatus?.currentQuestion || gameData?.currentQuestion;
        const currentTimePerEquation = gameStatus?.timePerEquation || gameData?.timePerEquation || 10;

        if (currentQuestion && startMatch) {
            const savedTimerData = localStorage.getItem(`game_${gameData?.gameId}_timer`);
            let shouldResetTimer = true;

            if (savedTimerData) {
                try {
                    const { questionId } = JSON.parse(savedTimerData);
                    if (questionId === currentQuestion.id) {
                        shouldResetTimer = false;
                    }
                } catch (error) {
                    console.error("Error parsing saved timer:", error);
                }
            }

            if (shouldResetTimer) {
                setTimeLeft(currentTimePerEquation);
            }
        }
    }, [gameStatus, gameData, startMatch])

    useEffect(() => {
        if (!startMatch || isAnswering || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => Math.max(0, prev - 1));
        }, 1000)

        return () => clearInterval(timer);
    }, [startMatch, isAnswering, timeLeft])

    useEffect(() => {
        if (!gameData?.gameId || !startMatch) return;

        const currentQuestion = gameStatus?.currentQuestion || gameData?.currentQuestion;
        if (currentQuestion) {
            const timerData = {
                timeLeft,
                timestamp: Date.now(),
                questionId: currentQuestion.id,
            };
            localStorage.setItem(`game_${gameData.gameId}_timer`, JSON.stringify(timerData));
        }
    }, [timeLeft, gameData, gameStatus, startMatch])

    useEffect(() => {
        if (winnerModal && gameData?.gameId) {
            localStorage.removeItem(`game_${gameData.gameId}_timer`);
        }
    }, [winnerModal, gameData])

    async function handleAnswer(opcion: number) {
        // Si la partida no empezó / no hay datos iniciales / está enviando la respuesta
        if (!startMatch || !gameData || isAnswering) return;

        setSelectedAnswer(opcion);
        setIsAnswering(true);

        try {
            // Enviar respuesta
            const response: SubmitSoloAnswerResponseDto = await submitAnswer(gameData.gameId, opcion);

            // Mostrar feedback visual
            setGameSubmitAnswer(response);
            setAnswerResult(response.isCorrect ? "correct" : "wrong");

            // Esperar el tiempo indicado por el backend (3 segundos)
            await new Promise((resolve) => setTimeout(resolve, response.waitTimeSeconds * 1000));

            // Consultar el estado actualizado de la partida
            const updatedStatus: SoloGameStatusResponseDto = await getGameStatus(gameData.gameId);

            // Actualizar el estado del juego
            setGameStatus(updatedStatus);

            // Actualizar las posiciones de los autos
            setPlayerPosition((updatedStatus.playerPosition / gameData.totalQuestions) * 100);
            setMachinePosition((updatedStatus.machinePosition / gameData.totalQuestions) * 100);

            // Si el status del juego es distinto de In Progress, significa que terminó
            if (updatedStatus.status !== SoloGameStatus.InProgress ) {
                setWinnerModal(true);
            }

            // Resetear feedback visual
            setSelectedAnswer(null);
            setAnswerResult(null);
        } catch (error) {
            console.error("Error al procesar respuesta:", error);
        } finally {
            setIsAnswering(false);
        }
    }

    return (
        <>
            <div className="juego w-full h-full bg-black text-white relative">
                {/* HEADER */}
                <div className={`flex justify-between items-center bg-black px-4 py-3 z-10`}>
                    {/* Botón de volver */}
                    <button className="px-3 py-1 rounded">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>

                    {/* Tiempo por ecuación */}
                    {startMatch && gameData && (
                        <div className={`text-white px-3 py-1 text-5xl font-bold ${timeLeft <= 3 ? "text-red-500" : ""}`}>
                            {timeLeft}s
                        </div>
                    )}

                    {/* Vidas */}
                    <FuelIndicator remainingLives={gameStatus?.livesRemaining ?? 3} />
                </div>

                {/* --- MODAL DEL CONTEO --- */}
                {showCountdown && (
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-90 z-20">
                        <h2 className="text-7xl mb-4 text-[#5df9f9]">¡PREPARATE!</h2>

                        <div className="flex gap-6 text-8xl font-bold">
                            <span className={`${countdown === 3 ? "text-[#5df9f9]" : "text-gray-600"}`}>3</span>
                            <span className={`${countdown === 2 ? "text-[#5df9f9]" : "text-gray-600"}`}>2</span>
                            <span className={`${countdown === 1 ? "text-[#5df9f9]" : "text-gray-600"}`}>1</span>
                        </div>
                    </div>
                )}

                {/* --- MODAL DE RESULTADOS --- */}
                {winnerModal && (
                    <EndOfStoryModeModal
                        level={level?.number ?? 0}
                        reward={0}
                        won={gameStatus?.status === SoloGameStatus.PlayerWon}
                        onClose={() => navigate("/home")}
                        onNext={() => {
                            setWinnerModal(false)
                        }}
                        remainingLives={gameStatus?.livesRemaining ?? 0}
                    />
                )}

                {/* --- CONTENIDO DEL JUEGO --- */}
                {startMatch && gameData && (
                    <>
                        {/* Ruta */}
                        <div className={`mt-20 flex flex-col gap-3 justify-end`}>
                            <div
                                className="flex justify-center items-center fondoRuta w-full relative mt-20 border-3 border-[#5df9f9] rounded-lg"
                                style={{
                                    backgroundImage: `url('${fondoRival}')`,
                                }}
                            >
                                <div
                                    className="absolute text-[#000000] text-l ml-2 px-2 py-1 rounded bg-[#5df9f9]"
                                    style={{
                                        left: "0px",
                                        top: "-2%",
                                    }}
                                >
                                    Máquina
                                </div>

                                {/* Auto 2 */}
                                <img
                                    src={auto1 || "/placeholder.svg"}
                                    alt="Auto 2"
                                    className="absolute bottom-[180px] auto auto2"
                                    style={{ left: `${machinePosition}%` }}
                                />
                            </div>

                            <div
                                className="flex justify-center items-center fondoRuta w-full relative mt-20 border-3 border-[#f95ec8] rounded-lg"
                                style={{
                                    backgroundImage: `url('${fondoJugador}')`,
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
                                    Tú
                                </div>

                                {/* Auto 1 */}
                                <img
                                    src={auto1 || "/placeholder.svg"}
                                    alt="Auto 1"
                                    className="absolute auto transition-all duration-500"
                                    style={{ left: `${playerPosition}%` }}
                                />
                            </div>
                        </div>

                        {/* Instrucciones y Comodines */}
                        <div className="flex justify-center items-center gridComodin mt-4">
                            <div className={`!text-xl !m-5`}>
                                {level ? `Elegí la opción para que la Y sea ${level.resultType.toUpperCase()}` : "Esperando instrucción..."}
                            </div>
                            <div className={`comodin !mt-2`}>
                                <Wildcards fireExtinguisher={3} changeEquation={3} dobleCount={3} />
                            </div>
                        </div>

                        {/* Ecuación y Opciones */}
                        {(gameData || gameStatus) && (
                            <div className="flex flex-col justify-center items-center h-full gap-5 !mb-10 mt-4 bg-black ">
                                {/* Ecuación */}
                                <div className="flex justify-center mb-6">
                                    <div className={`inline-block border-2 border-white rounded-lg text-5xl px-6 py-3`}>
                                        {(gameStatus?.currentQuestion || gameData?.currentQuestion)?.equation}
                                    </div>
                                </div>

                                {/* Opciones */}
                                <div className="flex justify-center items-center mt-3 gap-6 opciones">
                                    {(gameStatus?.currentQuestion || gameData?.currentQuestion)?.options.map((opcion, i) => {
                                        let clases = "border-2 border-white rounded-lg text-3xl transition w-20 h-20"

                                        if (selectedAnswer !== null) {
                                            if (answerResult === "correct" && opcion === selectedAnswer) {
                                                clases += " bg-green-500"
                                            } else if (answerResult === "wrong" && opcion === selectedAnswer) {
                                                clases += " bg-red-500 opacity-70"
                                            } else if (answerResult === "wrong" && opcion === (gameSubmitAnswer?.isCorrect ?? null)) {
                                                clases += " bg-green-400 opacity-50"
                                            } else {
                                                clases += " bg-transparent"
                                            }
                                        } else {
                                            clases += " hover:bg-blue-500"
                                        }

                                        return (
                                            <button
                                                key={i}
                                                onClick={() => handleAnswer(opcion)}
                                                className={clases}
                                                disabled={selectedAnswer !== null}
                                            >
                                                {opcion}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    )
}