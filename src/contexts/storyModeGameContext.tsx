"use client"

import { createContext, useEffect, useState, type ReactNode } from "react"
import type { StoryModeContextType } from "../models/ui/storyModeGame"

const StoryModeGameContext = createContext<StoryModeContextType | undefined>(undefined)

export const StoryModeGameProvider = ({ children }: { children: ReactNode }) => {
    const MAX_LIVES = 10
    const RECHARGE_INTERVAL = 300 // 5 minutos (en segundos)

    const [remainingLives, setRemainingLives] = useState(MAX_LIVES)
    const [timeLeft, setTimeLeft] = useState(RECHARGE_INTERVAL)
    const [lastLifeAddedAt, setLastLifeAddedAt] = useState<Date | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Simula la llamada al backend al iniciar la app
    useEffect(() => {
        const fetchInitialData = async () => {
            setIsLoading(true)

            // Simulación del backend
            const simulatedResponse = await new Promise<{ remainingLives: number; lastLifeAddedAt: string }>(
                (resolve) => {
                    setTimeout(() => {
                        resolve({
                            remainingLives: 1,
                            lastLifeAddedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // hace 1 día
                        })
                    }, 800)
                }
            )

            const { remainingLives, lastLifeAddedAt } = simulatedResponse
            const lastLifeDate = new Date(lastLifeAddedAt)

            // Calcular el tiempo transcurrido desde la última vida agregada
            const now = new Date()
            const secondsPassed = Math.floor((now.getTime() - lastLifeDate.getTime()) / 1000)

            // Cuántas vidas deberían haberse regenerado
            const livesToAdd = Math.floor(secondsPassed / RECHARGE_INTERVAL)

            // Caso 1: pasó suficiente tiempo para llenar todas las vidas
            if (remainingLives + livesToAdd >= MAX_LIVES) {
                setRemainingLives(MAX_LIVES)
                setTimeLeft(RECHARGE_INTERVAL)
                setLastLifeAddedAt(now)
            } else {
                // Caso 2: se regeneraron parcialmente
                const newLives = remainingLives + livesToAdd
                const remainder = secondsPassed % RECHARGE_INTERVAL
                setRemainingLives(newLives)
                setTimeLeft(RECHARGE_INTERVAL - remainder)
                setLastLifeAddedAt(new Date(now.getTime() - remainder * 1000))
            }

            setIsLoading(false)
        }

        fetchInitialData()
    }, [])

    // Temporizador que actualiza cada segundo
    useEffect(() => {
        if (isLoading) return

        const interval = setInterval(() => {
            if (!lastLifeAddedAt || remainingLives >= MAX_LIVES) return

            const now = new Date()
            const secondsPassed = Math.floor((now.getTime() - lastLifeAddedAt.getTime()) / 1000)

            if (secondsPassed >= RECHARGE_INTERVAL) {
                const livesToAdd = Math.floor(secondsPassed / RECHARGE_INTERVAL)

                setRemainingLives((prev) => {
                    const newLives = Math.min(MAX_LIVES, prev + livesToAdd)

                    if (newLives < MAX_LIVES) {
                        const remainder = secondsPassed % RECHARGE_INTERVAL
                        setTimeLeft(RECHARGE_INTERVAL - remainder)
                        setLastLifeAddedAt(new Date(now.getTime() - remainder * 1000))
                    } else {
                        setTimeLeft(RECHARGE_INTERVAL)
                    }

                    return newLives
                })
            } else {
                setTimeLeft(RECHARGE_INTERVAL - secondsPassed)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [isLoading, lastLifeAddedAt, remainingLives])

    // Gastar una vida
    const spendLife = () => {
        setRemainingLives((prev) => {
            if (prev > 0) {
                if (prev === MAX_LIVES) {
                    setLastLifeAddedAt(new Date())
                    setTimeLeft(RECHARGE_INTERVAL)
                }
                return prev - 1
            }
            return 0
        })
    }

    return (
        <StoryModeGameContext.Provider value={{ remainingLives, timeLeft, spendLife, isLoading }}>
            {children}
        </StoryModeGameContext.Provider>
    )
}

export default StoryModeGameContext;