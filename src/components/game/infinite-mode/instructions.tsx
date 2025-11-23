interface InstructionProps {
    instruction: string;
}

export const Instruction = ({ instruction }: InstructionProps) => {
    return (
        <div className="flex justify-center items-center gridComodin mt-4">
            <div className={`!text-3xl !m-5`}>
                Elegí la opción para que{" "}
                <span className="text-cyan-400 font-bold drop-shadow-[0_0_5px_#00ffff] ">
                    Y
                </span>{" "}
                sea{" "}
                <span className="text-cyan-400 font-bold drop-shadow-[0_0_20px_#00ffff] ">
                    {instruction.toUpperCase()}
                </span>
            </div>
        </div>
    )
}