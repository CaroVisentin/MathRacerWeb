import type { InfiniteQuestionDto } from "../../../models/domain/infinite/infiniteQuestionDto";
import type { SubmitInfiniteAnswerResponseDto } from "../../../models/domain/infinite/submitInfiniteAnswerResponseDto";
import { EquationSection } from "./equationSection";
import { OptionsSection } from "./optionsSection";

interface QuestionSectionProps {
    question: InfiniteQuestionDto;
    selectedAnswer: number | null;
    answerResult: "correct" | "wrong" | null;
    gameSubmitAnswer: SubmitInfiniteAnswerResponseDto | null;
    handleAnswer: (option: number) => void;
}

export const QuestionSection = ({
    question,
    selectedAnswer,
    answerResult,
    gameSubmitAnswer,
    handleAnswer
}: QuestionSectionProps) => {
    return (
        <div className="flex flex-col justify-center items-center h-full gap-5 !mb-10 mt-4 text-white">
            {/* Ecuación */}
            <EquationSection equation={question.equation} />

            {/* Opciones */}
            <OptionsSection
                options={question.options}
                selectedAnswer={selectedAnswer}
                answerResult={answerResult}
                gameSubmitAnswer={gameSubmitAnswer}
                handleAnswer={handleAnswer}
            />
        </div>
    );
};

