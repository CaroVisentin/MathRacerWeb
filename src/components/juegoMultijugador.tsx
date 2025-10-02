import React, {useState, useEffect} from "react";
import auto1 from "../assets/images/auto.png"


interface Ecuacion{
    x: number;
    y: number;
   
}
export const JuegoMultijugador: React.FC = () => {
    const [ecuacion, setEcuacion] = useState<Ecuacion>({x: 9, y: 10});
    const [opciones, setOpciones] = useState<number[]>([9, 10]);
    const [respuestaCorrecta, setRespuestaCorrecta] = useState<number>(9);
    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<number | null>(null);
    const [vidas, setVidas] = useState<number>(3);
    const [contador, setContador] = useState<number>(5);
    const [resultado, setResultado] = useState<"acierto" | "error" | null>(null);
    const [posicionAuto1, setPosicionAuto1] = useState<number>(0);
    const [acierto, setAcierto] = useState<number>(0);

    useEffect(() => {
        if (contador === 0) {
            const timer = setTimeout(() => setContador(contador -1), 1000);
            return () => clearTimeout(timer);
        } else {
            tiempoAgotado(null);
        }
        }, [contador]);

        const tiempoAgotado = (respuestaSeleccionada: number | null) => {
            if(respuestaSeleccionada === respuestaCorrecta){
                setResultado("acierto");
                setAcierto(acierto + 1);
                setPosicionAuto1(posicionAuto1 + 10);
            } else {
                setResultado("error");
                setVidas(vidas - 1);
            }

            setTimeout(() => {
                generarNuevaEcuacion(); //cambiar porque pida de la api
                setRespuestaSeleccionada(null);
                setResultado(null);
                setContador(5);
            }, 1000);
        };

    const generarNuevaEcuacion = () => {
        const nuevoX = Math.floor(Math.random() * 10) + 1;
        const nuevoY = nuevoX + 5;
        const nuevasOpciones = [nuevoY, nuevoY + 5];

        setEcuacion({ x: nuevoX, y: nuevoY });
        setOpciones(nuevasOpciones);
        setRespuestaCorrecta(nuevoY);
    };
    return (
        <div className="juego">
            {/*fondo cielo*/}
        <div className="fondoCielo"></div>
        {/*contenido del juego*/}
        <div className="juegoContenido">
            {/*ruta*/}
            <div className="fondoRuta " >
                {/*auto1*/}
            <img src={auto1}
             alt="Auto 1" 
             className="absolute bottom-[120px] auto transition-all duration-500" 
             style={{ left:`${posicionAuto1}%` }} />

            {/*auto2*/}
            <img src={auto1} 
            alt="Auto 2"    
            className="absolute bottom-[180px] auto left-[10%]" />
            </div>
            
            {/*vidas*/}
            <div className="absolute right-6 text-lg text-white bg-black/50 px-4 py-2 rounded">
            <i className="ri-oil-line"></i>
            <span>Vidas: {vidas}</span>
            </div>
            
            {/*instrucciones*/}
            <div className="text -2xl text center text-black pt-4">
                Elegí la opcon para que Y sea MAYOR
                </div>

            {/*ecuacion*/}
            <div className="text-4xl text-center text-white pt-4">
                y = {ecuacion.x} + 5
            </div>

            {/*opciones*/}
            <div className="flex justify-center mt-6 gap-4">
                {opciones.map((opcion, i) => (
                    <button
                        key={i}
                        onClick={() =>  tiempoAgotado(opcion)}
                        className ="bg-white border-2 border-black px-6 py-3 rounded-lg text-xl hover:bg-yellow-200 transition"  >
                        {opcion}</button>
                    ))}
            </div>

            {/*resultado*/}
            <div className="text-center text-2xl font-bold mt-4 ">
                <i className={`ri-check-line text-green-500 ${resultado === "acierto" ? "opacity-100" : "opacity-0"}`}></i>
                <i className={`ri-close-line text-red-500 ${resultado === "error" ? "opacity-100" : "opacity-0"}`}></i>
            </div>

            {/*contador*/}
            <div className="text-center text-lg text-gray-700 mt-2">
                <i className = "ri-time-line"></i>
            <span> Tiempo: {contador}s </span> 
            </div>

            
</div>
        </div>
        
    );
}




