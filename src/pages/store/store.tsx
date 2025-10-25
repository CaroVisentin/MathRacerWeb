import { useState } from "react";
import { Topbar } from "../../components/store/topbar";
import { SpecialOffer } from "../../components/store/specialOffer";
import { ProductsSection } from "../../components/store/productsSection";
import { productsSectionData } from "../../shared/data/productsSectionData";
import { CategorySelector } from "../../components/store/categorySelector";

export const StorePage = () => {
    const [activeCategory, setActiveCategory] = useState<
        "cars" | "characters" | "backgrounds" | "coins" | "energy"
    >("cars");

    return (
        <div className="min-h-screen w-screen flex flex-col bg-black">
            {/* Topbar */}
            <Topbar />
            <CategorySelector activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>

            {/* Contenido principal */}
            <div className="flex-1 flex flex-col overflow-y-auto px-4 gap-6">
                {/* Oferta especial */}
                <SpecialOffer />

                {/* Sección de productos */}
                <ProductsSection categories={productsSectionData} />
            </div>
        </div>
    );
};
