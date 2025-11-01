import type { SubmitSoloAnswerResponseDto } from "../../../models/domain/story-mode/submitSoloAnswerResponseDto";

interface OptionsSectionProps {
    options: number[];
    selectedAnswer: number | null;
    answerResult: "correct" | "wrong" | null;
    gameSubmitAnswer: SubmitSoloAnswerResponseDto | null;
    handleAnswer: (option: number) => void;
}

export const OptionsSection = ({ options, selectedAnswer, answerResult, gameSubmitAnswer, handleAnswer }: OptionsSectionProps) => {
    return (
        <div className="flex justify-center items-center mt-3 gap-6 opciones">
            {options.map((opcion, i) => {
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
    )
}