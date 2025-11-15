interface EquationSectionProps {
    equation: string;
}

export const EquationSection = ({ equation }: EquationSectionProps) => {
    return (
        <div className="flex justify-center mb-6">
            <div className="inline-block border-2 border-white rounded-lg text-5xl px-6 py-3">
                {equation}
            </div>
        </div>
    )
}