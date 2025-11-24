export type StoryModeContextType = {
    remainingLives: number
    timeLeft: number
    spendLife: () => void
    isLoading: boolean
}

export interface AbandonGameResponse {
    message: string;
}
