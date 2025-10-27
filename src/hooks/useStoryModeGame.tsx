"use client";

import { useContext } from "react"
import StoryModeGameContext from "../contexts/storyModeGameContext";

export const useStoryModeGame = () => {
    const context = useContext(StoryModeGameContext)
    if (!context) throw new Error("useGame must be used within StoryModeGameProvider")
    return context
}