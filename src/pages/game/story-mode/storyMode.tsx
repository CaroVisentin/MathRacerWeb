// Muestro el mapa de los mundos del juego

"use client"

import { BottomUI } from "../../../components/game/story-mode/bottomUI"
import { SvgPathWorlds } from "../../../components/game/story-mode/svgPathWorlds"
import { TopBar } from "../../../components/game/story-mode/topBar"

export const StoryMode = () => {
    return (
        <>
            <div className="relative flex h-screen w-full flex-col overflow-hidden bg-gradient-to-br from-[#0a0520] via-[#1a0f3a] to-[#0f0828]">
                {/* Top bar - Fixed */}
                {/* Pasarle el mundo y las vidas restantes del jugador (sacar de un context) */}
                <TopBar headerText="Mundos" remainingLives={7} />

                {/* Pasarle hasta el último nivel completo por props */}
                <SvgPathWorlds />

                {/* Bottom UI - Fixed */}
                {/* Pasarle la cantidad de cada comodín del jugador por props */}
                <div className="p-4">
                    <BottomUI fireExtinguisherQuant={2} changeEquationQuant={3} dobleCountQuant={4} />
                </div>
            </div>
        </>
    )
}
