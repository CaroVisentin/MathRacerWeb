export type StoryModeContextType = {
    remainingLives: number
    timeLeft: number
    spendLife: () => void
    isLoading: boolean
}

export interface Level {
    id: number;
    worldId: number;
    number: number;
    unlocked: boolean;
    completed: boolean;
    stars: number;
}

export interface LevelMapProps {
    levels: Level[];
    className?: string;
}

export interface World {
    id: number
    name: string
    description: string
    totalLevels: number
    completedLevels: number
    stars: number
    totalStars: number
    unlocked: boolean
    completed: boolean
}