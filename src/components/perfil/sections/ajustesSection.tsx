import { faVolumeHigh, faMusic, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AjustesSection = () => {
    // Agregar modal de confirmación para cerrar o elminar cuenta
    
    return (
        <>
            <div className="w-full text-white flex flex-col items-center gap-6 px-6 pt-8 mt-20">
                {/* Sliders de sonido y música */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <span className="text-xl">Sonido</span>
                        <FontAwesomeIcon icon={faVolumeHigh} />
                        <input type="range" min="0" max="100" className="w-40 accent-cyan-400" />
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-xl">Música</span>
                        <FontAwesomeIcon icon={faMusic} />
                        <input type="range" min="0" max="100" className="w-40 accent-pink-400" />
                    </div>
                </div>

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

                {/* Botón de ayuda abajo */}
                <div className="flex justify-end mt-4 mb-4 w-full">
                    <button className="border border-cyan-400 p-2 rounded text-cyan-400 hover:bg-cyan-500 transition">
                        <FontAwesomeIcon icon={faQuestion} />
                    </button>
                </div>
            </div>
        </>
    )
}