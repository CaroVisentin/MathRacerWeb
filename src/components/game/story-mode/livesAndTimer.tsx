import { useMemo } from "react"
import { useStoryModeGame } from "../../../hooks/useStoryModeGame"
import { batteryIcons } from "../../../data/mocks/home"

export const LivesAndTimer = () => {
  const { remainingLives, timeLeft } = useStoryModeGame()

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timeLeft / 60)
    const secs = timeLeft % 60
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }, [timeLeft])

  return (
    <div className="flex items-center gap-3">
      {/* Temporizador */}
      <div className="flex flex-col items-center justify-center h-full">
        <img src={batteryIcons.pilabolt} alt="bolt" className="h-4" />
        <span className="text-base text-white">{formattedTime}</span>
      </div>

      {/* Vidas */}
      <div className="flex items-center gap-1">
        {[...Array(10)].map((_, i) => (
          <img
            key={i}
            src={i < remainingLives ? batteryIcons.pila : batteryIcons.pilaempty}
            className="w-4 h-8"
          />
        ))}
      </div>
    </div>
  )
}
