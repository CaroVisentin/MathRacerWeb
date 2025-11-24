import { useCallback, useEffect, useState } from "react";
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
import { getErrorMessage } from "../../../../shared/utils/manageErrors";
import type { WildcardType } from "../../../../models/enums/wildcard";
import ErrorModalDuringGame from "../../../../shared/modals/errorModalDuringGame";
import { RewardScreen } from "../../../../components/chest/rewardScreen";
import { useEnergy } from "../../../../hooks/useEnergy";
import { usePlayer } from "../../../../hooks/usePlayer";
import { resolveImageUrl } from "../../../../shared/utils/imageResolver";

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
    const playerBackgroundId = player?.equippedBackground?.id ?? player?.background?.id;
    const playerCarId = player?.equippedCar?.id ?? player?.car?.id;
    const fondoJugadorSrc = resolveImageUrl("background", playerBackgroundId);
    const autoJugadorSrc = resolveImageUrl("car", playerCarId);

    // Guarda la pregunta que se autoenvió (por timeout)
    const [autoSubmittedQuestionIndex, setAutoSubmittedQuestionIndex] = useState<number | null>(null);
    // Guarda el índice actual de pregunta (según estado del juego)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

    const { refreshEnergy } = useEnergy()

    const [wildcardQuantities, setWildcardQuantities] = useState({
        fireExtinguisher: 0,
        changeEquation: 0,
        doubleCount: 0,
    });

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

                    // Actualizamos las cantidades iniciales de comodines
                    if (response.availableWildcards) {
                        // Matafuego
                        const extinguisher = response.availableWildcards.find(w => w.wildcardId === 1)?.quantity || 0;
                        // Cambio de rumbo
                        const changeEq = response.availableWildcards.find(w => w.wildcardId === 2)?.quantity || 0;
                        // Nitro
                        const double = response.availableWildcards.find(w => w.wildcardId === 3)?.quantity || 0;

                        setWildcardQuantities({
                            fireExtinguisher: Number(extinguisher),
                            changeEquation: Number(changeEq),
                            doubleCount: Number(double),
                        });
                    }

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

    // Resetear control cuando cambia la pregunta (si querés permitir nuevo autoenvío)
    useEffect(() => {
        if (gameStatus?.currentQuestionIndex != null) {
            // Solo resetear si realmente cambió a una nueva pregunta
            if (gameStatus.currentQuestionIndex !== autoSubmittedQuestionIndex) {
                setAutoSubmittedQuestionIndex(null);
            }
        }
    }, [gameStatus?.currentQuestionIndex, autoSubmittedQuestionIndex]);

    const handleAnswer = useCallback(async (opcion: number) => {
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
    }, [startMatch, gameData, isAnswering, setSelectedAnswer, setIsAnswering, setGameSubmitAnswer, setAnswerResult,
        setIsPendingChest, setObtainedChest, setGameStatus, setPlayerPosition, setMachinePosition, setWinnerModal,
        setStartMatch, setErrorMessageDuringGame]);

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
    }, [timeLeft, startMatch, isAnswering, gameData, gameStatus, autoSubmittedQuestionIndex, currentQuestionIndex, handleAnswer]);

    async function handleCloseWinnerModal() {
        setWinnerModal(false);

        //Refrescamos energía al terminar el juego
        await refreshEnergy();

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

            // Actualizamos las cantidades de comodines según el nuevo estado
            if (gameStatusAfterUseWildcard.availableWildcards) {
                // Matafuego
                const extinguisher = gameStatusAfterUseWildcard.availableWildcards.find(w => w.wildcardId === 1)?.quantity || 0;
                // Cambio de rumbo
                const changeEq = gameStatusAfterUseWildcard.availableWildcards.find(w => w.wildcardId === 2)?.quantity || 0;
                // Nitro
                const double = gameStatusAfterUseWildcard.availableWildcards.find(w => w.wildcardId === 3)?.quantity || 0;

                setWildcardQuantities({
                    fireExtinguisher: Number(extinguisher),
                    changeEquation: Number(changeEq),
                    doubleCount: Number(double),
                });
            }

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
                <RewardScreen
                    isChestOpen={isChestOpen}
                    setIsChestOpen={setIsChestOpen}
                    rewards={rewards}
                    setRewards={setRewards}
                    obtainedChest={obtainedChest}
                    setShowChest={setShowChest}
                    setObtainedChest={setObtainedChest}
                    setIsPendingChest={setIsPendingChest}
                    cofre={cofre}
                    cofreAbierto={cofreAbierto}
                    chestTitle={"¡Felicidades!"}
                    firstMessage={"Acá está tu recompensa por terminar el último nivel del mundo"}
                    secondMessage={"Toca el cofre para verlo"}
                />
            ) : (
                <div className="juego w-full h-full bg-neutral-900 text-white relative">
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

                    {/* Modal de Error durante la partida */}
                    {errorMessageDuringGame && (
                        <ErrorModalDuringGame
                            title="¡Oops!"
                            message={errorMessageDuringGame}
                            onClose={() => setErrorMessageDuringGame(null)}
                        />
                    )}

                    {/* Modal de Ganador */}
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
                                fondoJugador={fondoJugadorSrc}
                                fondoRival={fondoRival}
                                autoJugador={autoJugadorSrc}
                                autoRival={auto1}
                            />

                            {/* Instrucciones y Comodines */}
                            <WildcardsAndInstructions
                                level={level!}
                                onWildcardClick={handleWildcardClick}
                                fireExtinguisherQuantity={wildcardQuantities.fireExtinguisher}
                                changeEquationQuantity={wildcardQuantities.changeEquation}
                                dobleCountQuantity={wildcardQuantities.doubleCount}
                            />

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