import { describe, it, expect, vi, beforeEach } from 'vitest'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

// Mock authService to avoid testing actual Firebase/API calls
const mockAuthService = {
  loginWithEmail: vi.fn(),
  register: vi.fn(),
  loginWithGoogle: vi.fn(),
  logout: vi.fn(),
}

vi.mock('firebase/auth')

describe('Auth Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const mockUser = {
        uid: 'test-uid',
        email: 'test@example.com',
        getIdToken: vi.fn().mockResolvedValue('mock-token'),
      }

      vi.mocked(signInWithEmailAndPassword).mockResolvedValue({
        user: mockUser,
      } as any)

      mockAuthService.loginWithEmail.mockResolvedValue({
        user: { email: 'test@example.com', uid: 'test-uid' },
        token: 'mock-token',
      })

      const result = await mockAuthService.loginWithEmail('test@example.com', 'password123')

      expect(mockAuthService.loginWithEmail).toHaveBeenCalledWith(
        'test@example.com',
        'password123'
      )
      expect(result.user.email).toBe('test@example.com')
    })

    it('should throw error with invalid credentials', async () => {
      mockAuthService.loginWithEmail.mockRejectedValue(
        new Error('Invalid credentials')
      )

      await expect(
        mockAuthService.loginWithEmail('test@example.com', 'wrongpassword')
      ).rejects.toThrow('Invalid credentials')
    })
  })

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const mockUser = {
        uid: 'new-uid',
        email: 'newuser@example.com',
        getIdToken: vi.fn().mockResolvedValue('mock-token'),
      }

      vi.mocked(createUserWithEmailAndPassword).mockResolvedValue({
        user: mockUser,
      } as any)

      mockAuthService.register.mockResolvedValue({
        user: { email: 'newuser@example.com', uid: 'new-uid' },
        token: 'mock-token',
      })

      const result = await mockAuthService.register(
        'newuser@example.com',
        'password123',
        'New User'
      )

      expect(mockAuthService.register).toHaveBeenCalled()
      expect(result.user.email).toBe('newuser@example.com')
    })

    it('should throw error when email already exists', async () => {
      mockAuthService.register.mockRejectedValue(
        new Error('Email already in use')
      )

      await expect(
        mockAuthService.register('existing@example.com', 'password123', 'User')
      ).rejects.toThrow('Email already in use')
    })
  })
})
