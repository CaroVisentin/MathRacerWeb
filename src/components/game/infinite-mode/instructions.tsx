interface InstructionProps {
    instruction: string;
}

export const Instruction = ({ instruction }: InstructionProps) => {
    return (
        <div className="flex justify-center items-center gridComodin mt-4">
            <div className={`!text-3xl !m-5`}>
                {`Elegí la opción para que la Y sea ${instruction.toUpperCase()}`}
            </div>
        </div>
    )
}