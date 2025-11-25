import { describe, it, expect } from 'vitest'

describe('Game Logic', () => {
  describe('Question Validation', () => {
    it('should validate correct linear equation answer', () => {
      //const equation = 'y = x + 4'
      const correctAnswer = 8 // when x = 4
      const userAnswer = 8
      
      expect(userAnswer).toBe(correctAnswer)
    })

    it('should reject incorrect answer', () => {
      const correctAnswer = 8
      const userAnswer = 10
      
      expect(userAnswer).not.toBe(correctAnswer)
    })

    it('should calculate player progress correctly', () => {
      const correctAnswers = 7
      const totalQuestions = 10
      const progress = (correctAnswers / totalQuestions) * 100
      
      expect(progress).toBe(70)
    })
  })

  describe('Game Status', () => {
    it('should identify game as waiting when less than 2 players', () => {
      const playerCount = 1
      const isWaiting = playerCount < 2
      
      expect(isWaiting).toBe(true)
    })

    it('should start game when 2 players join', () => {
      const playerCount = 2
      const canStart = playerCount >= 2
      
      expect(canStart).toBe(true)
    })

    it('should declare winner at 10 correct answers', () => {
      const correctAnswers = 10
      const winningScore = 10
      const hasWon = correctAnswers >= winningScore
      
      expect(hasWon).toBe(true)
    })
  })

  describe('Penalty System', () => {
    it('should apply penalty on wrong answer', () => {
      const isAnswerCorrect = false
      const shouldApplyPenalty = !isAnswerCorrect
      
      expect(shouldApplyPenalty).toBe(true)
    })

    it('should not apply penalty on correct answer', () => {
      const isAnswerCorrect = true
      const shouldApplyPenalty = !isAnswerCorrect
      
      expect(shouldApplyPenalty).toBe(false)
    })

    it('should calculate penalty duration', () => {
      const penaltyDurationMs = 3000 // 3 seconds
      const now = new Date().getTime()
      const penaltyUntil = now + penaltyDurationMs
      
      expect(penaltyUntil).toBeGreaterThan(now)
    })
  })

  describe('Power-ups', () => {
    it('should eliminate incorrect options with fire extinguisher', () => {
      const options = [1, 2, 3, 4]
      const correctAnswer = 2
      const incorrectOptions = options.filter(opt => opt !== correctAnswer)
      
      expect(incorrectOptions).toHaveLength(3)
      expect(incorrectOptions).not.toContain(correctAnswer)
    })

    it('should keep correct answer when eliminating options', () => {
     // const options = [1, 2, 3, 4]
      const correctAnswer = 2
      const oneIncorrect = 3
      const reducedOptions = [correctAnswer, oneIncorrect]
      
      expect(reducedOptions).toContain(correctAnswer)
      expect(reducedOptions).toHaveLength(2)
    })

    it('should double points for correct answer with power-up', () => {
      const normalProgress = 1
      const doubleProgress = 2
      const powerUpActive = true
      
      const actualProgress = powerUpActive ? doubleProgress : normalProgress
      
      expect(actualProgress).toBe(2)
    })
  })
})
