# 🧪 Testing Documentation - MathRacer

Esta guía explica cómo ejecutar y crear tests para el proyecto MathRacer.

## 📋 Tabla de Contenidos

1. [Configuración](#configuración)
2. [Tipos de Tests](#tipos-de-tests)
3. [Ejecutar Tests](#ejecutar-tests)
4. [Escribir Tests](#escribir-tests)
5. [Cobertura](#cobertura)

## ⚙️ Configuración

### Herramientas Instaladas

- **Vitest**: Framework de testing para tests unitarios e integración
- **React Testing Library**: Para testear componentes de React
- **Playwright**: Para tests end-to-end (E2E)

### Instalar Dependencias Adicionales

Si aún no tienes Playwright instalado:

```bash
npm install -D @playwright/test
npx playwright install
```

## 🔬 Tipos de Tests

### 1. Tests Unitarios

Testean funciones y componentes individuales de forma aislada.

**Ubicación:** `src/tests/unit/`

**Ejemplos:**
- `auth.test.tsx` - Pruebas del servicio de autenticación
- `player.test.tsx` - Pruebas del modelo de jugador
- `gameLogic.test.tsx` - Lógica del juego (validación, penalties, power-ups)

### 2. Tests de Componentes

Testean componentes de React de forma aislada.

**Ubicación:** `src/tests/components/`

**Ejemplos:**
- `coinsDisplay.test.tsx` - Componente de monedas
- `batteryStatus.test.tsx` - Componente de batería/energía

### 3. Tests de Integración

Testean la interacción entre múltiples componentes y servicios.

**Ubicación:** `src/tests/integration/`

**Ejemplos:**
- `multiplayer.test.tsx` - Flujo completo de multijugador
- `store.test.tsx` - Flujo de tienda y carrito

### 4. Tests End-to-End (E2E)

Testean la aplicación completa en un navegador real.

**Ubicación:** `src/tests/e2e/`

**Ejemplos:**
- `auth.spec.ts` - Flujo de login/registro
- `menu.spec.ts` - Navegación del menú principal
- `multiplayer.spec.ts` - Partidas multijugador
- `store.spec.ts` - Compras en la tienda

## 🚀 Ejecutar Tests

### Tests Unitarios y de Integración (Vitest)

```bash
# Ejecutar todos los tests una vez
npm test

# Ejecutar tests en modo watch (re-ejecuta al hacer cambios)
npm run test:watch

# Ejecutar con interfaz UI
npm run test:ui

# Generar reporte de cobertura
npm run test:coverage
```

### Tests E2E (Playwright)

```bash
# Ejecutar todos los tests E2E
npx playwright test

# Ejecutar en modo UI (interfaz gráfica)
npx playwright test --ui

# Ejecutar tests específicos
npx playwright test auth.spec.ts

# Ejecutar en un navegador específico
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Ver reporte de tests
npx playwright show-report
```

### Ejecutar Tests Específicos

```bash
# Vitest - por archivo
npm test src/tests/unit/auth.test.tsx

# Vitest - por nombre de test
npm test -t "should login successfully"

# Playwright - por archivo
npx playwright test auth.spec.ts

# Playwright - por nombre de test
npx playwright test -g "should display login page"
```

## ✍️ Escribir Tests

### Test Unitario Ejemplo

```typescript
import { describe, it, expect } from 'vitest'

describe('Suma', () => {
  it('debe sumar dos números correctamente', () => {
    const resultado = 2 + 3
    expect(resultado).toBe(5)
  })
  
  it('debe manejar números negativos', () => {
    const resultado = -5 + 3
    expect(resultado).toBe(-2)
  })
})
```

### Test de Componente Ejemplo

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '../utils/test-utils'
import { CoinsDisplay } from '../../components/home/coinsDisplay'

describe('CoinsDisplay', () => {
  it('debe mostrar la cantidad de monedas', () => {
    render(<CoinsDisplay coins={1000} />)
    
    expect(screen.getByText('1000')).toBeInTheDocument()
  })
})
```

### Test E2E Ejemplo

```typescript
import { test, expect } from '@playwright/test'

test('debe iniciar sesión con credenciales válidas', async ({ page }) => {
  await page.goto('/')
  
  await page.fill('input[type="email"]', 'test@example.com')
  await page.fill('input[type="password"]', 'password123')
  
  await page.click('button[type="submit"]')
  
  await expect(page).toHaveURL(/.*menu/)
})
```

## 📊 Cobertura de Tests

### Ver Cobertura

```bash
npm run test:coverage
```

Esto generará un reporte en `coverage/index.html` que puedes abrir en tu navegador.

### Objetivo de Cobertura

- **Funciones críticas:** 90%+
- **Componentes UI:** 70%+
- **Servicios:** 80%+
- **Total del proyecto:** 70%+

## 🎯 Qué Testear

### ✅ Debes Testear

- **Lógica de negocio:** Cálculos, validaciones, transformaciones
- **Componentes con estado:** Cambios de estado, efectos secundarios
- **Servicios:** Llamadas a APIs, autenticación, SignalR
- **Flujos críticos:** Login, registro, crear partida, comprar productos
- **Edge cases:** Valores límite, casos extremos, errores

### ❌ No Es Necesario Testear

- Librerías de terceros (React, Firebase, etc.)
- Componentes puramente visuales sin lógica
- Configuraciones simples
- Constantes y tipos

## 🔍 Debugging Tests

### Vitest

```bash
# Modo debug con Node
node --inspect-brk ./node_modules/vitest/vitest.mjs run

# Ver output detallado
npm test -- --reporter=verbose
```

### Playwright

```bash
# Modo debug
npx playwright test --debug

# Ejecutar paso a paso
npx playwright test --headed --slowMo=1000

# Ver trace
npx playwright test --trace on
npx playwright show-trace trace.zip
```

## 📝 Comandos Útiles

```bash
# Actualizar snapshots
npm test -- -u

# Ejecutar solo tests que fallaron
npm test -- --run --changed

# Ver tests disponibles sin ejecutarlos
npx playwright test --list

# Generar código de test grabando interacciones
npx playwright codegen http://localhost:5173
```

## 🐛 Solución de Problemas Comunes

### Error: "Cannot find module"

```bash
# Reinstalar dependencias
rm -rf node_modules
npm install
```

### Tests E2E fallan por timeout

```typescript
// Aumentar timeout en el test
test('mi test', async ({ page }) => {
  test.setTimeout(60000) // 60 segundos
  // ...
})
```

### Mock de Firebase no funciona

Verifica que el mock esté en `src/tests/setup.ts` y que se esté importando correctamente.

## 📚 Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## 🎓 Mejores Prácticas

1. **Nombre descriptivo:** El nombre del test debe explicar qué hace
2. **Arrange-Act-Assert:** Organiza el test en setup, ejecución y verificación
3. **Un concepto por test:** Cada test debe verificar una sola cosa
4. **Tests independientes:** Los tests no deben depender unos de otros
5. **Evita detalles de implementación:** Testea comportamiento, no código interno
6. **Usa data-testid con moderación:** Prefiere roles y labels accesibles

---

¿Necesitas ayuda? Consulta la documentación o pregunta al equipo! 🚀
