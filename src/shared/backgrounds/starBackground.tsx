export const StarsBackground = () => {
    // Generamos 50 estrellas con posiciones aleatorias
    const stars = Array.from({ length: 50 }, () => ({
        top: Math.random() * 100,    // porcentaje vertical
        left: Math.random() * 100,   // porcentaje horizontal
        size: Math.random() * 2 + 1, // tamaño en px
        delay: Math.random() * 2      // delay de parpadeo
    }))

    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            {stars.map((star, i) => (
                <div
                    key={i}
                    className="absolute bg-white rounded-full star"
                    style={{
                        top: `${star.top}%`,
                        left: `${star.left}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        animationDelay: `${star.delay}s`,
                    }}
                />
            ))}
        </div>
    )
}
