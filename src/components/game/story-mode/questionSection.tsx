import type { SoloQuestionDto } from "../../../models/domain/story-mode/questionDto";
import type { SubmitSoloAnswerResponseDto } from "../../../models/domain/story-mode/submitSoloAnswerResponseDto";
import { EquationSection } from "./equationSection";
import { OptionsSection } from "./optionsSection";

interface QuestionSectionProps {
    currentQuestion: SoloQuestionDto;
    selectedAnswer: number | null;
    answerResult: "correct" | "wrong" | null;
    gameSubmitAnswer: SubmitSoloAnswerResponseDto | null;
    handleAnswer: (option: number) => void;
}

export const QuestionSection = ({ currentQuestion, selectedAnswer, answerResult, gameSubmitAnswer, handleAnswer, }: QuestionSectionProps) => {
    return (
        <div className="flex flex-col justify-center items-center h-full gap-5 !mb-10 mt-4 bg-black">
            {/* Ecuación */}
            <EquationSection equation={currentQuestion.equation} />

            {/* Opciones */}
            <OptionsSection
                options={currentQuestion.options ?? []}
                selectedAnswer={selectedAnswer}
                answerResult={answerResult}
                gameSubmitAnswer={gameSubmitAnswer}
                handleAnswer={handleAnswer}
            />
        </div>
    );
};
