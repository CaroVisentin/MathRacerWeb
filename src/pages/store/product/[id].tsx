 import { useParams, useNavigate } from "react-router-dom"
 import { useState, useEffect } from "react";
 import { faPlus, faMinus, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import { Topbar } from "../../../components/store/topbar";
 import coinImg from "../../../assets/images/coin.png";
 import type { ProductDto } from "../../../models/domain/productDto";
 import { useCart } from "../../../hooks/useCart";
 import { usePlayer } from "../../../hooks/usePlayer";
 import { getCars, getCharacters, getBackgrounds } from "../../../services/player/storeService";
 import { resolveImageUrl, type ProductVisualType } from "../../../shared/utils/imageResolver";

 export const ProductDetailsPage = () => {
     const params = useParams();
     const { id } = params;
     const navigate = useNavigate();
     const { player } = usePlayer();

     const [producto, setProducto] = useState<ProductDto | null>(null);
     const [cantidad, setCantidad] = useState(1);
     const [agregado, setAgregado] = useState(false);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState<string | null>(null);
     const { addToCart } = useCart();

     useEffect(() => {
         const fetchProduct = async () => {
             if (!id || !player?.id) return;

             try {
                 setLoading(true);
                 setError(null);

                 const productId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10);

               
                 const [carsResponse, charactersResponse, backgroundsResponse] = await Promise.all([
                     getCars(player.id),
                     getCharacters(player.id),
                     getBackgrounds(player.id)
                 ]);

                 // Buscamos el producto en las respuestas
                 const allProducts = [
                     ...carsResponse.items,
                     ...charactersResponse.items,
                     ...backgroundsResponse.items
                 ];

                 const found = allProducts.find((p) => p.id === productId);

                 if (found) {
                     setProducto(found);
                 } else {
                     setError("Producto no encontrado");
                 }
             } catch (err) {
                 console.error("Error al cargar el producto:", err);
                 setError("Error al cargar el producto");
             } finally {
                 setLoading(false);
             }
         };

         fetchProduct();
     }, [id, player?.id]);

     if (loading) return (
         <div className="min-h-screen bg-black">
             <Topbar />
             <div className="p-8 text-center text-white">Cargando producto...</div>
         </div>
     );

     if (error || !producto) return (
         <div className="min-h-screen bg-black">
             <Topbar />
             <div className="p-8 text-center text-white">{error || "Producto no encontrado"}</div>
         </div>
     );

     const getProductType = (): ProductVisualType => {
         const typeName = producto.productTypeName?.toLowerCase();
         if (typeName === 'auto' || typeName === 'car') return 'car';
         if (typeName === 'personaje' || typeName === 'character') return 'character';
         if (typeName === 'fondo' || typeName === 'background') return 'background';
         return 'car';
     };

     const productImage = producto.imageUrl || resolveImageUrl(getProductType(), producto.id);

     const incrementar = () => setCantidad(cantidad + 1);
     const decrementar = () => cantidad > 1 && setCantidad(cantidad - 1);

     const agregarAlCarrito = () => {
         if (producto.isOwned) {
             alert("Ya posees este producto");
             return;
         }

         addToCart({
             id: producto.id,
             name: producto.name,
             price: producto.price,
             image: productImage,
             typeProduct: producto.productTypeName,
             quantity: cantidad,
         });
         setAgregado(true);
         setTimeout(() => {
             setAgregado(false);
             navigate('/cart');
         }, 1500);
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
                                 src={productImage}
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
                                         src={productImage}
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
                                 <span className="text-lg text-primary">{producto.productTypeName}</span>
                             </div>
                             <h2 className="text-xl md:text-4xl text-balance py-2">{producto.name}</h2>
                             
                             {/* Badge de rareza */}
                             <div className="inline-block bg-black/70 text-white px-3 py-1 rounded text-sm">
                                 {producto.rarity}
                             </div>
                             
                             {/* Badge si ya lo posee */}
                             {producto.isOwned && (
                                 <div className="inline-block bg-green-600 text-white px-3 py-1 rounded text-sm ml-2">
                                     ✓ Ya lo posees
                                 </div>
                             )}
                             
                             <div className="flex items-center text-white gap-1">
                                 <img src={coinImg} className="w-7 h-7" alt="coin" />
                                 <span className="text-2xl">{producto.price} {producto.currency}</span>
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
                                     disabled={producto.isOwned}
                                     className={`flex-1 h-12 border-2 border-[#00FCFC] text-lg gap-2 ${
                                         producto.isOwned 
                                             ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                                             : 'bg-primary text-primary-foreground hover:bg-primary/90'
                                     }`}
                                 >
                                     <FontAwesomeIcon icon={faShoppingCart} className="h-4 w-4 px-2" />
                                     {producto.isOwned 
                                         ? "YA LO POSEES" 
                                         : agregado 
                                             ? "¡AGREGADO!" 
                                             : "AGREGAR AL CARRITO"}
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
