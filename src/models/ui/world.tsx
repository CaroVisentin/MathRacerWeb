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

export const worlds: World[] = [
    {
        id: 1,
        name: "Mundo 1",
        description: "Suma y Resta",
        totalLevels: 15,
        completedLevels: 15,
        stars: 12,
        totalStars: 21,
        unlocked: true,
        completed: false,
    },
    {
        id: 2,
        name: "Mundo 2",
        description: "Multiplicación",
        totalLevels: 15,
        completedLevels: 5,
        stars: 0,
        totalStars: 24,
        unlocked: true,
        completed: false,
    },
    {
        id: 3,
        name: "Mundo 3",
        description: "División",
        totalLevels: 15,
        completedLevels: 0,
        stars: 0,
        totalStars: 24,
        unlocked: false,
        completed: false,
    },
    {
        id: 4,
        name: "Mundo 4",
        description: "Operaciones Mixtas",
        totalLevels: 15,
        completedLevels: 0,
        stars: 0,
        totalStars: 30,
        unlocked: false,
        completed: false,
    },
]