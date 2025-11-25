import { useEffect, useState } from "react";
import { AppHeader } from "../../components/shared/appHeader";
import { SpecialOffer } from "../../components/store/specialOffer";
import { ProductsSection } from "../../components/store/productsSection";
import { CoinsSection } from "../../components/store/coinsSection";
import { CategorySelector } from "../../components/store/categorySelector";
import { usePlayer } from "../../hooks/usePlayer";
import { getCars, getCharacters, getBackgrounds, getCoinsPackage } from "../../services/player/storeService";
import type { ProductDto } from "../../models/domain/store/productDto";
import type { CoinPackageDto } from "../../models/domain/store/coinPackageDto";
import { Topbar } from "../../components/store/topbar";

export const StorePage = () => {
  const [activeCategory, setActiveCategory] = useState<
    "cars" | "characters" | "backgrounds" | "coins" | "energy"
  >("cars");
  const { player } = usePlayer();
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [coinPackages, setCoinPackages] = useState<CoinPackageDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


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
            break;
          }
          case "characters": {
            const response = await getCharacters(player.id);
            setProducts(response.items);
            setCoinPackages([]);
            break;
          }
          case "backgrounds": {
            const response = await getBackgrounds(player.id);
            setProducts(response.items);
            setCoinPackages([]);
            break;
          }
          case "coins": {
            const packages = await getCoinsPackage();
            setCoinPackages(packages);
            setProducts([]);
            break;
          }
          default:
            // Para energy, no hay endpoint aún
            setProducts([]);
            setCoinPackages([]);
            setLoading(false);
            return;
        }
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("No se pudieron cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory, player?.id]);

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


        {!loading && !error && activeCategory !== "coins" && products.length > 0 && (
          <ProductsSection
            categories={[
              {
                title: getCategoryTitle(),
                products: products,
              },
            ]}
          />
        )}

        {!loading && !error && activeCategory === "coins" && coinPackages.length === 0 && (
          <div className="text-white text-center py-8">
            No hay paquetes de monedas disponibles
          </div>
        )}

        {!loading && !error && activeCategory !== "coins" && products.length === 0 && (
          <div className="text-white text-center py-8">
            No hay productos disponibles
          </div>
        )}

      </div>
    </div>
  );
  
};


