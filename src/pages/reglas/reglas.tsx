import { useState } from "react";
import fondoReglas from '../../assets/images/fondo-reglas.png';
import { reglas } from "../../shared/data/reglasData";
import { useNavigate } from "react-router-dom";

export const ReglasPage = () => {
    const [paso, setPaso] = useState(1); // 1 = reglas iniciales, 2 = modos de juego
    const navigate = useNavigate();

    return (
        <div
            className="relative min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${fondoReglas})` }}
        >
            {/* Overlay negro */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Contenido */}
            <div className="relative flex flex-col items-center text-center text-white px-6 py-10 space-y-10">
                {/* HEADER con botón volver al Home y título */}
                <div className="w-full flex items-center justify-between mb-12">
                    {/* Botón volver */}
                    <button
                        onClick={() => navigate(-1)} // vuelve a la pantalla anterior
                        className="text-white text-3xl px-4 py-2 hover:text-cyan-400 transition"
                    >
                        &lt;
                    </button>

                    {/* Título dinámico */}
                    <h1
                        className={`flex-1 text-center font-jersey ${paso === 1
                            ? "text-8xl text-[#00f0ff]"
                            : "text-5xl text-white"
                            }`}
                    >
                        {paso === 1 ? "REGLAS" : "MODOS DE JUEGO"}
                    </h1>

                    <div className="w-[60px]" />
                </div>

                {/* Contenido dinámico */}
                <div className="space-y-8 max-w-4xl">
                    {paso === 1 && (
                        <>
                            <p className="text-3xl leading-relaxed">{reglas.descripcion}</p>

                            <h2 className="text-4xl mt-8 mb-4">TIPOS DE DESAFÍO</h2>

                            <ul className="list-disc list-inside text-3xl space-y-4">
                                {reglas.tipos_de_desafios.map((desafio) => (
                                    <li key={desafio.id}>{desafio.titulo}</li>
                                ))}
                            </ul>
                        </>
                    )}

                    {paso === 2 && (
                        <>
                            <ul className="list-disc list-inside text-3xl space-y-4">
                                {reglas.modos_de_juego.map((modo) => (
                                    <li key={modo.titulo}>
                                        {modo.titulo}: {modo.descripcion}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-12 space-y-4">
                                <h2 className="text-4xl">VIDAS</h2>
                                <p className="text-2xl">{reglas.vidas}</p>
                            </div>
                        </>
                    )}
                </div>

                {/* Botón siguiente/volver */}
                <button
                    className="mt-6 bg-[#00f0ff] text-slate-950 border-2 border-white px-8 py-2
                    text-xl tracking-wider transition-all duration-300 
                    hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.3)] 
                    hover:shadow-[0_0_20px_rgba(0,217,255,0.6)]"
                    onClick={() => setPaso((prev) => (prev === 1 ? 2 : 1))}
                >
                    {paso === 1 ? "SIGUIENTE" : "VOLVER"}
                </button>
            </div>
        </div>
    );
};

