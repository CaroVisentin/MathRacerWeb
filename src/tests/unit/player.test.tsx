import { describe, it, expect } from 'vitest'
import type { PlayerDto } from '../../models/domain/signalR/playerDto'
//import type { PowerUpDto } from '../../models/domain/signalR/powerUpDto'

 // Datos de un producto equipado básico (coincide parcialmente con modelo UI PlayerItem)
    export interface EquippedProductDto {
      id: number;
      name: string;
      description: string;
      // Backend actual no envía imageUrl ni productType, se infiere por nombre.
    }

describe('Player Model', () => {
  it('should create a valid player object', () => {
    const player: PlayerDto = {
      id: 1,
      name: 'Test Player',
      uid: 'test-uid-123',
      correctAnswers: 5,
      position: 1,
       isReady: true,
      penaltyUntil: new Date(),
      finishedAt: new Date(),
      availablePowerUps: [],
      hasDoublePointsActive: false
    }
   
    

    expect(player.id).toBe(1)
    expect(player.name).toBe('Test Player')
    expect(player.correctAnswers).toBe(5)
    expect(player.position).toBe(1)
   // expect(player.hasAnswered).toBe(false)
  })

  it('should handle player progress correctly', () => {
    const player: PlayerDto = {
      id: 1,
      name: 'Player 1',
      uid: 'uid-1',
      correctAnswers: 3,
      position: 1,
      isReady: false,
      penaltyUntil: new Date(),
      finishedAt: new Date(),
      availablePowerUps: [],
      hasDoublePointsActive: false
    }

    const totalQuestions = 10
    const progress = (player.correctAnswers / totalQuestions) * 100

    expect(progress).toBe(30)
  })

  it('should identify winner correctly', () => {
    const players: PlayerDto[] = [
      {
        id: 1,
        name: 'Player 1',
        uid: 'uid-1',
        correctAnswers: 10,
        position: 1,
        isReady: false,
        penaltyUntil: new Date(),
        finishedAt: new Date(),
        availablePowerUps: [],
        hasDoublePointsActive: false
      },
      {
        id: 2,
        name: 'Player 2',
        uid: 'uid-2',
        correctAnswers: 7,
        position: 2,
        isReady: false,
        penaltyUntil: new Date(),
        finishedAt: new Date(),
        availablePowerUps: [],
        hasDoublePointsActive: false
      },
    ]

    const winner = players.find(p => p.position === 1)
    expect(winner?.name).toBe('Player 1')
    expect(winner?.correctAnswers).toBe(10)
  })
})
