
interface SemaphoreProps {
    countdown: number;
}

export const Semaphore = ({ countdown }: SemaphoreProps) => {
    return (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-90 z-20">
            <h2 className="text-6xl !mb-6 text-white">¡PREPARATE!</h2>

            <div className="flex gap-2">
                {/* Luz 3 */}
                <div
                    className={`w-24 h-24 border-4 border-gray-700 ${countdown === 3 ? "bg-red-500" : "bg-gray-600"}`}
                    style={{ imageRendering: "pixelated" }}
                ></div>

                {/* Luz 2 */}
                <div
                    className={`w-24 h-24 border-4 border-gray-700 ${countdown === 2 ? "bg-yellow-400" : "bg-gray-600"}`}
                    style={{ imageRendering: "pixelated" }}
                ></div>

                {/* Luz 1 */}
                <div
                    className={`w-24 h-24 border-4 border-gray-700 ${countdown === 1 ? "bg-green-500" : "bg-gray-600"}`}
                    style={{ imageRendering: "pixelated" }}
                ></div>
            </div>
        </div>
    );
};
