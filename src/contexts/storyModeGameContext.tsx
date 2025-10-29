"use client"

import { createContext, useEffect, useMemo, useState, type ReactNode } from "react"
import type { StoryModeContextType } from "../models/ui/storyModeGame"

const StoryModeGameContext = createContext<StoryModeContextType | undefined>(undefined)

export const StoryModeGameProvider = ({ children }: { children: ReactNode }) => {
    const MAX_LIVES = 10;
    const RECHARGE_INTERVAL = 300; // 5 minutos (en segundos)

    const [remainingLives, setRemainingLives] = useState<number>(MAX_LIVES);
    const [timeLeft, setTimeLeft] = useState<number>(RECHARGE_INTERVAL);
    const [lastLifeAddedAt, setLastLifeAddedAt] = useState<Date | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // --- 🔹 Inicialización desde sessionStorage o simulación backend ---
    useEffect(() => {
        const init = async () => {
            setIsLoading(true);

            // Verificamos si hay datos guardados en sessionStorage
            const storedLives = sessionStorage.getItem("remainingLives");
            const storedLastLife = sessionStorage.getItem("lastLifeAddedAt");

            if (storedLives && storedLastLife) {
                const parsedLives = parseInt(storedLives);
                const parsedDate = new Date(storedLastLife);

                const now = new Date();
                const secondsPassed = Math.floor((now.getTime() - parsedDate.getTime()) / 1000);
                const livesToAdd = Math.floor(secondsPassed / RECHARGE_INTERVAL);

                if (parsedLives + livesToAdd >= MAX_LIVES) {
                    setRemainingLives(MAX_LIVES);
                    setTimeLeft(RECHARGE_INTERVAL);
                    setLastLifeAddedAt(now);
                } else {
                    const newLives = parsedLives + livesToAdd;
                    const remainder = secondsPassed % RECHARGE_INTERVAL;
                    setRemainingLives(newLives);
                    setTimeLeft(RECHARGE_INTERVAL - remainder);
                    setLastLifeAddedAt(new Date(now.getTime() - remainder * 1000));
                }

            } else {
                // Simulamos backend solo la primera vez
                const simulatedResponse = await new Promise<{ remainingLives: number; lastLifeAddedAt: string }>(
                    (resolve) => {
                        setTimeout(() => {
                            resolve({
                                remainingLives: 3,
                                lastLifeAddedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // hace 15 min
                            });
                        }, 300);
                    }
                );

                const { remainingLives, lastLifeAddedAt } = simulatedResponse;
                const lastDate = new Date(lastLifeAddedAt);
                const now = new Date();
                const secondsPassed = Math.floor((now.getTime() - lastDate.getTime()) / 1000);
                const livesToAdd = Math.floor(secondsPassed / RECHARGE_INTERVAL);

                if (remainingLives + livesToAdd >= MAX_LIVES) {
                    setRemainingLives(MAX_LIVES);
                    setTimeLeft(RECHARGE_INTERVAL);
                    setLastLifeAddedAt(now);
                } else {
                    const newLives = remainingLives + livesToAdd;
                    const remainder = secondsPassed % RECHARGE_INTERVAL;
                    setRemainingLives(newLives);
                    setTimeLeft(RECHARGE_INTERVAL - remainder);
                    setLastLifeAddedAt(new Date(now.getTime() - remainder * 1000));
                }
            }

            setIsLoading(false);
        };

        init();
    }, []);

    // ---  Temporizador que corre cada segundo ---
    useEffect(() => {
        if (isLoading) return;

        const interval = setInterval(() => {
            if (!lastLifeAddedAt) return;

            const now = new Date();
            const secondsPassed = Math.floor((now.getTime() - lastLifeAddedAt.getTime()) / 1000);

            if (secondsPassed >= RECHARGE_INTERVAL && remainingLives < MAX_LIVES) {
                const livesToAdd = Math.floor(secondsPassed / RECHARGE_INTERVAL);
                const newLives = Math.min(MAX_LIVES, remainingLives + livesToAdd);

                setRemainingLives(newLives);

                if (newLives < MAX_LIVES) {
                    const remainder = secondsPassed % RECHARGE_INTERVAL;
                    setTimeLeft(RECHARGE_INTERVAL - remainder);
                    setLastLifeAddedAt(new Date(now.getTime() - remainder * 1000));
                } else {
                    setTimeLeft(RECHARGE_INTERVAL);
                }
            } else {
                setTimeLeft(RECHARGE_INTERVAL - (secondsPassed % RECHARGE_INTERVAL));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isLoading, lastLifeAddedAt, remainingLives]);

    // --- Guardar datos en sessionStorage cada vez que cambian ---
    useEffect(() => {
        if (!isLoading && lastLifeAddedAt) {
            sessionStorage.setItem("remainingLives", remainingLives.toString());
            sessionStorage.setItem("lastLifeAddedAt", lastLifeAddedAt.toISOString());
        }
    }, [remainingLives, lastLifeAddedAt, isLoading]);

    // --- Gastar una vida ---
    const spendLife = () => {
        setRemainingLives((prev) => {
            if (prev > 0) {
                if (prev === MAX_LIVES) {
                    setLastLifeAddedAt(new Date());
                    setTimeLeft(RECHARGE_INTERVAL);
                }
                return prev - 1;
            }
            return 0;
        });
    };

    const value = useMemo(
        () => ({ remainingLives, timeLeft, spendLife, isLoading }),
        [remainingLives, timeLeft, isLoading]
    );

    return <StoryModeGameContext.Provider value={value}>{children}</StoryModeGameContext.Provider>;
};

export default StoryModeGameContext;