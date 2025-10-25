import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { faPlus, faMinus, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { productsSectionData } from "../../../shared/data/productsSectionData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Topbar } from "../../../components/store/topbar";
import coinImg from "../../../assets/images/coin.png";
import { categoryLabels } from "../../../models/ui/store";
import type { ProductDto } from "../../../models/domain/productDto";
import { useCart } from "../../../hooks/useCart";

export const ProductDetailsPage = () => {
    const params = useParams();
    const { id } = params;

    const [producto, setProducto] = useState<ProductDto>();
    const [cantidad, setCantidad] = useState(1);
    const [agregado, setAgregado] = useState(false);
    const { addToCart } = useCart();

    useEffect(() => {
        if (!id) return;

        const productId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10);

        // Buscamos el producto en los distintos sections
        for (const section of productsSectionData) {
            const found = section.products.find((p) => p.id === productId);
            if (found) {
                setProducto(found);
                break;
            }
        }
    }, [id]);

    if (!producto) return <div className="p-8 text-center">Cargando producto...</div>;

    const incrementar = () => setCantidad(cantidad + 1);
    const decrementar = () => cantidad > 1 && setCantidad(cantidad - 1);

    const agregarAlCarrito = () => {
        addToCart({
            id: producto.id,
            name: producto.name,
            price: producto.price,
            image: producto.image,
            typeProduct: producto.typeProduct,
            quantity: cantidad,
        });
        setAgregado(true);
        setTimeout(() => setAgregado(false), 2000);
    };

    return (
        <div className="min-h-screen bg-black">

            <Topbar />

            {/* Contenido principal */}
            <div className="mx-auto max-w-6xl text-white p-5">
                <div className="grid gap-8 md:grid-cols-2">
                    {/* Imagen del producto */}
                    <div className="border-2 border-[#00FCFC] bg-card p-6">
                        <div className="relative aspect-square bg-secondary/50 flex items-center justify-center">
                            <img
                                src={producto.image || "/placeholder.svg"}
                                alt={producto.name}
                                className="h-full w-full object-contain pixelated"
                            />
                        </div>

                        {/* Galería de miniaturas (usamos la misma imagen como placeholder) */}
                        <div className="mt-4 grid grid-cols-4 gap-2">
                            {[1, 2, 3, 4].map((i) => (
                                <button
                                    key={i}
                                    className="aspect-square border-2 border-[#00FCFC] bg-secondary/50 hover:border-accent transition-colors"
                                >
                                    <img
                                        src={producto.image || "/placeholder.svg"}
                                        alt={`Vista ${i}`}
                                        className="h-full w-full object-contain pixelated"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Información del producto */}
                    <div className="!space-y-6">
                        <div className="border-2 border-[#00FCFC] bg-card p-6 space-y-4">
                            <div className="inline-block border-2 border-[#00FCFC] bg-secondary px-3 py-2">
                                <span className="text-lg text-primary">{categoryLabels[producto.typeProduct] || producto.typeProduct}</span>
                            </div>
                            <h2 className="text-xl md:text-4xl text-balance py-2">{producto.name}</h2>
                            <div className="flex items-center text-white gap-1">
                                <img src={coinImg} className="w-7 h-7" alt="coin" />
                                <span className="text-2xl">{producto.price}</span>
                            </div>
                        </div>

                        <div className="border-2 border-[#00FCFC] bg-card p-6 mt-10">
                            <h3 className="text-2xl mb-4 text-primary">DESCRIPCIÓN</h3>
                            <p className="text-xl leading-relaxed text-foreground/90">{producto.description}</p>
                        </div>

                        <div className="border-2 border-[#00FCFC] bg-card p-6 space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border-2 border-[#00FCFC]">
                                    <button
                                        onClick={decrementar}
                                        disabled={cantidad <= 1}
                                        className="h-12 w-12 rounded-none border-r-2 border-[#00FCFC] hover:bg-primary/20"
                                    >
                                        <FontAwesomeIcon icon={faMinus} className="h-4 w-4" />
                                    </button>
                                    <div className="flex h-12 w-16 items-center justify-center text-lg">
                                        {cantidad}
                                    </div>
                                    <button
                                        onClick={incrementar}
                                        className="h-12 w-12 rounded-none border-l-2 border-[#00FCFC] hover:bg-primary/20"
                                    >
                                        <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                                    </button>
                                </div>

                                <button
                                    onClick={agregarAlCarrito}
                                    className="flex-1 h-12 bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-[#00FCFC] text-lg gap-2"
                                >
                                    <FontAwesomeIcon icon={faShoppingCart} className="h-4 w-4 px-2" />
                                    {agregado ? "¡AGREGADO!" : "AGREGAR AL CARRITO"}
                                </button>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t-2 border-[#00FCFC]">
                                <span className="text-lg">TOTAL</span>
                                <div className="flex items-center text-white gap-1">
                                    <img src={coinImg} className="w-7 h-7" alt="coin" />
                                    <span className="text-2xl">{(producto.price * cantidad).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
