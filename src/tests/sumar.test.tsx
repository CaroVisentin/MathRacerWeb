import { describe, it, expect } from 'vitest'
import { sumar } from '../utils/sumar';

describe('sumar', () => {
    it('suma dos números correctamente', () => {
        expect(sumar(2, 3)).toBe(5)
    })
})
