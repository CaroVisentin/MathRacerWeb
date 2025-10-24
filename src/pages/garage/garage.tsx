import { useState } from "react";
import fondoGarage from "../../assets/images/fondo-garage.png";
import { SelectionSidebar } from "../../components/garage/sidebar";
import { Topbar } from "../../components/garage/topbar";
import { autosData, dataMap } from "../../shared/data/garageData";

export const GaragePage = () => {
    const [activeCategory, setActiveCategory] = useState<"autos" | "personajes" | "fondos">("autos");
    // Reemplazar por el item seleccionado de cada usuario
    const [selectedItemId, setSelectedItemId] = useState(autosData[0].id);

    const selectedData = dataMap[activeCategory];
    const selectedItem = selectedData.find((item) => item.id === selectedItemId);

    return (
        <div className="relative h-screen w-screen flex flex-col p-2">
            {/* Fondo dinámico */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
                style={{
                    backgroundImage: `url(${activeCategory === "fondos" && selectedItem
                        ? selectedItem.imagen
                        : fondoGarage
                        })`,
                }}
            >
                <div className="absolute pointer-events-none inset-0 bg-black/60"></div>
            </div>

            {/* Contenido principal */}
            <div className="relative z-20 h-full flex flex-col">
                {/* Topbar */}
                <Topbar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

                {/* Área principal */}
                <div className="flex flex-1 p-2">
                    {/* Sidebar */}
                    <SelectionSidebar
                        title={activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
                        items={selectedData}
                        selectedItemId={selectedItemId}
                        setSelectedItemId={setSelectedItemId}
                    />

                    {/* Elemento central */}
                    <div className="flex-1 flex justify-center items-center">
                        {activeCategory !== "fondos" && selectedItem && (
                            <img
                                src={selectedItem.imagen}
                                alt={selectedItem.nombre}
                                className="w-140 h-100 object-contain transition-transform duration-500"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
