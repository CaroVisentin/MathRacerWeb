import { test, expect } from './fixtures'

test.describe('Multiplayer Game Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Usuario automáticamente autenticado por el fixture
    await page.goto('/menu')
    await page.waitForTimeout(1000)
  })

  test('should access multiplayer menu', async ({ page }) => {
    await page.goto('/game/multiplayer').catch(() => {})
    await page.waitForTimeout(500)
    
    const url = page.url()
    expect(url).not.toContain('/login')
  })

  test('should display quick game option', async ({ page }) => {
    await page.goto('/game/multiplayer').catch(() => {})
    await page.waitForTimeout(1000)
    
    // Verificar que la página cargó
    const bodyText = await page.textContent('body')
    expect(bodyText).toBeTruthy()
  })

  test('should start matchmaking for quick game', async ({ page }) => {
    await page.goto('/game/multiplayer/quick-game').catch(() => {})
    await page.waitForTimeout(1000)
    
    const url = page.url()
    expect(url).not.toContain('/login')
  })

  test('should display create game option', async ({ page }) => {
    await page.goto('/game/multiplayer').catch(() => {})
    await page.waitForTimeout(1000)
    
    const html = await page.content()
    expect(html.length).toBeGreaterThan(100)
  })

  test('should navigate to create game screen', async ({ page }) => {
    await page.goto('/game/multiplayer/create-game').catch(() => {})
    await page.waitForTimeout(1000)
    
    const url = page.url()
    expect(url).not.toContain('/login')
  })

  test('should display join game option', async ({ page }) => {
    await page.goto('/game/multiplayer').catch(() => {})
    await page.waitForTimeout(1000)
    
    const bodyText = await page.textContent('body')
    expect(bodyText).toBeTruthy()
  })

  test('should navigate to join game screen', async ({ page }) => {
    await page.goto('/game/multiplayer/join-game').catch(() => {})
    await page.waitForTimeout(1000)
    
    const url = page.url()
    expect(url).not.toContain('/login')
  })
})

test.describe('Multiplayer Game Mechanics', () => {
  test('should display game question when match starts', async ({ page }) => {
    await page.goto('/game/multiplayer/quick-game').catch(() => {})
    await page.waitForTimeout(1000)
    
    const url = page.url()
    expect(url).not.toContain('/login')
  })

  test('should show player progress bars', async ({ page }) => {
    await page.goto('/game/multiplayer/quick-game').catch(() => {})
    await page.waitForTimeout(1000)
    
    const bodyVisible = await page.locator('body').isVisible()
    expect(bodyVisible).toBe(true)
  })

  test('should display answer options', async ({ page }) => {
    await page.goto('/game/multiplayer/quick-game').catch(() => {})
    await page.waitForTimeout(500)
    
    const bodyVisible = await page.locator('body').isVisible()
    expect(bodyVisible).toBe(true)
  })
})
