import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { EndOfStoryModeModal } from "../../../../shared/modals/endOfStoryModeModal";
import fondoRival from "../../../../assets/images/pista-montana.png";
import fondoJugador from "../../../../assets/images/pista-noche.png";
import auto1 from "../../../../assets/images/auto.png";
import { getGameStatus, startGame, submitAnswer } from "../../../../services/game/story-mode/storyModeGameService";
import type { StartSoloGameResponseDto } from "../../../../models/domain/story-mode/startSoloGameResponseDto";
import type { SoloGameStatusResponseDto } from "../../../../models/domain/story-mode/soloGameStatusResponseDto";
import type { SubmitSoloAnswerResponseDto } from "../../../../models/domain/story-mode/submitSoloAnswerResponseDto";
import { SoloGameStatus } from "../../../../models/enums/soloGameStatus";
import type { LevelDtoUi } from "../../../../models/ui/story-mode/levelDtoUi";
import { Countdown } from "../../../../components/game/story-mode/countdown";
import { WildcardsAndInstructions } from "../../../../components/game/story-mode/wildcardsAndInstructions";
import { RaceTrack } from "../../../../components/game/story-mode/raceTrack";
import { QuestionSection } from "../../../../components/game/story-mode/questionSection";
import { StoryModeGameHeader } from "../../../../components/game/story-mode/storyModeGameHeader";

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
            if (updatedStatus.status !== SoloGameStatus.InProgress) {
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
                    <Countdown countdown={countdown} />
                )}

                {/* Modal de Resultados */}
                {winnerModal && (
                    <EndOfStoryModeModal
                        level={level?.number ?? 0}
                        reward={0}
                        won={gameStatus?.status === SoloGameStatus.PlayerWon}
                        onClose={() => navigate("/home")}
                        onNext={() => { setWinnerModal(false) }}
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
                            fondoJugador={fondoJugador}
                            fondoRival={fondoRival}
                            autoJugador={auto1}
                            autoRival={auto1}
                        />

                        {/* Instrucciones y Comodines */}
                        <WildcardsAndInstructions level={level!} />

                        {/* Ecuación y Opciones */}
                        {(gameData || gameStatus) && (
                            <QuestionSection
                                currentQuestion={gameStatus?.currentQuestion || gameData?.currentQuestion}
                                selectedAnswer={selectedAnswer}
                                answerResult={answerResult}
                                gameSubmitAnswer={gameSubmitAnswer}
                                handleAnswer={handleAnswer}
                            />
                        )}
                    </>
                )}
            </div>
        </>
    )
}