import { useEffect, useMemo, useState } from "react";
import fondoGarage from "../../assets/images/fondo-garage.png";
import { SelectionSidebar } from "../../components/garage/sidebar";
import { Topbar } from "../../components/garage/topbar";
import type { ItemSelectable } from "../../models/ui/garage";
import { usePlayer } from "../../hooks/usePlayer";
import {
    getPlayerBackgrounds,
    getPlayerCars,
    getPlayerCharacters,
    activatePlayerItem,
    type GarageItemsResponseDto,
    type GarageItemDto,
    type ProductTypeApi,
} from "../../services/player/garageService";
import { resolveImageUrl } from "../../shared/utils/imageResolver";
import ErrorConnection from "../../shared/modals/errorConnection";

export const GaragePage = () => {
    const { player } = usePlayer();
    const [activeCategory, setActiveCategory] = useState<"cars" | "characters" | "backgrounds">("cars");
    const [cars, setCars] = useState<ItemSelectable[]>([]);
    const [characters, setCharacters] = useState<ItemSelectable[]>([]);
    const [backgrounds, setBackgrounds] = useState<ItemSelectable[]>([]);
    const [selectedItemId, setSelectedItemId] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const mapDtoToSelectable = (resp: GarageItemsResponseDto, type: ProductTypeApi): ItemSelectable[] => {
        return (resp.items || []).map(i => ({
            id: i.productId, // usamos productId para activar y para resolver imagen
            name: i.name,
            image: resolveImageUrl(
                type === "Auto" ? "car" : type === "Personaje" ? "character" : "background",
                i.productId
            ),
            isOwned: i.isOwned,
            isActive: i.isActive,
        }));
    };

    useEffect(() => {
        const fetchAll = async () => {
            if (!player?.id) return;
            try {
                setLoading(true);
                setError(null);
                const [cResp, chResp, bResp] = await Promise.all([
                    getPlayerCars(player.id),
                    getPlayerCharacters(player.id),
                    getPlayerBackgrounds(player.id)
                ]);
                setCars(mapDtoToSelectable(cResp, "Auto"));
                setCharacters(mapDtoToSelectable(chResp, "Personaje"));
                setBackgrounds(mapDtoToSelectable(bResp, "Fondo"));

                // Preseleccionar el activo del primer tab (autos)
                const activeInCars = cResp.activeItem?.productId;
                const firstOwnedCar = cResp.items?.find((i: GarageItemDto) => i.isOwned)?.productId ?? cResp.items?.[0]?.productId;
                setSelectedItemId(activeInCars || firstOwnedCar || 0);
            } catch (e: any) {
                setError("No se pudo cargar el Garage");
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, [player?.id]);

    // Cambiar selección al cambiar de categoría
    useEffect(() => {
        const list = activeCategory === "cars" ? cars : activeCategory === "characters" ? characters : backgrounds;
        if (!list.length) return;
        // Preferir activo de la categoría, luego el primero adquirido, luego el primero
        const active = list.find(i => i.isActive);
        const firstOwned = list.find(i => i.isOwned);
        const fallback = list[0];
        const preferredId = (active?.id ?? firstOwned?.id ?? fallback?.id);
        if (!list.some(i => i.id === selectedItemId)) {
            if (preferredId !== undefined) setSelectedItemId(preferredId);
        }
    }, [activeCategory, cars, characters, backgrounds]);

    const selectedData = useMemo(() => {
        return activeCategory === "cars" ? cars : activeCategory === "characters" ? characters : backgrounds;
    }, [activeCategory, cars, characters, backgrounds]);
    const selectedItem = selectedData.find((item) => item.id === selectedItemId);

    const handleActivate = async () => {
        if (!player?.id || !selectedItemId) return;
        const type: ProductTypeApi = activeCategory === "cars" ? "Auto" : activeCategory === "characters" ? "Personaje" : "Fondo";
        const list = activeCategory === "cars" ? cars : activeCategory === "characters" ? characters : backgrounds;
        const selected = list.find(i => i.id === selectedItemId);
        if (!selected?.isOwned || selected.isActive) return; // nada que hacer
        try {
            await activatePlayerItem(player.id, selectedItemId, type);
            // Actualizar estado local para reflejar activación
            const updateActive = (arr: ItemSelectable[]) => arr.map(it => ({ ...it, isActive: it.id === selectedItemId }));
            if (activeCategory === "cars") setCars(prev => updateActive(prev));
            if (activeCategory === "characters") setCharacters(prev => updateActive(prev));
            if (activeCategory === "backgrounds") setBackgrounds(prev => updateActive(prev));
        } catch {
            setError("No se pudo activar el ítem seleccionado");
        }
    };

    return (
        <div className="relative h-screen w-screen flex flex-col p-2">
            {/* Fondo dinámico */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
                style={{
                    backgroundImage: `url(${activeCategory === "backgrounds" && selectedItem
                        ? selectedItem.image
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
                        {activeCategory !== "backgrounds" && selectedItem && (
                            <img
                                src={selectedItem.image}
                                alt={selectedItem.name}
                                className="w-140 h-100 object-contain transition-transform duration-500"
                            />
                        )}
                    </div>
                </div>
                <div className="p-2 flex justify-center">
                    <button
                        type="button"
                        disabled={!selectedItem?.isOwned || selectedItem?.isActive}
                        className={`text-black text-lg py-2 px-4 rounded transition-colors
                            ${!selectedItem?.isOwned || selectedItem?.isActive
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-cyan-400 hover:bg-cyan-300"}
                        `}
                        onClick={handleActivate}
                    >
                        {selectedItem?.isActive ? "Ya activo" : !selectedItem?.isOwned ? "No adquirido" : "Activar seleccionado"}
                    </button>
                </div>
            </div>

            {loading && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-30">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400" />
                </div>
            )}
            {error && <ErrorConnection message={error} onClose={() => setError(null)} />}
        </div>
    );
};
