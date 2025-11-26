import { useState } from "react";
import fondoReglas from "../../assets/images/fondo-reglas.jpg";
import { useNavigate } from "react-router-dom";

export const RulesPage = () => {
  const [step, setStep] = useState(1); // 1 = reglas iniciales, 2 = modos de juego
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
            className={`flex-1 text-center font-jersey ${
              step === 1 ? "text-7xl text-[#00f0ff]" : "text-5xl text-white"
            }`}
          >
            {step === 1 ? "REGLAS" : "MODOS DE JUEGO"}
          </h1>

          <div className="w-[60px]" />
        </div>

        {/* Contenido dinámico */}
        <div className="space-y-8 max-w-4xl">
          {step === 1 && (
            <>
              <p className="text-3xl leading-relaxed">
                Mathi Racer es un juego de carreras donde para avanzar en la
                pista deberás resolver ecuaciones correctamente. Cada respuesta
                acertada hace que tu auto avance y te acerque a la meta.
                <br />
                Si respondes mal, verás la respuesta correcta y recibirás otra
                ecuación para continuar con el juego.
              </p>

              <h2 className="text-4xl !mt-8 mb-4">TIPOS DE DESAFÍOS:</h2>

              <ul className="list-disc list-inside text-3xl space-y-4">
                <li>
                  {" "}
                  Encuentra el valor de{" "}
                  <span className="text-[#00F4FF]">x</span> para que{" "}
                  <span className="text-[#00F4FF]">y</span> sea el número mayor
                  posible{" "}
                </li>
                <li>
                  {" "}
                  Encuentra el valor de{" "}
                  <span className="text-[#00F4FF]">x</span> para que{" "}
                  <span className="text-[#00F4FF]">y</span> sea el número menor
                  posible{" "}
                </li>
              </ul>
            </>
          )}

          {step === 2 && (
            <>
              <ul className="list-disc list-inside text-3xl space-y-4">
                <li>
                  {" "}
                  <span className="text-[#00F4FF]">MULTIJUGADOR: </span>Compite
                  contra otros jugadores en carreras rápidas. Gana el que llegue
                  primero a la meta. Cada victoria te da puntos para subir en el
                  ranking
                </li>
                <li>
                  {" "}
                  <span className="text-[#00F4FF]">HISTORIA: </span>Juega solo
                  contra la máquina, avanza por niveles y mundos con dificultad
                  creciente. Al superar niveles recibes monedas o premios
                  sorpresa.
                </li>
              </ul>

              <div className="!mt-12 space-y-4">
                <h2 className="text-4xl">VIDAS</h2>
                <p className="text-2xl">
                  El modo HISTORIA cuenta con 3 vidas, al perder un nivel
                  perderá <span className="text-[#00F4FF]">una vida</span>. Las
                  mismas se recargarán con tiempo o canjeandolas por monedas.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Botón siguiente/volver */}
        <button
          className="!mt-6 bg-[#00f0ff] text-slate-950 border-2 border-white px-8 py-2
                    text-xl tracking-wider transition-all duration-300 
                    hover:bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.3)] 
                    hover:shadow-[0_0_20px_rgba(0,217,255,0.6)]"
          onClick={() => setStep((prev) => (prev === 1 ? 2 : 1))}
        >
          {step === 1 ? "SIGUIENTE" : "VOLVER"}
        </button>
      </div>
    </div>
  );
};
