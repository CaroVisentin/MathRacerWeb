import { RaceTrack } from "../../../components/game/infinite-mode/raceTrack"
import playerBackground from "../../../assets/images/backgrounds/f1.png";
import playerCar from "../../../assets/images/cars/a1.png";
import { Instruction } from "../../../components/game/infinite-mode/instructions";
import { QuestionSection } from "../../../components/game/infinite-mode/questionSection";
import { useEffect, useState } from "react";
import { abandonInfiniteGame, getInfiniteGameStatus, loadNextBatch, startInfiniteGame, submitInfiniteAnswer } from "../../../services/game/infinite-mode/infiniteModeGameService";
import type { StartInfiniteGameResponseDto } from "../../../models/domain/infinite/startInfiniteGameResponseDto";
import { getErrorMessage } from "../../../shared/utils/manageErrors";
import ErrorModalDuringGame from "../../../shared/modals/errorModalDuringGame";
import type { SubmitInfiniteAnswerResponseDto } from "../../../models/domain/infinite/submitInfiniteAnswerResponseDto";
import type { SubmitInfiniteAnswerRequestDto } from "../../../models/domain/infinite/submitInfiniteAnswerRequestDto";
import type { InfiniteQuestionDto } from "../../../models/domain/infinite/infiniteQuestionDto";
import type { InfiniteGameStatusResponseDto } from "../../../models/domain/infinite/infiniteGameStatusResponseDto";
import { InfiniteModeGameHeader } from "../../../components/game/infinite-mode/infiniteModeGameHeader";
import ConfirmActionModal from "../../../shared/modals/confirmModalAction";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../shared/spinners/spinner";

export const InfiniteModeGame = () => {

    const navigate = useNavigate();
    // Ponerle conitos en zigzag, efectos tipo vibraciones/humito/choque cada vez que responde mal

    const [gameData, setGameData] = useState<StartInfiniteGameResponseDto | null>(null);
    const [gameSubmitAnswer, setGameSubmitAnswer] = useState<SubmitInfiniteAnswerResponseDto | null>(null);
    const [gameStatus, setGameStatus] = useState<InfiniteGameStatusResponseDto | null>(null);

    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [answerResult, setAnswerResult] = useState<"correct" | "wrong" | null>(null);
    const [isAnswering, setIsAnswering] = useState(false);

    const [questions, setQuestions] = useState<InfiniteQuestionDto[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentQuestion = questions[currentIndex];

    const [errorMessageDuringGame, setErrorMessageDuringGame] = useState<string | null>(null);

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const iniciarPartida = async () => {
            try {
                const startInfiniteGameResponse: StartInfiniteGameResponseDto = await startInfiniteGame();

                setGameData(startInfiniteGameResponse);
                setQuestions(startInfiniteGameResponse.questions);
                setCurrentIndex(0);

            } catch (error: unknown) {
                setErrorMessageDuringGame(getErrorMessage(error))
            }
        }

        iniciarPartida();
    }, [])

    async function handleAnswer(opcion: number) {
        if (isAnswering) return;

        setSelectedAnswer(opcion);
        setIsAnswering(true);

        try {
            const answer: SubmitInfiniteAnswerRequestDto = { selectedAnswer: opcion };
            const submitResp = await submitInfiniteAnswer(gameData?.gameId ?? 0, answer);

            setGameSubmitAnswer(submitResp);
            setAnswerResult(submitResp.isCorrect ? "correct" : "wrong");

            // Mostrar feedback por 1s
            await new Promise(res => setTimeout(res, 1000));

            const updatedStatus = await getInfiniteGameStatus(gameData?.gameId ?? 0);
            setGameStatus(updatedStatus);

            if (submitResp.needsNewBatch) {
                const nextBatch = await loadNextBatch(gameData?.gameId ?? 0);
                setQuestions(nextBatch.questions);
                setCurrentIndex(0);
            } else {
                setCurrentIndex(submitResp.currentQuestionIndex);
            }

        } catch (error) {
            setErrorMessageDuringGame(getErrorMessage(error));
        } finally {
            // Reset de feedback después del delay
            setSelectedAnswer(null);
            setAnswerResult(null);
            setIsAnswering(false);
        }
    }

    async function abandonGame() {
        try {
            const response: InfiniteGameStatusResponseDto = await abandonInfiniteGame(gameData?.gameId ?? 0);
            setGameStatus(response);

            // Mostrar carga por 1s
            setIsLoading(true);
            await new Promise(res => setTimeout(res, 1000));
            setIsLoading(false);

            // Redirigir al home
            navigate("/home")

        } catch (error: unknown) {
            setErrorMessageDuringGame(getErrorMessage(error))
        }
    }

    if (!currentQuestion) return null;

    return (
        <div className="juego w-full h-full bg-neutral-900 text-white relative">

            {isLoading && <Spinner />}

            <InfiniteModeGameHeader
                totalCorrectAnswers={gameStatus?.totalCorrectAnswers ?? 0}
                onBack={() => setShowConfirmModal(true)}
            />

            {errorMessageDuringGame && (
                <ErrorModalDuringGame
                    title="¡Oops!"
                    message={errorMessageDuringGame}
                    onClose={() => setErrorMessageDuringGame(null)}
                />
            )}

            {showConfirmModal && (
                <ConfirmActionModal
                    title={'¿Está seguro de abandonar la partida?'}
                    message={''}
                    onCancel={() => setShowConfirmModal(false)}
                    onConfirm={() => {
                        abandonGame();
                        setShowConfirmModal(false);
                    }}
                />
            )}

            <RaceTrack
                playerBackground={playerBackground}
                playerCar={playerCar}
            />

            <Instruction instruction={currentQuestion.expectedResult} />

            <QuestionSection
                question={currentQuestion}
                selectedAnswer={selectedAnswer}
                answerResult={answerResult}
                gameSubmitAnswer={gameSubmitAnswer}
                handleAnswer={handleAnswer}
            />
        </div>
    )
}