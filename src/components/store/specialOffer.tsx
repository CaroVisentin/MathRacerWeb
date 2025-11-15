import carImg from "../../assets/images/8.png";
import characterImg from "../../assets/images/9.png";
import coinImg from "../../assets/images/coin.png";

export const SpecialOffer = () => {
    return (
        <div className="w-full text-white rounded-xl overflow-hidden shadow-lg">
            {/* Encabezado */}
            <div className="text-lg px-4">
                OFERTA ESPECIAL
            </div>

            {/* Contenido principal: dos columnas */}
            <div className="flex items-center justify-center bg-[#1C092D] p-6">
                {/* Columna izquierda */}
                <div className="flex flex-col gap-2 items-center justify-center">
                    <h2 className="text-5xl tracking-wide">PILOTO + DEPORTIVO</h2>
                    <h3 className="text-5xl text-gray-200">“MATH RACER”</h3>
                    <div className="flex items-center gap-2 mt-3">
                        <img src={coinImg} className="w-7 h-7" />
                        <span className="text-4xl">100.000</span>
                    </div>
                </div>

                {/* Columna derecha: imágenes centradas */}
                <div className="relative flex items-center justify-center w-[22rem] h-48 flex-shrink-0">
                    {/* Auto */}
                    <img
                        src={carImg}
                        alt="Auto"
                        className="w-[22rem] object-contain scale-x-[-1]"
                    />
                    {/* Personaje */}
                    <img
                        src={characterImg}
                        alt="Personaje"
                        className="absolute w-28 object-contain z-10 right-10"
                    />
                </div>
            </div>
        </div>

    );
};
