import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { QuestionDto } from "../../../../models/domain/questionDto";
import { FuelIndicator } from "../../../../shared/energy/energy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { EndOfStoryModeModal } from "../../../../shared/modals/endOfStoryModeModal";
import { Wildcards } from "../../../../shared/wildcards/wildcards";
import fondoRival from "../../../../assets/images/pista-montana.png";
import fondoJugador from "../../../../assets/images/pista-noche.png";
import auto1 from "../../../../assets/images/auto.png";

export const StoryModeGame = () => {
    const { id } = useParams();
    const levelId = id;

    const [posicionAuto1, setPosicionAuto1] = useState<number>(0);
    const [posicionAuto2, setPosicionAuto2] = useState<number>(0);
    const [modalGanador, setModalGanador] = useState(false);
    const opciones = [3, 6, 8, 10];
    const ecuacion: QuestionDto = {
        id: 1,
        equation: "Y = 13 - X",
        options: opciones,
        correctAnswer: 3
    }
    const instruccion = "Elegí la opción para que la Y sea mayor";
    const navigate = useNavigate();

    const handleFireExtinguisher = () => {
        console.log("Used fire extinguisher")
    };

    const handleDobleCount = async () => {
        console.log("Used double count")
    };

    return (
        <>
            <div className="juego w-full h-full bg-black text-white relative">

                {/* HEADER */}
                <div className={`flex justify-between items-center bg-black px-4 py-3 z-10`}>
                    <button className="px-3 py-1 rounded">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>

                    <FuelIndicator remainingLives={2} />
                </div>

                {modalGanador && (
                    <EndOfStoryModeModal
                        level={1}
                        reward={100}
                        won={true}
                        onClose={() => navigate("/")}
                        onNext={() => {
                            setModalGanador(false);
                        }}
                        remainingLives={3}
                    />
                )}

                {/* Ruta */}
                <div className={`mt-20 flex flex-col gap-3 justify-end`}>
                    <div className="flex justify-center items-center fondoRuta w-full relative mt-20 border-3 border-[#5df9f9] rounded-lg"
                        style={{
                            backgroundImage: `url('${fondoRival}')`,
                        }}>
                        <div
                            className="absolute text-[#000000] text-l ml-2 px-2 py-1 rounded bg-[#5df9f9]"
                            style={{
                                left: '0px',
                                top: '-2%',
                            }}
                        >
                            Máquina
                        </div>

                        {/* Auto 2 */}
                        <img
                            src={auto1}
                            alt="Auto 2"
                            className="absolute bottom-[180px] auto auto2"
                            style={{ left: `${posicionAuto2}%` }}
                        />
                    </div>

                    <div className="flex justify-center items-center fondoRuta w-full relative mt-20 border-3 border-[#f95ec8] rounded-lg"
                        style={{
                            backgroundImage: `url('${fondoJugador}')`,
                        }}>

                        {/* Nombre del Jugador 1 (Vos) */}
                        <div
                            className="absolute text-white text-l ml-2 px-2 py-1 rounded bg-[#f95ec8]"
                            style={{
                                left: '0px',
                                top: '-2%',
                            }}
                        >
                            Tú
                        </div>

                        {/* Auto 1 */}
                        <img
                            src={auto1}
                            alt="Auto 1"
                            className="absolute auto transition-all duration-500"
                            style={{ left: `${posicionAuto1}%` }}
                        />

                    </div>
                </div>

                {/* Instrucciones y Comodines */}
                <div className="flex justify-center items-center gridComodin mt-4">

                    <div className={`!text-xl !m-5`}>
                        {instruccion
                            ? `${instruccion.toUpperCase()}`
                            : "Esperando instrucción..."}

                    </div>
                    <div className={`comodin !mt-2`}>
                        <Wildcards
                            fireExtinguisher={3}
                            changeEquation={3}
                            dobleCount={3}
                            onFireExtinguisher={handleFireExtinguisher}
                            onDobleCount={handleDobleCount}
                        />
                    </div>
                </div>

                {/* Ecuación */}
                <div className="flex flex-col justify-center items-center h-full gap-5 !mb-10 mt-4 bg-black ">
                    <div className="flex justify-center mb-6">

                        <div className={`inline-block border-2 border-white rounded-lg text-5xl px-6 py-3`}>
                            {ecuacion?.equation && <span>{ecuacion.equation}</span>}
                        </div>

                    </div>

                    {/* Opciones */}
                    <div className={`flex justify-center items-center mt-3 gap-6 opciones`}>
                        {opciones?.map((opcion, i) => (
                            <button
                                key={i}
                                className="border-2 border-white rounded-lg text-3xl transition w-20 h-20"
                            >
                                {opcion}
                            </button>
                        ))}

                    </div>
                </div>
            </div>
        </>
    )
}