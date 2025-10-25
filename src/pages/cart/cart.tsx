"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../../hooks/useCart";
import { faMinus, faPlus, faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Topbar } from "../../components/cart/topbar";
import coinImg from "../../assets/images/coin.png";

export default function CartPage() {
    const { cart, updateQuantity, removeFromCart } = useCart()

    const incrementar = (id: number) => {
        const item = cart.find((i) => i.id === id)
        if (item) updateQuantity(id, item.quantity + 1)
    }

    const decrementar = (id: number) => {
        const item = cart.find((i) => i.id === id)
        if (item && item.quantity > 1) updateQuantity(id, item.quantity - 1)
    }

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

    return (
        <div className="min-h-screen bg-black text-white">
            <Topbar />

            <div className="mx-auto max-w-6xl text-white p-5">
                {cart.length === 0 ? (
                    <div className="border-4 border-[#00FCFC] bg-card p-8 flex flex-col items-center gap-4">
                        <FontAwesomeIcon icon={faShoppingCart} className="h-12 w-12 text-primary" />
                        <h2 className="text-primary text-xl ">CARRITO VACÍO</h2>
                        <p className="text-lg text-center max-w-sm">
                            No hay productos en tu carrito. Explora la tienda y agrega algunos items.
                        </p>
                        <Link to="/store">
                            <button type="button" className="bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-[#00FCFC] text-lg px-4 py-2">
                                IR A LA TIENDA
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
                        {/* Lista de productos */}
                        <div className="!space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="border-4 border-[#00FCFC] bg-card p-4 flex gap-4">
                                    <div className="w-24 h-24 border-2 border-[#00FCFC] bg-secondary/50 flex items-center justify-center shrink-0">
                                        <img
                                            src={item.image || "/placeholder.svg"}
                                            alt={item.name}
                                            className="w-full h-full object-contain pixelated"
                                        />
                                    </div>

                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-xl text-balance ">{item.name}</h3>
                                            <div className="flex items-center text-white gap-1 mt-1">
                                                <img src={coinImg} className="w-5 h-5" alt="coin" />
                                                <span className="text-xl ">{item.price}</span>
                                            </div>
                                        </div>

                                        {/* Controles de cantidad */}
                                        <div className="flex items-center gap-4 mt-2">
                                            <button
                                                type="button"
                                                onClick={() => decrementar(item.id)}
                                                disabled={item.quantity <= 1}
                                                className="h-8 w-8 rounded-none border-r-2 border-[#00FCFC] hover:bg-primary/20 flex items-center justify-center"
                                            >
                                                <FontAwesomeIcon icon={faMinus} className="h-4 w-4" />
                                            </button>
                                            <div className="flex h-8 w-12 items-center justify-center text-lg ">
                                                {item.quantity}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => incrementar(item.id)}
                                                className="h-8 w-8 rounded-none border-l-2 border-[#00FCFC] hover:bg-primary/20 flex items-center justify-center"
                                            >
                                                <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-destructive hover:text-destructive hover:bg-destructive/10 border-2 border-destructive flex items-center gap-1 px-2 py-1 text-sm text-[#F20505]"
                                            >
                                                <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                                                <span>ELIMINAR</span>
                                            </button>

                                        </div>
                                    </div>

                                    {/* Subtotal del item */}
                                    <div className="text-right shrink-0">
                                        <div className="text-lg text-muted-foreground mb-1">SUBTOTAL</div>
                                        <div className="flex items-center gap-1 justify-end">
                                            <img src={coinImg} className="w-5 h-5" alt="coin" />
                                            <span className="text-xl">{item.price * item.quantity}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Resumen del pedido */}
                        <div className="!space-y-4">
                            <div className="border-4 border-[#00FCFC] bg-card p-6 space-y-4 sticky top-4">
                                <h2 className="text-xl text-primary ">RESUMEN DEL PEDIDO</h2>
                                <div className="space-y-3 py-4 border-y-2 border-[#00FCFC]">
                                    <div className="flex items-center justify-between text-lg">
                                        <span>TOTAL</span>
                                        <div className="flex items-center gap-2">
                                            <img src={coinImg} className="w-6 h-6" alt="coin" />
                                            <span>{total.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <button type="button" className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-[#00FCFC] text-lg !mb-3">
                                    PROCEDER AL PAGO
                                </button>

                                <Link to="/store">
                                    <button type="button" className="w-full h-10 text-lg border-2 border-[#00FCFC] bg-transparent">
                                        SEGUIR COMPRANDO
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )

}
