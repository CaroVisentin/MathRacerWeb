import { test as base } from '@playwright/test'

// Mock de localStorage con usuario autenticado
export const mockAuthStorage = {
  'user': JSON.stringify({
    uid: 'test-user-123',
    email: 'test@example.com',
    displayName: 'Test User',
  }),
  'firebase:authUser': JSON.stringify({
    uid: 'test-user-123',
    email: 'test@example.com',
    emailVerified: true,
    stsTokenManager: {
      accessToken: 'mock-access-token',
      expirationTime: Date.now() + 3600000, // 1 hora
    },
  }),
}

// Test extendido con autenticación mockeada
export const test = base.extend({
  // Mock de autenticación automática antes de cada test
  page: async ({ page }, use) => {
    // Interceptar llamadas a Firebase Auth
    await page.route('**/identitytoolkit.googleapis.com/**', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          idToken: 'mock-id-token',
          email: 'test@example.com',
          refreshToken: 'mock-refresh-token',
          expiresIn: '3600',
          localId: 'test-user-123',
        }),
      })
    })

    // Interceptar llamadas al backend de autenticación
    await page.route('**/player/login', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          user: {
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
            coins: 1000,
            points: 500,
          },
          token: 'mock-backend-token',
        }),
      })
    })

    // Interceptar llamadas de verificación de sesión
    await page.route('**/player/me', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 1,
          name: 'Test User',
          email: 'test@example.com',
          coins: 1000,
          points: 500,
          energy: 100,
        }),
      })
    })

    // Agregar localStorage con datos de autenticación
    await page.addInitScript((storage) => {
      for (const [key, value] of Object.entries(storage)) {
        localStorage.setItem(key, value)
      }
    }, mockAuthStorage)

    await use(page)
  },
})

export { expect } from '@playwright/test'
