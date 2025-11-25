# Tests E2E con Autenticación Mockeada

## 🔧 Cómo Funciona

Los tests E2E ahora usan **autenticación mockeada** para evitar errores de autenticación real.

### Estrategia 1: Fixtures con Mocks (Implementado)

Los archivos de test que requieren autenticación importan desde `./fixtures` en lugar de `@playwright/test`:

```typescript
// ❌ Antes (sin autenticación)
import { test, expect } from '@playwright/test'

// ✅ Ahora (con autenticación mockeada)
import { test, expect } from './fixtures'
```

### ¿Qué hace el fixture?

1. **Intercepta llamadas a Firebase Auth** y devuelve respuestas exitosas
2. **Intercepta llamadas al backend** (/player/login, /player/me)
3. **Agrega datos al localStorage** simulando usuario autenticado
4. **Se aplica automáticamente** a todos los tests que lo usan

## 📁 Archivos Creados

### `fixtures.ts`
Mock de autenticación que intercepta todas las llamadas necesarias.

```typescript
import { test, expect } from './fixtures'

test('mi test', async ({ page }) => {
  // El usuario ya está autenticado aquí
  await page.goto('/menu')
  // ...
})
```

### `auth.setup.ts` (Opcional)
Setup para autenticación real con usuario de prueba.

### `auth-simple.spec.ts`
Tests de la página de login SIN requerir autenticación.

## 🚀 Ejecutar Tests

### Todos los tests (con mocks)
```bash
npm run test:e2e
```

### Solo tests sin autenticación
```bash
npx playwright test auth-simple.spec.ts
```

### Modo UI (recomendado para desarrollo)
```bash
npm run test:e2e:ui
```

## 🎯 Tests Actualizados

Los siguientes archivos ahora usan autenticación mockeada:

- ✅ `menu.spec.ts` - Navegación del menú
- ✅ `multiplayer.spec.ts` - Juego multijugador
- ✅ `store.spec.ts` - Tienda y carrito
- ✅ `auth.spec.ts` - Verificación de acceso autenticado

## 📝 Agregar Nuevos Tests Autenticados

1. **Importar desde fixtures:**
```typescript
import { test, expect } from './fixtures'
```

2. **Escribir el test normalmente:**
```typescript
test('mi test', async ({ page }) => {
  await page.goto('/ruta-protegida')
  // El usuario ya está autenticado
})
```

## 🔒 Estrategia 2: Auth Setup (Opcional)

Si prefieres usar autenticación real para algunos tests:

1. **Crear usuario de prueba en el backend**

2. **Actualizar `auth.setup.ts` con credenciales reales:**
```typescript
await page.fill('input[type="email"]', 'test@example.com')
await page.fill('input[type="password"]', 'password123')
```

3. **Descomentar en `playwright.config.ts`:**
```typescript
projects: [
  {
    name: 'setup',
    testMatch: /.*\.setup\.ts/,
  },
  {
    name: 'chromium',
    use: { 
      storageState: 'playwright/.auth/user.json',
    },
    dependencies: ['setup'],
  },
]
```

## 🎨 Mock vs Real Auth

| Aspecto | Mock (Actual) | Real Auth (Opcional) |
|---------|--------------|----------------------|
| **Velocidad** | ⚡ Muy rápido | 🐌 Más lento |
| **Configuración** | ✅ Funciona sin backend | ❌ Requiere usuario real |
| **Mantenimiento** | ✅ Fácil | ⚠️ Depende del backend |
| **Realismo** | ⚠️ Simulado | ✅ Real |
| **CI/CD** | ✅ Ideal | ⚠️ Complejo |

## 💡 Recomendación

**Usa mocks (estrategia actual)** para:
- ✅ Desarrollo rápido
- ✅ Tests en CI/CD
- ✅ Tests de UI sin backend

**Usa auth real** para:
- ⚠️ Tests críticos de autenticación
- ⚠️ Tests end-to-end completos
- ⚠️ Validación pre-producción

## 🐛 Troubleshooting

### Los tests siguen fallando con "not authenticated"

Verifica que estés importando desde `./fixtures`:
```typescript
import { test, expect } from './fixtures' // ✅
// NO desde '@playwright/test' // ❌
```

### Los mocks no se aplican

Asegúrate de que el fixture está siendo usado:
```typescript
test('mi test', async ({ page }) => { // ✅ page viene del fixture
  // ...
})
```

### Necesito agregar más endpoints mockeados

Edita `fixtures.ts` y agrega más `page.route()`:
```typescript
await page.route('**/tu-endpoint', route => {
  route.fulfill({
    status: 200,
    body: JSON.stringify({ tu: 'respuesta' }),
  })
})
```
