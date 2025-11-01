interface RaceTrackProps {
    playerPosition: number;
    machinePosition: number;
    fondoJugador: string;
    fondoRival: string;
    autoJugador: string;
    autoRival: string;
}

export const RaceTrack = ({ playerPosition, machinePosition, fondoJugador, fondoRival, autoJugador, autoRival, }: RaceTrackProps) => {
    return (
        <div className="mt-20 flex flex-col gap-3 justify-end">
            {/* --- Máquina --- */}
            <div
                className="flex justify-center items-center fondoRuta w-full relative mt-20 border-3 border-[#5df9f9] rounded-lg"
                style={{ backgroundImage: `url('${fondoRival}')`, }}
            >
                <div
                    className="absolute text-[#000000] text-l ml-2 px-2 py-1 rounded bg-[#5df9f9]"
                    style={{ left: "0px", top: "-2%", }}
                >
                    Máquina
                </div>

                <img
                    src={autoRival || "/placeholder.svg"}
                    alt="Auto Rival"
                    className="absolute bottom-[180px] auto auto2"
                    style={{ left: `${machinePosition}%` }}
                />
            </div>

            {/* --- Jugador --- */}
            <div
                className="flex justify-center items-center fondoRuta w-full relative mt-20 border-3 border-[#f95ec8] rounded-lg"
                style={{ backgroundImage: `url('${fondoJugador}')`, }}
            >
                <div
                    className="absolute text-white text-l ml-2 px-2 py-1 rounded bg-[#f95ec8]"
                    style={{ left: "0px", top: "-2%", }}
                >
                    Tú
                </div>

                <img
                    src={autoJugador || "/placeholder.svg"}
                    alt="Auto Jugador"
                    className="absolute auto transition-all duration-500"
                    style={{ left: `${playerPosition}%` }}
                />
            </div>
        </div>
    );
};
