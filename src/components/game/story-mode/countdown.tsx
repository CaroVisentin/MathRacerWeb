interface CountdownProps {
    countdown: number;
}

export const Countdown = ({ countdown }: CountdownProps) => {
    return (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-90 z-20">
            <h2 className="text-7xl mb-4 text-[#5df9f9]">¡PREPARATE!</h2>

            <div className="flex gap-6 text-8xl font-bold">
                <span className={`${countdown === 3 ? "text-[#5df9f9]" : "text-gray-600"}`}>3</span>
                <span className={`${countdown === 2 ? "text-[#5df9f9]" : "text-gray-600"}`}>2</span>
                <span className={`${countdown === 1 ? "text-[#5df9f9]" : "text-gray-600"}`}>1</span>
            </div>
        </div>
    )
}