import { useState } from "react"
import { ModalFinHistoria } from "../../shared/modals/modalFinHistoria";
import { ModalFinMultijugador } from "../../shared/modals/modalFinMultijugador";
import type { JugadorDto } from "../../types/jugador/jugador";

export const Home = () => {
    const [modalFinHistoria, setModalFinHistoria] = useState(false);
    const [modalFinMultijugador, setModalFinMultijugador] = useState(false);

    const jugadoresMock: JugadorDto[] = [
        {
            nombreJugador: "jugador323",
            nivelJugador: 5,
            autoId: 1,
            puntos: 15200,
        },
        {
            nombreJugador: "jugador292",
            nivelJugador: 4,
            autoId: 2,
            puntos: 15380,
        },
    ];

    return (
        <>
            <p> Home </p>
        </>
    )
}