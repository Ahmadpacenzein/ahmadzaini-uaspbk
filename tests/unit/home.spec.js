import { describe, it, expect } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCartStore } from '../../src/stores/cart';

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('adds item to cart and verifies data exists', () => {
    const cartStore = useCartStore();
    const product = { id: 1, name: 'Produk Test', price: 10000 };

    cartStore.addToCart(product);

    expect(cartStore.items.length).toBeGreaterThan(0);
    expect(cartStore.items[0].id).toBe(product.id);
  });
});
