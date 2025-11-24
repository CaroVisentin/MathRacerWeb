interface GameHeaderProps {
    totalCorrectAnswers: number;
    onBack: () => void;
}

export const InfiniteModeGameHeader = ({ totalCorrectAnswers, onBack }: GameHeaderProps) => {
    return (
        <div className="flex justify-between items-center bg-neutral-900 px-4 py-3 z-10">
            {/* Botón de volver */}
            <button className="inline-flex h-12 w-12 items-center justify-center text-white text-xl border border-white hover:text-[#f95ec8] hover:animate-coin-flip" onClick={onBack}>
             <i className="ri-arrow-left-line text-2xl"></i>

            </button>

            <div>
                Respuestas correctas: {totalCorrectAnswers}
            </div>
        </div>
    );
};
