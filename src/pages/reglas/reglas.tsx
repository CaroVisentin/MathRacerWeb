import { useState } from "react";
import fondoReglas from '../../assets/images/fondo-reglas.png';

export const ReglasPage = () => {
    const [paso, setPaso] = useState(1); // 1 = reglas iniciales, 2 = modos de juego

    const reglas = {
        descripcion: "Math Racer es un juego de carreras donde para avanzar en la pista deberás resolver ecuaciones correctamente. " +
            "Cada respuesta acertada hace que tu auto avance y te acerque a la meta. " +
            "Si respondes mal, verás la respuesta correcta y recibirás otra ecuación para continuar con el juego.",
        tipos_de_desafios: [
            {
                id: "mayor_y",
                titulo: "Encuentra el valor de x para que y sea el número mayor posible",
            },
            {
                id: "menor_y",
                titulo: "Encuentra el valor de x para que y sea el número menor posible",
            },
            {
                id: "resultado_indicado",
                titulo: "Encuentra el valor de x para que la ecuación dé el resultado indicado",
            }
        ],
        modos_de_juego: [
            {
                id: "multijugador",
                titulo: "MULTIJUGADOR",
                descripcion: "Compite contra otros jugadores en carreras rápidas. Gana el que llegue primero a la meta. Cada victoria te da puntos para subir en el ranking"
            },
            {
                id: "historia",
                titulo: "HISTORIA",
                descripcion: "Juega solo contra la máquina, avanza por niveles y mundos con dificultad creciente. Al superar niveles recibes monedas o premios sorpresa."
            },
        ],
        vidas: "El modo HISTORIA cuenta con 3 vidas, al perder un nivel perderá una vida. Las mismas se recargarán con tiempo o canjeandolas por monedas."
    };

    return (
        <div
            className="relative min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${fondoReglas})` }}
        >
            {/* Overlay negro */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Contenido */}
            <div className="relative flex flex-col items-center text-center text-white p-6">

                {/* HEADER con botón volver al Home y título */}
                <div className="w-full flex items-center justify-between mb-8">
                    {/* Botón volver */}
                    <button
                        onClick={() => console.log("Volver al Home")}
                        className="text-white text-2xl px-4 py-2 
                        hover:text-cyan-400 transition"
                    >
                        &lt;
                    </button>

                    {/* Título dinámico */}
                    <h1
                        className={`flex-1 text-center font-jersey
                   ${paso === 1 ? "text-8xl text-[#00f0ff]" : "text-4xl text-white"}`}
                    >
                        {paso === 1 ? "REGLAS" : "MODOS DE JUEGO"}
                    </h1>

                    <div className="w-[60px]" />
                </div>

                {paso === 1 && (
                    <>
                        <p className="mb-6 text-3xl">{reglas.descripcion}</p>

                        <h2 className="text-4xl mt-4"> TIPOS DE DESAFÍO </h2>

                        <ul className="list-disc list-inside text-3xl">
                            {reglas.tipos_de_desafios.map((desafio) => (
                                <li key={desafio.id} className="mb-2">
                                    {desafio.titulo}
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {paso === 2 && (
                    <>
                        <ul className="list-disc list-inside text-3xl">
                            {reglas.modos_de_juego.map((modo) => (
                                <li key={modo.titulo} className="mb-2">
                                    {modo.titulo}: {modo.descripcion}
                                </li>
                            ))}
                        </ul>

                        <h2 className="text-4xl mt-8"> VIDAS </h2>
                        <p className="text-2xl mt-2">{reglas.vidas}</p>
                    </>
                )}

                <button
                    className="mt-10 bg-[#00f0ff] text-slate-950 border-2 border-white px-8 py-2
                    text-xl tracking-wider transition-all duration-300 
                    hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.3)] 
                    hover:shadow-[0_0_20px_rgba(0,217,255,0.6)]"
                    onClick={() => setPaso((prev) => prev === 1 ? 2 : 1)}
                >
                    {paso === 1 ? "SIGUIENTE" : "VOLVER"}
                </button>
            </div>
        </div>
    );
};
