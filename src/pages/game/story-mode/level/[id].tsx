import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { EndOfStoryModeModal } from "../../../../shared/modals/endOfStoryModeModal";
import fondoRival from "../../../../assets/images/pista-montana.png";
import auto1 from "../../../../assets/images/auto.png";
import { getGameStatus, startGame, submitAnswer, applyWildcard } from "../../../../services/game/story-mode/storyModeGameService";
import type { StartSoloGameResponseDto } from "../../../../models/domain/story-mode/startSoloGameResponseDto";
import type { SoloGameStatusResponseDto } from "../../../../models/domain/story-mode/soloGameStatusResponseDto";
import type { SubmitSoloAnswerResponseDto } from "../../../../models/domain/story-mode/submitSoloAnswerResponseDto";
import { SoloGameStatus } from "../../../../models/enums/soloGameStatus";
import type { LevelDtoUi } from "../../../../models/ui/story-mode/levelDtoUi";
import { Semaphore } from "../../../../components/game/story-mode/countdown";
import { WildcardsAndInstructions } from "../../../../components/game/story-mode/wildcardsAndInstructions";
import { RaceTrack } from "../../../../components/game/story-mode/raceTrack";
import { QuestionSection } from "../../../../components/game/story-mode/questionSection";
import { StoryModeGameHeader } from "../../../../components/game/story-mode/storyModeGameHeader";
import ErrorModal from "../../../../shared/modals/errorModal";
import Spinner, { SmallSpinner } from "../../../../shared/spinners/spinner";
import cofre from "../../../../assets/images/cofre.png";
import cofreAbierto from "../../../../assets/images/cofre-abierto.png";
import type { ChestResponseDto } from "../../../../models/domain/chest/chestResponseDto";
import { openRandomChest } from "../../../../services/chest/chestService";
import fondoGarage from "../../../../assets/images/fondo-garage.png";
import type { ChestItemDto } from "../../../../models/domain/chest/chestItemDto";
import { getErrorMessage } from "../../../../shared/utils/manageErrors";
import type { WildcardType } from "../../../../models/enums/wildcard";
import ErrorModalDuringGame from "../../../../shared/modals/errorModalDuringGame";
import { usePlayer } from "../../../../hooks/usePlayer";

