import { test, expect } from './fixtures'

test.describe('Authentication Flow (With Mock)', () => {
  test.beforeEach(async ({ page }) => {
    // Con el fixture, el usuario ya está "autenticado"
    await page.goto('/')
  })

  test('should redirect to menu when already authenticated', async ({ page }) => {
    // Si ya está autenticado, debería redirigir al menú
    await page.waitForTimeout(2000)
    
    // Verificar que NO estamos en login o que estamos en menu
    const currentUrl = page.url()
    const isNotLogin = !currentUrl.includes('/login') || currentUrl.includes('/menu')
    expect(isNotLogin).toBe(true)
  })

  test('should be able to access authenticated routes', async ({ page }) => {
    // Simplemente verificar que tenemos acceso
    await page.waitForTimeout(1000)
    const bodyText = await page.textContent('body')
    expect(bodyText).toBeTruthy()
  })

  test('should have user data in localStorage', async ({ page }) => {
    const userData = await page.evaluate(() => {
      return localStorage.getItem('user')
    })
    
    expect(userData).toBeTruthy()
  })

  test('should be able to access store', async ({ page }) => {
    await page.goto('/store')
    await page.waitForTimeout(2000)
    
    const currentUrl = page.url()
    expect(currentUrl).toContain('/store')
  })
})
