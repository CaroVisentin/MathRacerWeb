import { useState } from "react";
import fondoGarage from "../../assets/images/fondo-garage.png";
import { AutosSidebar } from "../../components/garage/sidebar";
import { Topbar } from "../../components/garage/topbar";
import { autosData } from "../../shared/data/autosSidebarData";

export const GaragePage = () => {
    // Estado del auto seleccionado
    const [selectedAutoId, setSelectedAutoId] = useState(autosData[0].id);

    const selectedAuto = autosData.find((auto) => auto.id === selectedAutoId);

    return (
        <div className="relative h-screen w-screen flex flex-col p-2">
            {/* Fondo del Garage */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${fondoGarage})` }}
            >
                <div className="absolute pointer-events-none inset-0 bg-black/60"></div>
            </div>

            {/* Contenido principal */}
            <div className="relative z-20 h-full flex flex-col">
                {/* Topbar */}
                <Topbar />

                {/* Área principal: sidebar + auto centrado */}
                <div className="flex flex-1 p-2">
                    {/* Sidebar a la izquierda */}
                    <AutosSidebar
                        autos={autosData}
                        selectedAutoId={selectedAutoId}
                        setSelectedAutoId={setSelectedAutoId}
                    />

                    {/* Auto en el medio */}
                    <div className="flex-1 flex justify-center items-center">
                        {selectedAuto && (
                            <img
                                src={selectedAuto.imagen}
                                alt={selectedAuto.nombre}
                                className="w-140 h-100 object-contain"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
