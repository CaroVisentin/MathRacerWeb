import type { Auto } from "../../models/ui/auto";

interface AutosSidebarProps {
    autos: Auto[];
    selectedAutoId: number;
    setSelectedAutoId: (id: number) => void;
}

export const AutosSidebar = ({ autos, selectedAutoId, setSelectedAutoId }: AutosSidebarProps) => {
    return (
        <div className="w-70 bg-black p-2 flex flex-col gap-2 overflow-y-auto max-h-[90vh]">
            <h2 className="text-white text-center"> Autos disponibles </h2>

            {autos.map((auto) => {
                const isSelected = auto.id === selectedAutoId;

                return (
                    <>
                        <div
                            key={auto.id}
                            onClick={() => setSelectedAutoId(auto.id)}
                            className={`
                            p-2 flex flex-col items-center gap-2 cursor-pointer
                            ${isSelected
                                    ? "bg-[#858686] border border-2 border-white"
                                    : "bg-gray-700 border border-gray-600 hover:ring-2 ring-blue-400"}
                        `}
                        >
                            <span className="text-white text-lg">{auto.nombre}</span>
                            <img src={auto.imagen} alt={auto.nombre} className="w-40 h-20 object-contain" />
                        </div>
                    </>
                );
            })}
        </div>
    );
};
