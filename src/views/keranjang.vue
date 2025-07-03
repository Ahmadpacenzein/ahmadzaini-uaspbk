<template>
  <div class="keranjang-container">
    <h1>Keranjang Belanja</h1>
    
    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <p>Keranjang Anda kosong</p>
      <button class="btn btn-cta" @click="goToHome">Mulai Belanja</button>
    </div>

    <div v-else class="cart-content">
      <div class="cart-items">
        <div 
          v-for="item in cartStore.items" 
          :key="item.id" 
          class="cart-item neumorphism-card"
        >
          <img :src="item.image" :alt="item.name" class="item-image" />
          
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p class="item-price">Rp {{ item.price.toLocaleString('id-ID') }}</p>
          </div>

          <div class="quantity-controls">
            <button 
              class="btn btn-quantity" 
              @click="decreaseQuantity(item.id)"
              :disabled="item.quantity <= 1"
            >
              -
            </button>
            <span class="quantity">{{ item.quantity }}</span>
            <button 
              class="btn btn-quantity" 
              @click="increaseQuantity(item.id)"
            >
              +
            </button>
          </div>

          <div class="item-total">
            <p>Rp {{ (item.price * item.quantity).toLocaleString('id-ID') }}</p>
          </div>

          <button 
            class="btn btn-remove" 
            @click="removeItem(item.id)"
          >
            Hapus
          </button>
        </div>
      </div>

      <div class="cart-summary neumorphism-card">
        <h3>Ringkasan Pesanan</h3>
        <div class="summary-row">
          <span>Total Item:</span>
          <span>{{ cartStore.totalItems }}</span>
        </div>
        <div class="summary-row total">
          <span>Total Harga:</span>
          <span>Rp {{ cartStore.totalPrice.toLocaleString('id-ID') }}</span>
        </div>
        <button class="btn btn-checkout">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '../stores/cart';

export default {
  name: 'Keranjang',
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  mounted() {
    // Scroll to top when component is mounted
    window.scrollTo(0, 0);
  },
  methods: {
    goToHome() {
      this.$router.push('/');
    },
    increaseQuantity(productId) {
      const item = this.cartStore.items.find(item => item.id === productId);
      if (item) {
        this.cartStore.updateQuantity(productId, item.quantity + 1);
      }
    },
    decreaseQuantity(productId) {
      const item = this.cartStore.items.find(item => item.id === productId);
      if (item && item.quantity > 1) {
        this.cartStore.updateQuantity(productId, item.quantity - 1);
      }
    },
    removeItem(productId) {
      if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
        this.cartStore.removeFromCart(productId);
      }
    }
  }
}
</script>

<style scoped>
.keranjang-container {
  padding: 20px 40px 40px 40px;
  background-color: #f0f2f5;
  min-height: 100vh;
  margin-top: 0;
  position: relative;
  top: 0;
}

h1 {
  text-align: center;
  margin-top: 0;
  margin-bottom: 40px;
  color: #444;
  font-weight: 600;
  padding-top: 20px;
}

.empty-cart {
  text-align: center;
  padding: 60px 20px;
}

.empty-cart p {
  font-size: 1.2em;
  color: #666;
  margin-bottom: 30px;
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr auto auto auto;
  gap: 20px;
  align-items: center;
  padding: 20px;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
}

.item-details h3 {
  margin: 0 0 5px 0;
  color: #333;
  font-size: 1.1em;
}

.item-price {
  color: #e6b800;
  font-weight: bold;
  margin: 0;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-quantity {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background-color: #f0f2f5;
  color: #333;
  box-shadow: 4px 4px 8px #d1d3d6, -4px -4px 8px #ffffff;
}

.btn-quantity:hover:not(:disabled) {
  box-shadow: inset 2px 2px 4px #d1d3d6, inset -2px -2px 4px #ffffff;
}

.btn-quantity:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity {
  font-weight: bold;
  min-width: 30px;
  text-align: center;
}

.item-total {
  font-weight: bold;
  color: #333;
  min-width: 100px;
  text-align: right;
}

.btn-remove {
  font-weight: bold;
  background-color: #ff6b6b;
  color: rgb(218, 0, 0);
  padding: 8px 16px;
  box-shadow: 4px 4px 8px #d1d3d6, -4px -4px 8px #ffffff;
}

.btn-remove:hover {
  background-color: #ff5252;
  box-shadow: inset 2px 2px 4px rgba(0,0,0,0.2), inset -2px -2px 4px rgba(255,255,255,0.8);
  color: #d1d3d6;
}

.cart-summary {
  padding: 30px;
  height: fit-content;
  position: sticky;
  top: 20px;
}

.cart-summary h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 10px 0;
}

.summary-row.total {
  border-top: 2px solid #e6b800;
  font-weight: bold;
  font-size: 1.1em;
  color: #333;
}

.btn-checkout {
  width: 100%;
  font-weight: bold;
  border-radius: 30px;
  background-color: #6f6f6f;
  color: rgb(0, 0, 0);
  font-size: 1.1em;
  padding: 15px;
  margin-top: 20px;
  box-shadow: 6px 6px 12px #c49c00, -6px -6px 12px #fff488;
}

.btn-checkout:hover {
  background-color: #cda500;
  box-shadow: inset 3px 3px 6px #b18e00, inset -3px -3px 6px #fffcb0;
}

.neumorphism-card {
  background: #f0f2f5;
  border-radius: 20px;
  box-shadow: 9px 9px 18px #d1d3d6, -9px -9px 18px #ffffff;
}

.btn {
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #f0f2f5;
}

.btn-cta {
  background-color: #e6b800;
  color: white;
  font-size: 1.1em;
  padding: 15px 35px;
  border-radius: 15px;
  box-shadow: 8px 8px 16px #c49c00, -8px -8px 16px #fff488;
}

.btn-cta:hover {
  background-color: #cda500;
  box-shadow: inset 4px 4px 8px #b18e00, inset -4px -4px 8px #fffcb0;
}

/* Responsive design */
@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
  
  .cart-item {
    grid-template-columns: 80px 1fr;
    grid-template-rows: auto auto auto;
    gap: 15px;
  }
  
  .quantity-controls {
    grid-column: 1 / -1;
    justify-self: center;
  }
  
  .item-total {
    grid-column: 1 / -1;
    text-align: center;
  }
  
  .btn-remove {
    grid-column: 1 / -1;
    justify-self: center;
  }
}
</style>
