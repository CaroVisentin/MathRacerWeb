import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fondoRival from "../../assets/images/pista-atardecer.png";
import fondoJugador from "../../assets/images/pista-noche.png";
import auto1 from "../../assets/images/auto-pista.png";
import fondoGarage from "../../assets/images/fondo-garage.png";
import cofre from "../../assets/images/cofre.png";
import cofreAbierto from "../../assets/images/cofre-abierto.png";
import autoImg from "../../assets/images/auto.png";
import personajeImg from "../../assets/images/jugador1.png";
import pistaImg from "../../assets/images/pista-inicio.png";
import { useState } from "react";
import { Wildcards } from "../../shared/wildcards/wildcards";
import type { QuestionDto } from "../../models/domain/questionDto";
import { FuelIndicator } from "../../shared/energy/energy";
import { useNavigate } from "react-router-dom";
import { EndOfStoryModeModal } from "../../shared/modals/endOfStoryModeModal";

export const TutorialPage = () => {
    const [posicionAuto1, setPosicionAuto1] = useState<number>(0);
    const [posicionAuto2, setPosicionAuto2] = useState<number>(0);
    const [mostrarObjetivo, setMostrarObjetivo] = useState(true); // 1 
    const [mostrarOpciones, setMostrarOpciones] = useState(false); // 2
    const [mostrarVidas, setMostrarVidas] = useState(false); // 3
    const [mostrarCarrera, setMostrarCarrera] = useState(false); // 4
    const [mostrarComodines, setMostrarComodines] = useState(false); // 5
    const [mostrarJuguemos, setMostrarJuguemos] = useState(false); // 6
    const [mostrarOpcionIncorrecta, setMostrarOpcionIncorrecta] = useState(false); // 7
    const [mostrarJuguemosParteDos, setMostrarJuguemosParteDos] = useState(false); // 8
    const [mostrarOpcionCorrecta, setMostrarOpcionCorrecta] = useState(false); // 9
    const [modalGanador, setModalGanador] = useState(false); // 10
    const opciones = [3, 6, 8, 10];
    const ecuacion: QuestionDto = {
        id: 1,
        equation: "Y = 13 - X",
        options: opciones,
        correctAnswer: 3
    }
    const [opcionesIncorrectas, setOpcionesIncorrectas] = useState(
        opciones ? opciones.map(() => false) : []
    );
    const instruccion = "Elegí la opción para que la Y sea mayor";
    const navigate = useNavigate();
    const [mostrarCofre, setMostrarCofre] = useState(false);
    const [isCofreOpen, setIsCofreOpen] = useState(false);
    const [recompensas, setRecompensas] = useState(false);

    const handleFinalizarTutorial = () => {
        setMostrarCofre(true);
    }

    return (
        <>
            {mostrarCofre ?
                (
                    <>
                        {/* Recompensa */}
                        <div className="relative w-screen h-screen">
                            {/* Fondo */}
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{ backgroundImage: `url(${fondoGarage})` }}
                            >
                                <div className="absolute inset-0 bg-black/60"></div> {/* Capa negra translúcida */}
                            </div>

                            {/* Contenido centrado */}
                            <div className="relative z-10 w-full h-full flex flex-col justify-center items-center gap-4">

                                {!recompensas && (
                                    <>
                                        {
                                            isCofreOpen ? (
                                                <img src={cofreAbierto} alt="Cofre" className="w-70 h-70 object-contain" />
                                            ) : (
                                                <img src={cofre} alt="Cofre" className="w-70 h-70 object-contain" />
                                            )
                                        }
                                    </>
                                )}

                                {!recompensas && (
                                    <button
                                        onClick={() => {
                                            if (isCofreOpen) {
                                                setRecompensas(true);
                                            } else {
                                                setIsCofreOpen(true)
                                            }

                                        }}
                                        className="bg-[#0F7079] border-2 border-white rounded-lg text-3xl transition w-32 h-12 text-white"
                                    >
                                        {isCofreOpen ? "Siguiente" : "Abrir"}
                                    </button>

                                )}

                                {recompensas && (
                                    <div className="flex flex-col items-center gap-6">
                                        {/* Contenedor de las cards */}
                                        <div className="flex justify-center items-center gap-6">
                                            {/* Card 1 */}
                                            <div className="w-60 h-68 bg-[#c0be9a] rounded-lg border-2 border-white flex justify-center items-center">
                                                <img src={autoImg} alt="Auto" className="w-45 h-45 object-contain" />
                                            </div>

                                            {/* Card 2 */}
                                            <div className="w-60 h-68 bg-[#c0be9a] rounded-lg border-2 border-white flex justify-center items-center">
                                                <img src={personajeImg} alt="Personaje" className="w-35 h-35 object-contain" />
                                            </div>

                                            {/* Card 3 */}
                                            <div className="w-60 h-68 bg-[#c0be9a] rounded-lg border-2 border-white flex justify-center items-center">
                                                <img src={pistaImg} alt="Pista" className="w-45 h-45 object-contain" />
                                            </div>
                                        </div>

                                        {/* Botón debajo y centrado */}
                                        <button
                                            onClick={() => navigate("/home")}
                                            className="bg-[#0F7079] border-2 border-white rounded-lg text-3xl transition w-32 h-12 text-white"
                                        >
                                            Siguiente
                                        </button>
                                    </div>
                                )}

                            </div>
                        </div>
                    </>
                ) : (
                    // Tutorial
                    <div className="juego w-full h-full bg-black text-white relative">
                        <div className="fixed inset-0 bg-black/70 z-50"></div>

                        {/* HEADER */}
                        <div className={`flex justify-between items-center bg-black px-4 py-3 z-10 ${mostrarVidas ? "z-60" : ""}`}>
                            <button className="px-3 py-1 rounded">
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>

                            <FuelIndicator remainingLives={2} />
                        </div>

                        {/* CARTEL DE OBJETIVO */}
                        {mostrarObjetivo && (
                            <div className="fixed inset-0 flex flex-col items-center justify-center z-65 pointer-events-none">
                                <div className="bg-[#0F7079] border-4 border-white px-10 py-8 text-center shadow-lg pointer-events-auto">
                                    <h2 className="text-3xl mb-3 text-white">Objetivo</h2>
                                    <p className="text-lg mb-5 text-white leading-snug">
                                        Verás la ecuación a resolver y debajo la condición que debes cumplir
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setMostrarObjetivo(false)
                                        setMostrarOpciones(true)
                                    }}
                                    className="bg-[#0F7079] !mt-5 border-2 border-white text-white px-8 py-2 pointer-events-auto"
                                >
                                    Siguiente
                                </button>
                            </div>
                        )}

                        {/* CARTEL DE OPCIONES */}
                        {mostrarOpciones && (
                            <div className="fixed inset-0 flex flex-col items-center justify-center z-65 pointer-events-none">
                                <div className="bg-[#0F7079] border-4 border-white px-10 py-8 text-center shadow-lg pointer-events-auto">
                                    <h2 className="text-3xl mb-3 text-white">Opciones</h2>
                                    <p className="text-lg mb-5 text-white leading-snug">
                                        Aquí verás las opciones a elegir
                                    </p>
                                </div>

                                <div className="flex space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMostrarOpciones(false)
                                            setMostrarObjetivo(true)
                                        }}
                                        className="bg-[#2C2C2C] !m-2 border-2 border-white text-white px-8 py-2 pointer-events-auto"
                                    >
                                        Atrás
                                    </button>

                                    <button
                                        onClick={() => {
                                            setMostrarOpciones(false)
                                            setMostrarVidas(true)
                                        }}
                                        className="bg-[#0F7079] !m-2 border-2 border-white text-white px-8 py-2 pointer-events-auto"
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            </div>
                        )}

                        {mostrarVidas && (
                            <div className="fixed inset-0 flex flex-col items-center justify-center z-65 pointer-events-none">
                                <div className="bg-[#0F7079] border-4 border-white px-10 py-8 text-center shadow-lg pointer-events-auto">
                                    <h2 className="text-3xl mb-3 text-white">Tus vidas</h2>
                                    <p className="text-lg mb-5 text-white leading-snug">
                                        Si llegan a 0, termina la partida
                                    </p>
                                </div>

                                <div className="flex space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMostrarVidas(false)
                                            setMostrarOpciones(true)
                                        }}
                                        className="bg-[#2C2C2C] !m-2 border-2 border-white text-white px-8 py-2 pointer-events-auto"
                                    >
                                        Atrás
                                    </button>

                                    <button
                                        onClick={() => {
                                            setMostrarVidas(false)
                                            setMostrarCarrera(true)
                                        }}
                                        className="bg-[#0F7079] !m-2 border-2 border-white text-white px-8 py-2 pointer-events-auto"
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            </div>
                        )}

                        {mostrarCarrera && (
                            <div className="fixed bottom-4 right-4 z-65 pointer-events-none">
                                <div className="bg-[#0F7079] border-4 border-white px-10 py-8 text-center shadow-lg pointer-events-auto">
                                    <h2 className="text-3xl mb-3 text-white">Carrera</h2>
                                    <p className="text-lg mb-5 text-white leading-snug">
                                        En este sector verás tu avance y el de tu rival
                                    </p>
                                </div>

                                <div className="flex justify-end space-x-2 mt-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMostrarCarrera(false)
                                            setMostrarVidas(true)
                                        }}
                                        className="bg-[#2C2C2C] !m-2 border-2 border-white text-white px-8 py-2 pointer-events-auto"
                                    >
                                        Atrás
                                    </button>

                                    <button
                                        onClick={() => {
                                            setMostrarCarrera(false)
                                            setMostrarComodines(true)
                                        }}
                                        className="bg-[#0F7079] !m-2 border-2 border-white text-white px-8 py-2 pointer-events-auto"
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            </div>
                        )}

                        {mostrarComodines && (
                            <div className="fixed inset-0 flex flex-col items-center justify-center z-65 pointer-events-none">
                                <div className="bg-[#0F7079] border-4 border-white px-10 py-8 text-center shadow-lg pointer-events-auto">
                                    <h2 className="text-3xl mb-3 text-white">Comodines</h2>
                                    <p className="text-lg mb-5 text-white leading-snug">
                                        Podrás tener ayudas activables durante el juego
                                    </p>
                                </div>

                                <div className="flex justify-end space-x-2 mt-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMostrarComodines(false)
                                            setMostrarCarrera(true)
                                        }}
                                        className="bg-[#2C2C2C] !m-2 border-2 border-white text-white px-8 py-2 pointer-events-auto"
                                    >
                                        Atrás
                                    </button>

                                    <button
                                        onClick={() => {
                                            setMostrarComodines(false)
                                            setMostrarJuguemos(true)
                                        }}
                                        className="bg-[#0F7079] !m-2 border-2 border-white text-white px-8 py-2 pointer-events-auto"
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            </div>
                        )}

                        {mostrarJuguemos && (
                            <div className="fixed inset-0 flex flex-col items-center justify-center z-65 pointer-events-none">
                                <div className="bg-[#0F7079] border-4 border-white px-10 py-8 text-center shadow-lg pointer-events-auto">
                                    <h2 className="text-3xl mb-3 text-white">Juguemos</h2>
                                    <p className="text-lg mb-5 text-white leading-snug">
                                        Selecciona la opción marcada
                                    </p>
                                </div>

                                <div className="flex justify-end space-x-2 mt-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMostrarJuguemos(false)
                                            setMostrarComodines(true)
                                        }}
                                        className="bg-[#2C2C2C] !m-2 border-2 border-white text-white px-8 py-2 pointer-events-auto"
                                    >
                                        Atrás
                                    </button>
                                </div>
                            </div>
                        )}

                        {mostrarOpcionIncorrecta && (
                            <div className="fixed bottom-4 right-4 z-65 pointer-events-none">
                                <div className="bg-[#0F7079] border-4 border-white px-10 py-8 text-center shadow-lg pointer-events-auto">
                                    <h2 className="text-3xl mb-3 text-white">Juguemos</h2>
                                    <p className="text-lg mb-5 text-white leading-snug">
                                        Opción incorrecta y tu rival te ha adelantado
                                    </p>
                                </div>

                                <div className="flex justify-end space-x-2 mt-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMostrarOpcionIncorrecta(false)
                                            setMostrarJuguemos(true)
                                        }}
                                        className="bg-[#2C2C2C] !m-2 border-2 border-white text-white px-8 py-2 pointer-events-auto"
                                    >
                                        Atrás
                                    </button>

                                    <button
                                        onClick={() => {
                                            setMostrarOpcionIncorrecta(false)
                                            setMostrarJuguemosParteDos(true)
                                        }}
                                        className="bg-[#0F7079] !m-2 border-2 border-white text-white px-8 py-2 pointer-events-auto"
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            </div>
                        )}

                        {mostrarJuguemosParteDos && (
                            <div className="fixed bottom-4 right-4 z-65 pointer-events-none">
                                <div className="bg-[#0F7079] border-4 border-white px-10 py-8 text-center shadow-lg pointer-events-auto">
                                    <h2 className="text-3xl mb-3 text-white">Juguemos</h2>
                                    <p className="text-lg mb-5 text-white leading-snug">
                                        Seleccioná la opción marcada
                                    </p>
                                </div>

                                <div className="flex justify-end space-x-2 mt-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMostrarJuguemosParteDos(false)
                                            setMostrarOpcionIncorrecta(true)
                                        }}
                                        className="bg-[#2C2C2C] !m-2 border-2 border-white text-white px-8 py-2 pointer-events-auto"
                                    >
                                        Atrás
                                    </button>

                                    <button
                                        onClick={() => {
                                            setMostrarJuguemosParteDos(false)
                                            setMostrarOpcionCorrecta(true)
                                        }}
                                        className="bg-[#0F7079] !m-2 border-2 border-white text-white px-8 py-2 pointer-events-auto"
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            </div>
                        )}

                        {mostrarOpcionCorrecta && (
                            <div className="fixed bottom-4 right-4 z-65 pointer-events-none">
                                <div className="bg-[#0F7079] border-4 border-white px-10 py-8 text-center shadow-lg pointer-events-auto">
                                    <h2 className="text-3xl mb-3 text-white">Juguemos</h2>
                                    <p className="text-lg mb-5 text-white leading-snug">
                                        ¡Opción correcta! Ahora vas ganando
                                    </p>
                                </div>

                                <div className="flex justify-end space-x-2 mt-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMostrarOpcionCorrecta(false)
                                            setMostrarJuguemosParteDos(true)
                                            setModalGanador(false);
                                        }}
                                        className="bg-[#2C2C2C] !m-2 border-2 border-white text-white px-8 py-2 pointer-events-auto"
                                    >
                                        Atrás
                                    </button>

                                    <button
                                        onClick={() => {
                                            setMostrarOpcionCorrecta(false)
                                            setMostrarJuguemos(false)
                                            setMostrarJuguemosParteDos(false)
                                            setModalGanador(true)
                                        }}
                                        className="bg-[#0F7079] !m-2 border-2 border-white text-white px-8 py-2 pointer-events-auto"
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            </div>
                        )}

                        {modalGanador && (
                            <EndOfStoryModeModal
                                level={1}
                                reward={100}
                                won={true}
                                onClose={() => navigate("/")}
                                onNext={() => {
                                    setModalGanador(false);
                                    handleFinalizarTutorial()
                                }}
                                remainingLives={3}
                            />
                        )}

                        {/* Ruta */}
                        <div className={`mt-20 flex flex-col gap-3 justify-end ${mostrarCarrera ? "z-60" : ""}`}>
                            <div className="flex justify-center items-center fondoRuta w-full relative mt-20 border-3 border-[#5df9f9] rounded-lg"
                                style={{
                                    backgroundImage: `url('${fondoRival}')`,
                                }}>
                                {/* Nombre del Jugador 2 (Rival) */}
                                <div
                                    className="absolute text-[#000000] text-l ml-2 px-2 py-1 rounded bg-[#5df9f9]"
                                    style={{
                                        left: '0px',
                                        top: '-2%',
                                    }}
                                >
                                    Rival
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

                            <div className={`!text-xl !m-5 ${mostrarObjetivo ? "z-60" : ""}`}>
                                {instruccion
                                    ? `${instruccion.toUpperCase()}`
                                    : "Esperando instrucción..."}

                            </div>
                            <div className={`comodin !mt-2 ${mostrarComodines ? "z-60" : ""}`}>
                                <Wildcards
                                    fireExtinguisher={3}
                                    changeEquation={3}
                                    dobleCount={3}
                                />
                            </div>
                        </div>

                        {/* Ecuación */}
                        <div className="flex flex-col justify-center items-center h-full gap-5 !mb-10 mt-4 bg-black ">
                            <div className="flex justify-center mb-6">

                                <div className={`inline-block border-2 border-white rounded-lg text-5xl px-6 py-3 ${mostrarObjetivo ? "z-60" : ""}`}>
                                    {ecuacion?.equation && <span>{ecuacion.equation}</span>}
                                </div>

                            </div>

                            {/* Opciones */}
                            <div className={`flex justify-center items-center mt-3 gap-6 opciones ${mostrarOpciones ? "z-60" : ""}`}>
                                {opciones?.map((opcion, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            if (opcion === 6) {
                                                // Solo marcar rojo la opción clickeada
                                                setOpcionesIncorrectas(opciones.map((_, idx) => idx === i));
                                                setMostrarJuguemos(false)
                                                setMostrarOpcionIncorrecta(true);
                                                const avance = (1 / 10) * 100;
                                                setPosicionAuto2(avance)
                                            }

                                            if (opcion === 3) {
                                                setMostrarOpcionCorrecta(true)
                                                setMostrarJuguemos(false)
                                                const avance = (1 / 10) * 100;
                                                setPosicionAuto1(avance)
                                            }
                                        }}
                                        className={`border-2 border-white rounded-lg text-3xl transition w-20 h-20 
                            ${opcionesIncorrectas[i] && mostrarOpcionIncorrecta ? "bg-[#FF0040]" : "bg-[#0F7079]"} ${mostrarJuguemos && opcion === 6 || mostrarJuguemosParteDos && opcion === 3 ? "z-60" : ""}
                            ${mostrarOpcionCorrecta && opcion === 3 ? "bg-[#679413]" : ""}`}
                                    >
                                        {opcion}
                                    </button>
                                ))}

                            </div>
                        </div>
                    </div>
                )}
        </>
    )
}