export const StoryModeGame = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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

    const [gameData, setGameData] = useState<StartSoloGameResponseDto | null>(null);
    const [gameSubmitAnswer, setGameSubmitAnswer] = useState<SubmitSoloAnswerResponseDto | null>(null);
    const [gameStatus, setGameStatus] = useState<SoloGameStatusResponseDto | null>(null);

    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [answerResult, setAnswerResult] = useState<"correct" | "wrong" | null>(null);
    const [isAnswering, setIsAnswering] = useState(false);
    const [timeLeft, setTimeLeft] = useState<number>(10);

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [errorMessageDuringGame, setErrorMessageDuringGame] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [isUsingWildcard, setIsUsingWildcard] = useState(false);

    const [isPendingChest, setIsPendingChest] = useState(false);
    const [showChest, setShowChest] = useState(false);
    const [isChestOpen, setIsChestOpen] = useState(false);
    const [rewards, setRewards] = useState(false);
    const [obtainedChest, setObtainedChest] = useState<ChestResponseDto | null>(null);

    const { player } = usePlayer();

    // Guarda la pregunta que se autoenvió (por timeout)
    const [autoSubmittedQuestionIndex, setAutoSubmittedQuestionIndex] = useState<number | null>(null);
    // Guarda el índice actual de pregunta (según estado del juego)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

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
                setIsLoading(true);
                try {
                    // Crear la partida
                    const response: StartSoloGameResponseDto = await startGame(levelId);
                    setGameData(response);
                } catch (error: unknown) {
                    const message = getErrorMessage(error);
                    setErrorMessage(message);
                } finally {
                    setIsLoading(false);
                }
            }

            iniciarPartida()
        }
    }, [startMatch, levelId])

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
    }, [gameData, gameStatus])

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

    // Cada vez que cambia el estado del juego, actualizamos el índice actual
    useEffect(() => {
        if (gameStatus?.currentQuestionIndex != null) {
            setCurrentQuestionIndex(gameStatus.currentQuestionIndex);
        } else if (gameData?.currentQuestion.id != null) {
            setCurrentQuestionIndex(gameData.currentQuestion.id);
        }
    }, [gameStatus?.currentQuestionIndex, gameData?.currentQuestion.id]);

    // Autoenvío cuando se acaba el tiempo
    useEffect(() => {
        if (!startMatch || isAnswering || !gameData?.gameId) return;

        const currentQuestion = gameStatus?.currentQuestion || gameData?.currentQuestion;
        if (!currentQuestion) return;

        // Solo ejecutar si el tiempo llegó a 0 y aún no se autoenvió esta pregunta
        if (timeLeft === 0 && autoSubmittedQuestionIndex !== currentQuestionIndex) {
            // Mostrar modal para avisar que se agotó el tiempo
            setErrorMessageDuringGame("¡Tiempo fuera! Vamos con la siguiente.");

            // Marcar esta pregunta como autoenviada
            setAutoSubmittedQuestionIndex(currentQuestionIndex);

            // Enviar una respuesta automática (aleatoria)
            const allOptions = currentQuestion.options;
            if (!allOptions || allOptions.length === 0) return;
            const randomOption = allOptions[Math.floor(Math.random() * allOptions.length)];

            handleAnswer(randomOption);
        }
    }, [timeLeft, startMatch, isAnswering, gameData, gameStatus, autoSubmittedQuestionIndex, currentQuestionIndex]);

    // Resetear control cuando cambia la pregunta (si querés permitir nuevo autoenvío)
    useEffect(() => {
        if (gameStatus?.currentQuestionIndex != null) {
            // Solo resetear si realmente cambió a una nueva pregunta
            if (gameStatus.currentQuestionIndex !== autoSubmittedQuestionIndex) {
                setAutoSubmittedQuestionIndex(null);
            }
        }
    }, [gameStatus?.currentQuestionIndex]);

    async function handleAnswer(opcion: number) {
        // Si la partida no empezó / no hay datos iniciales / está enviando la respuesta
        if (!startMatch || !gameData || isAnswering) return;

        setSelectedAnswer(opcion);
        setIsAnswering(true);

        try {
            // Enviar respuesta
            const submitAnswerResponse: SubmitSoloAnswerResponseDto = await submitAnswer(gameData.gameId, opcion);

            // Mostrar feedback visual
            setGameSubmitAnswer(submitAnswerResponse);
            setAnswerResult(submitAnswerResponse.isCorrect ? "correct" : "wrong");

            // Si debe abrir el cofre mostramos el cofre
            if (submitAnswerResponse.shouldOpenWorldCompletionChest) {
                const chest: ChestResponseDto = await openRandomChest();
                // Guardamos el cofre pendiente en estado
                setIsPendingChest(true);
                setObtainedChest(chest);
            }

            // Esperar el tiempo indicado por el backend (3 segundos)
            await new Promise((resolve) => setTimeout(resolve, submitAnswerResponse.waitTimeSeconds * 1000));

            // Consultar el estado actualizado de la partida
            const updatedStatus: SoloGameStatusResponseDto = await getGameStatus(gameData.gameId);

            // Actualizar el estado del juego
            setGameStatus(updatedStatus);

            let playerPos = updatedStatus.playerPosition;
            const machinePos = updatedStatus.machinePosition;

            // Actualizar las posiciones de los autos
            if (updatedStatus.hasDoubleProgressActive && submitAnswerResponse.isCorrect) {
                // Si utilizó el comodín para que la respuesta correcta valga doble, avanza dos posiciones:
                playerPos = Math.min(playerPos + 1, gameData.totalQuestions);
            }

            // Si se usó el comodín del matafuego (elimina opciones incorrectas)
            if (updatedStatus.modifiedOptions && updatedStatus.modifiedOptions.length > 0 && updatedStatus.currentQuestion) {
                updatedStatus.currentQuestion = {
                    id: updatedStatus.currentQuestion.id,
                    equation: updatedStatus.currentQuestion.equation,
                    startedAt: updatedStatus.currentQuestion.startedAt,
                    options: updatedStatus.modifiedOptions,
                };
            }

            // Actualizar posiciones visuales
            setPlayerPosition((playerPos / gameData.totalQuestions) * 100);
            setMachinePosition((machinePos / gameData.totalQuestions) * 100);

            // Si el status del juego es distinto de In Progress, significa que terminó
            if (updatedStatus.status !== SoloGameStatus.InProgress) {
                setWinnerModal(true);
                setStartMatch(false); // Detener temporizador y lógicas del juego
            }

            // Resetear feedback visual
            setSelectedAnswer(null);
            setAnswerResult(null);
        } catch (error: unknown) {
            const message = await getErrorMessage(error);
            setErrorMessageDuringGame(message);
        } finally {
            setIsAnswering(false);
            setErrorMessageDuringGame(null);
        }
    }

    function handleCloseWinnerModal() {
        setWinnerModal(false);

        if (isPendingChest && obtainedChest) {
            // Mostrar el cofre al usuario
            setShowChest(true);
        } else {
            // No hay cofre pendiente → redirigir al modo historia
            redirectToStoryMode();
        }
    }

    function redirectToStoryMode() {
        navigate("/modo-historia")
    }

    async function handleWildcardClick(wildcardId: WildcardType) {
        try {
            if (!gameData?.gameId) return;

            // Mostrar Spinner si usa un comodín
            setIsUsingWildcard(true);

            // Forzar que React renderice antes de continuar
            await new Promise(resolve => setTimeout(resolve, 0));

            // Usamos el comodín
            await applyWildcard(gameData.gameId, wildcardId);

            // Esperamos 3 segundos siempre
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Ocultar Spinner solo si estaba activo
            setIsUsingWildcard(false);

            // Actualizamos estado del juego
            const gameStatusAfterUseWildcard: SoloGameStatusResponseDto = await getGameStatus(gameData.gameId);
            setGameStatus(gameStatusAfterUseWildcard);

        } catch (error: unknown) {
            const message = getErrorMessage(error);
            setErrorMessageDuringGame(message);
            setIsUsingWildcard(false);
        }
    }

    return (
        <>
            {isLoading && <Spinner />}

            {showChest ? (
                <>
                    {/* Recompensa */}
                    <div className="relative w-screen h-screen">
                        {/* Fondo */}
                        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${fondoGarage})` }}>
                            <div className="absolute inset-0 bg-black/60"></div>
                        </div>

                        {/* Contenido centrado */}
                        <div className="relative z-10 w-full h-full flex flex-col justify-center items-center gap-4">

                            {!rewards && (
                                <>
                                    {
                                        isChestOpen ? (
                                            <img src={cofreAbierto} alt="Cofre" className="w-70 h-70 object-contain" />
                                        ) : (
                                            <img src={cofre} alt="Cofre" className="w-70 h-70 object-contain" />
                                        )
                                    }
                                </>
                            )}

                            {!rewards && (
                                <button
                                    className="bg-[#0F7079] border-2 border-white rounded-lg text-3xl transition w-32 h-12 text-white"
                                    onClick={() => {
                                        if (isChestOpen) {
                                            setRewards(true);
                                        } else {
                                            setIsChestOpen(true)
                                        }

                                    }}
                                >
                                    {isChestOpen ? "Siguiente" : "Abrir"}
                                </button>

                            )}

                            {rewards && (
                                <div className="flex flex-col items-center gap-6">
                                    {/* Contenedor de las cards */}
                                    <div className="flex justify-center items-center gap-6">
                                        {obtainedChest?.items.map((item: ChestItemDto, index) => {
                                            // Determinar contenido y color según el tipo
                                            let title = "";
                                            let description = "";
                                            let color = "#c0be9a"; // color base
                                            let imageSrc = "";

                                            switch (item.type) {
                                                case "Product":
                                                    title = item.product?.name ?? "Producto misterioso";
                                                    description = item.product?.description ?? "";
                                                    color = item.product?.rarityColor ?? "#c0be9a";
                                                    imageSrc = `/images/products/${item.product?.id}.png`;
                                                    break;

                                                case "Wildcard":
                                                    title = item.wildcard?.name ?? "Comodín";
                                                    description = item.wildcard?.description ?? "";
                                                    color = "#a3e4d7";
                                                    imageSrc = `/images/wildcards/${item.wildcard?.id}.png`;
                                                    break;

                                                case "Coins":
                                                    title = `${item.compensationCoins ?? 0} monedas`;
                                                    description = "Monedas obtenidas del cofre";
                                                    color = "#f4d03f";
                                                    imageSrc = `/images/coin.png`;
                                                    break;

                                                default:
                                                    title = "Recompensa desconocida";
                                                    break;
                                            }

                                            return (
                                                <div
                                                    key={index}
                                                    className="w-60 h-68 rounded-lg border-2 border-white flex flex-col justify-center items-center p-4"
                                                    style={{ backgroundColor: color }}
                                                >
                                                    <img src={imageSrc} alt={title} className="w-24 h-24 object-contain mb-2" />
                                                    <h3 className="text-lg font-bold text-center">{title}</h3>
                                                    {description && (
                                                        <p className="text-sm text-center opacity-80">{description}</p>
                                                    )}
                                                    {item.number && (
                                                        <span className="mt-2 text-sm font-semibold">x{item.number}</span>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Botón debajo y centrado */}
                                    <button
                                        onClick={() => {
                                            setShowChest(false);
                                            setRewards(false);
                                            setObtainedChest(null);
                                            setIsPendingChest(false);
                                            navigate("/modo-historia")
                                        }}
                                        className="bg-[#0F7079] border-2 border-white rounded-lg text-3xl transition w-32 h-12 text-white"
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                </>
            ) : (
                <div className="juego w-full h-full bg-black text-white relative">
                    {/* Header */}
                    <StoryModeGameHeader
                        startMatch={startMatch}
                        gameData={gameData}
                        timeLeft={timeLeft}
                        remainingLives={gameStatus?.livesRemaining ?? 3}
                        onBack={() => navigate("/home")}
                    />

                    {/* Contador */}
                    {showCountdown && (
                        <Semaphore countdown={countdown} />
                    )}

                    {/* Modal de Error */}
                    {errorMessage && (
                        <ErrorModal
                            title="¡Oops!"
                            message={errorMessage}
                            onClose={() => setErrorMessage(null)}
                            onReturn={() => navigate("/home")}
                        />
                    )}

                    {/* Modal de Error */}
                    {errorMessageDuringGame && (
                        <ErrorModalDuringGame
                            title="¡Oops!"
                            message={errorMessageDuringGame}
                            onClose={() => setErrorMessageDuringGame(null)}
                        />
                    )}

                    {/* Modal de Error durante la partida */}
                    {winnerModal && (
                        <EndOfStoryModeModal
                            level={level?.number ?? 0}
                            reward={gameSubmitAnswer?.coinsEarned ?? 0}
                            won={gameStatus?.status === SoloGameStatus.PlayerWon}
                            onClose={handleCloseWinnerModal}
                            remainingLives={gameStatus?.livesRemaining ?? 0}
                        />
                    )}

                    {/* Contenido del Juego */}
                    {startMatch && gameData && (
                        <>
                            {/* Ruta */}
                            <RaceTrack
                                playerPosition={playerPosition}
                                machinePosition={machinePosition}
                                fondoJugador={`/images/backgrounds/${player?.background?.id}.png`}
                                fondoRival={fondoRival}
                                autoJugador={`/images/cars/${player?.car?.id}.png`}
                                autoRival={auto1}
                            />

                            {/* Instrucciones y Comodines */}
                            <WildcardsAndInstructions level={level!} onWildcardClick={handleWildcardClick} />

                            {/* Ecuación y Opciones */}
                            {(gameData || gameStatus) && (
                                isUsingWildcard ? (
                                    <div className="flex flex-col justify-center items-center h-full gap-5 !mb-10 mt-4 bg-black">
                                        <SmallSpinner />
                                    </div>
                                ) : (
                                    <QuestionSection
                                        currentQuestion={gameStatus?.currentQuestion || gameData?.currentQuestion}
                                        selectedAnswer={selectedAnswer}
                                        answerResult={answerResult}
                                        gameSubmitAnswer={gameSubmitAnswer}
                                        handleAnswer={handleAnswer}
                                    />
                                )
                            )}
                        </>
                    )}
                </div>
            )}

        </>
    )
}