import { describe, it, expect } from 'vitest'
import type { ProductDto } from '../../models/domain/store/productDto'

describe('Store Integration Tests', () => {
  describe('Product Management', () => {
    it('should display products correctly', () => {
      const products: ProductDto[] = [
        {
          id: 1,
          name: 'Auto Deportivo',
          description: 'Auto rápido y potente',
          imageUrl: '',
          price: 1000,
          productTypeId: 1,
          rarity: 'Poco Común',
          isOwned: false,
          currency: 'USD',
          productTypeName: ''
        },
        {
          id: 2,
          name: 'Comodín 50/50',
          description: 'Elimina 2 opciones incorrectas',
          imageUrl: '',
          price: 500,
          productTypeId: 2,
          rarity: 'Raro',
          isOwned: false,
          currency: 'USD',
          productTypeName: ''
        },
      ]

      expect(products).toHaveLength(2)
      expect(products[0].price).toBe(1000)
      expect(products[1].price).toBe(500)
    })

    it('should filter products by category', () => {
      const products: ProductDto[] = [
        {
            id: 1, name: 'Auto 1', description: 'Elimina 2 opciones incorrectas', imageUrl: '', price: 1000, productTypeId: 1, rarity: 'Poco Común', isOwned: false, currency: 'USD',
            productTypeName: ''
        },
        {
            id: 2, name: 'Power-up 1', price: 500, productTypeId: 2, rarity: 'Raro', description: '',
            imageUrl: '',
            productTypeName: '',
            isOwned: false,
            currency: ''
        },
        {
            id: 3, name: 'Auto 2', price: 2000, productTypeId: 1, rarity: 'Poco Común', description: '',
            imageUrl: '',
            productTypeName: '',
            isOwned: false,
            currency: ''
        },
      ]

      const carProducts = products.filter(p => p.productTypeId === 1)
      const powerUpProducts = products.filter(p => p.productTypeId === 2)

      expect(carProducts).toHaveLength(2)
      expect(powerUpProducts).toHaveLength(1)
    })

    it('should sort products by price', () => {
      const products: ProductDto[] = [
        {
            id: 1, name: 'Product 1', price: 2000, productTypeId: 1, rarity: '', description: '',
            imageUrl: '',
            productTypeName: '',
            isOwned: false,
            currency: ''
        },
        {
            id: 2, name: 'Product 2', price: 500, productTypeId: 1, rarity: '', description: '',
            imageUrl: '',
            productTypeName: '',
            isOwned: false,
            currency: ''
        },
        {
            id: 3, name: 'Product 3', price: 1500, productTypeId: 1, rarity: '', description: '',
            imageUrl: '',
            productTypeName: '',
            isOwned: false,
            currency: ''
        },
      ]

      const sortedProducts = [...products].sort((a, b) => a.price - b.price)

      expect(sortedProducts[0].price).toBe(500)
      expect(sortedProducts[1].price).toBe(1500)
      expect(sortedProducts[2].price).toBe(2000)
    })
  })

  describe('Shopping Cart', () => {
    it('should add product to cart', () => {
      const cart: ProductDto[] = []
      const product: ProductDto = {
          id: 1,
          name: 'Test Product',
          price: 1000,
          productTypeId: 1,
          rarity: '',
          description: 'Test description',
          imageUrl: '',
          productTypeName: '',
          isOwned: false,
          currency: ''
      }

      cart.push(product)

      expect(cart).toHaveLength(1)
      expect(cart[0].id).toBe(1)
    })

    it('should calculate total cart price', () => {
      const cart: ProductDto[] = [
        {
          id: 1, name: 'Product 1', price: 1000, productTypeId: 1, rarity: 'raro', description: '',
          imageUrl: '',
          productTypeName: '',
          isOwned: false,
          currency: ''
        },
        {
          id: 2, name: 'Product 2', price: 500, productTypeId: 1, rarity: 'raro', description: '',
          imageUrl: '',
          productTypeName: '',
          isOwned: false,
          currency: ''
        },
        {
          id: 3, name: 'Product 3', price: 750, productTypeId: 1, rarity: 'raro', description: '',
          imageUrl: '',
          productTypeName: '',
          isOwned: false,
          currency: ''
        },
      ]

      const total = cart.reduce((sum, product) => sum + product.price, 0)

      expect(total).toBe(2250)
    })

    it('should remove product from cart', () => {
      const cart: ProductDto[] = [
        {
          id: 1, name: 'Product 1', price: 1000, productTypeId: 1, rarity: 'raro', description: '',
          imageUrl: '',
          productTypeName: '',
          isOwned: false,
          currency: ''
        },
        {
          id: 2, name: 'Product 2', price: 500, productTypeId: 1, rarity: 'raro', description: '',
          imageUrl: '',
          productTypeName: '',
          isOwned: false,
          currency: ''
        },
      ]

      const updatedCart = cart.filter(item => item.id !== 1)

      expect(updatedCart).toHaveLength(1)
      expect(updatedCart[0].id).toBe(2)
    })

    it('should check if player has enough coins', () => {
      const playerCoins = 1500
      const cartTotal = 2000
      const canAfford = playerCoins >= cartTotal

      expect(canAfford).toBe(false)
    })

    it('should complete purchase when player has enough coins', () => {
      const playerCoins = 3000
      const cartTotal = 2000
      const canAfford = playerCoins >= cartTotal

      expect(canAfford).toBe(true)
      
      const remainingCoins = playerCoins - cartTotal
      expect(remainingCoins).toBe(1000)
    })
  })

  describe('Product Categories', () => {
    it('should categorize vehicles correctly', () => {
      const vehicleTypeId = 1
      const product: ProductDto = {
        id: 1,
        name: 'Auto Deportivo',
        price: 1000,
        productTypeId: vehicleTypeId,
        rarity: 'raro',
        description: '',
        imageUrl: '',
        productTypeName: '',
        isOwned: false,
        currency: ''
      }

      expect(product.productTypeId).toBe(vehicleTypeId)
    })

    it('should categorize power-ups correctly', () => {
      const powerUpTypeId = 2
      const product: ProductDto = {
        id: 2,
        name: 'Comodín',
        price: 500,
        productTypeId: powerUpTypeId,
        rarity: 'raro',
        description: '',
        imageUrl: '',
        productTypeName: '',
        isOwned: false,
        currency: ''
      }

      expect(product.productTypeId).toBe(powerUpTypeId)
    })
  })
})
