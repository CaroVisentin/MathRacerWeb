interface RaceTrackProps {
    playerBackground: string;
    playerCar: string;
}

export const RaceTrack = ({ playerBackground, playerCar }: RaceTrackProps) => {
    return (
        <div className="mt-20 flex flex-col gap-3 justify-end">
            {/* --- Jugador --- */}
            <div
                className="flex justify-center items-center fondoRuta w-full relative mt-20 border-3 border-[#f95ec8] rounded-lg"
                style={{ backgroundImage: `url('${playerBackground}')`, }}
            >
                <div
                    className="absolute text-white text-l ml-2 px-2 py-1 rounded bg-[#f95ec8]"
                    style={{ left: "0px", top: "-2%", }}
                >
                    Tú
                </div>

                <img
                    src={playerCar || "/placeholder.svg"}
                    alt="Auto Jugador"
                    className="absolute auto transition-all duration-500"
                />
            </div>
        </div>
    );
};
