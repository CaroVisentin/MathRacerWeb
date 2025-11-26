import { useCallback, useEffect, useState } from "react";
import { AppHeader } from "../../components/shared/appHeader";
import { ProductsSection } from "../../components/store/productsSection";
import { CoinsSection } from "../../components/store/coinsSection";
import { CategorySelector } from "../../components/store/categorySelector";
import { usePlayer } from "../../hooks/usePlayer";
import { getCars, getCharacters, getBackgrounds, getCoinsPackage } from "../../services/player/storeService";
import { getEnergyStoreInfo } from "../../services/energy/energyService";
import { getStoreWildcards } from "../../services/wildcard/wildcardService";
import type { ProductDto } from "../../models/domain/store/productDto";
import type { CoinPackageDto } from "../../models/domain/store/coinPackageDto";
import type { EnergyStoreInfoDto } from "../../models/domain/energy/energyStoreInfoDto";
import type { StoreWildcardDto } from "../../models/domain/store/storeWildcardDto";
import { Topbar } from "../../components/store/topbar";
import { EnergyWildcardsStoreSection } from "../../components/store/energyWildcardsStoreSection";

export const StorePage = () => {
  const [activeCategory, setActiveCategory] = useState<
    "cars" | "characters" | "backgrounds" | "coins" | "energy"
  >("cars");
  const { player } = usePlayer();

  const [products, setProducts] = useState<ProductDto[]>([]);
  const [coinPackages, setCoinPackages] = useState<CoinPackageDto[]>([]);
  const [energyStoreInfo, setEnergyStoreInfo] = useState<EnergyStoreInfoDto | null>(null);
  const [storeWildcards, setStoreWildcards] = useState<StoreWildcardDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadEnergyCategory = useCallback(async () => {
    if (!player?.id) return;
    const [energyInfo, wildcards] = await Promise.all([
      getEnergyStoreInfo(player.id),
      getStoreWildcards(player.id),
    ]);
    setEnergyStoreInfo(energyInfo);
    setStoreWildcards(wildcards);
    setProducts([]);
    setCoinPackages([]);
  }, [player?.id]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!player?.id) return;

      setLoading(true);
      setError(null);

      try {
        switch (activeCategory) {
          case "cars": {
            const response = await getCars(player.id);
            setProducts(response.items);
            setCoinPackages([]);
            setEnergyStoreInfo(null);
            setStoreWildcards([]);
            break;
          }
          case "characters": {
            const response = await getCharacters(player.id);
            setProducts(response.items);
            setCoinPackages([]);
            setEnergyStoreInfo(null);
            setStoreWildcards([]);
            break;
          }
          case "backgrounds": {
            const response = await getBackgrounds(player.id);
            setProducts(response.items);
            setCoinPackages([]);
            setEnergyStoreInfo(null);
            setStoreWildcards([]);
            break;
          }
          case "coins": {
            const packages = await getCoinsPackage();
            setCoinPackages(packages);
            setProducts([]);
            setEnergyStoreInfo(null);
            setStoreWildcards([]);
            break;
          }
          case "energy": {
            await loadEnergyCategory();
            break;
          }
          default:
            setProducts([]);
            setCoinPackages([]);
            setEnergyStoreInfo(null);
            setStoreWildcards([]);
            break;
        }
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("No se pudieron cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory, player?.id, loadEnergyCategory]);

  const getCategoryTitle = () => {
    switch (activeCategory) {
      case "cars":
        return "Autos";
      case "characters":
        return "Personajes";
      case "backgrounds":
        return "Fondos";
      case "coins":
        return "Monedas";
      case "energy":
        return "Energía";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-neutral-900 overflow-x-hidden">
      <AppHeader />
      <Topbar />
      <CategorySelector
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-y-auto px-4 gap-6">
        {/* Oferta especial */}
     

        {/* Sección de productos */}
        {loading && (
          <div className="text-white text-center py-8">
            Cargando productos...
          </div>
        )}

        {error && <div className="text-red-500 text-center py-8">{error}</div>}

        {!loading && !error && activeCategory === "coins" && coinPackages.length > 0 && (
          <CoinsSection packages={coinPackages} playerId={player?.id} />
        )}


        {!loading && !error && activeCategory !== "coins" && activeCategory !== "energy" && products.length > 0 && (
          <ProductsSection
            categories={[
              {
                title: getCategoryTitle(),
                products: products,
              },
            ]}
          />
        )}

        {!loading && !error && activeCategory === "energy" && (
          <EnergyWildcardsStoreSection
            playerId={player?.id}
            energyInfo={energyStoreInfo}
            wildcards={storeWildcards}
            onReload={loadEnergyCategory}
          />
        )}

        {!loading && !error && activeCategory === "coins" && coinPackages.length === 0 && (
          <div className="text-white text-center py-8">
            No hay paquetes de monedas disponibles
          </div>
        )}

        {!loading && !error && activeCategory !== "coins" && activeCategory !== "energy" && products.length === 0 && (
          <div className="text-white text-center py-8">
            No hay productos disponibles
          </div>
        )}

        {!loading && !error && activeCategory === "energy" && !energyStoreInfo && storeWildcards.length === 0 && (
          <div className="text-white text-center py-8">
            No pudimos cargar la información de energía.
          </div>
        )}

      </div>
    </div>
  );
  
};


