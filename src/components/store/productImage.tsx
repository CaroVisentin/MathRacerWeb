interface ProductImageProps {
    product: {
        name: string;
        image: string;
        typeProduct: string;
    };
}

export const ProductImage = ({ product }: ProductImageProps) => {

    console.log("Llegó a productimage: ", product);

    // Elegimos la clase según el tipo
    const imageClass = product.typeProduct === 'car' 
        ? 'w-full h-32 object-contain rounded-md mb-2'
        : 'w-full aspect-[4/3] object-cover rounded-md mb-2';

    return <img src={product.image} alt={product.name} className={imageClass} />;
};
