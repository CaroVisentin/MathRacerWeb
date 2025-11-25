import { test as setup } from '@playwright/test'

const authFile = 'playwright/.auth/user.json'

setup('authenticate', async ({ page }) => {
  // Navegar a la página de login
  await page.goto('/')
  
  // Llenar el formulario de login
  // NOTA: Cambia estas credenciales por un usuario de prueba real
  await page.fill('input[type="email"]', 'test@example.com')
  await page.fill('input[type="password"]', 'test123456')
  
  // Click en el botón de login
  await page.click('button[type="submit"]')
  
  // Esperar a que la navegación complete
  await page.waitForURL('**/menu', { timeout: 10000 }).catch(() => {
    // Si no redirige, intentar esperar por un elemento del menú
    return page.waitForSelector('text=/menu|inicio/i', { timeout: 10000 })
  })
  
  // Guardar el estado de autenticación
  await page.context().storageState({ path: authFile })
})
