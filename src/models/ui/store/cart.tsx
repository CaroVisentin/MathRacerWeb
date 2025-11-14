export type CartItem = {
    id: number
    name: string
    price: number
    image: string
    typeProduct: string
    quantity: number
}

export type CartContextType = {
    cart: CartItem[]
    addToCart: (item: CartItem) => void
    removeFromCart: (id: number) => void
    updateQuantity: (id: number, cantidad: number) => void
    clearCart: () => void
}