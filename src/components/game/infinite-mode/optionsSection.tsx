import type { SubmitInfiniteAnswerResponseDto } from "../../../models/domain/infinite/submitInfiniteAnswerResponseDto";

interface OptionsSectionProps {
    options: number[];
    selectedAnswer: number | null;
    answerResult: "correct" | "wrong" | null;
    gameSubmitAnswer: SubmitInfiniteAnswerResponseDto | null;
    handleAnswer: (option: number) => void;
}

export const OptionsSection = ({
    options,
    selectedAnswer,
    answerResult,
    gameSubmitAnswer,
    handleAnswer
}: OptionsSectionProps) => {
    return (
        <div className="grid grid-cols-2 gap-6 max-w-md justify-center mx-auto">
            {options.map((opcion, i) => {
                let clases =
                    "border-2 border-white rounded-lg text-3xl transition w-20 h-20 flex items-center justify-center bg-[#0F7079]";

                if (selectedAnswer !== null) {
                    if (answerResult === "correct" && opcion === selectedAnswer) {
                        clases += " bg-green-500";
                    } else if (answerResult === "wrong" && opcion === selectedAnswer) {
                        clases += " bg-red-500 opacity-70";
                    } else if (
                        answerResult === "wrong" &&
                        opcion === (gameSubmitAnswer?.correctAnswer ?? null)
                    ) {
                        clases += " bg-green-400 opacity-50";
                    }
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
                );
            })}
        </div>
    );
};
