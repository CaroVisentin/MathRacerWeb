import { AudioControls } from "../components/controlDeSonido";

export const AjustesSection = () => {
    return (
        <div className="w-full text-white flex flex-col items-center bg-black gap-6 px-6 pt-8 mt-20">
            {/* Sección de sonido separada */}
            <AudioControls />

            {/* Botones de cuenta */}
            <div className="flex flex-col items-center gap-4 mt-10 mb-10">
                <p className="text-2xl">Cuenta</p>
                <button className="bg-black text-white border-2 border-white px-8 py-2 rounded text-xl tracking-wider transition-all duration-300 hover:bg-white hover:text-black">
                    Cerrar sesión
                </button>

                <button className="bg-black border-2 border-red-600 text-red-600 px-8 py-2 rounded text-xl tracking-wider transition-all duration-300 hover:bg-red-600 hover:text-white">
                    Eliminar cuenta
                </button>
            </div>
        </div>
    );
};
