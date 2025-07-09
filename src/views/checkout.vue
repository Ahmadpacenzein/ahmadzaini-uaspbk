<template>
  <div class="checkout-container">
    <h1>Checkout</h1>

    <div class="checkout-content">
      <div class="form-section">
        <div class="form-group">
          <label>Nama Penerima</label>
          <input 
            type="text" 
            v-model="formData.recipientName" 
            placeholder="Masukkan nama penerima"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label>Nomor Telepon</label>
          <input 
            type="tel" 
            v-model="formData.phone" 
            placeholder="Masukkan nomor telepon"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label>Alamat</label>
          <div class="map-container">
            <!-- Placeholder for map -->
            <div class="map-placeholder">
              <p>Pilih lokasi pada peta</p>
              <button class="btn btn-map" @click="selectLocation">
                Pilih Lokasi
              </button>
            </div>
          </div>
          <textarea 
            v-model="formData.address" 
            placeholder="Alamat lengkap"
            class="form-input address-input"
            rows="3"
          ></textarea>
        </div>

        <div class="form-group">
          <label>Metode Pembayaran</label>
          <select v-model="formData.paymentMethod" class="form-input">
            <option value="">Pilih metode pembayaran</option>
            <option value="transfer">Transfer Bank</option>
            <option value="cod">Cash on Delivery (COD)</option>
            <option value="ewallet">E-Wallet</option>
          </select>
        </div>
      </div>

      <div class="order-summary neumorphism-card">
        <h2>Ringkasan Pesanan</h2>
        
        <div class="summary-items">
          <div v-for="item in cartStore.items" :key="item.id" class="summary-item">
            <span>{{ item.name }} x{{ item.quantity }}</span>
            <span>Rp {{ (item.price * item.quantity).toLocaleString('id-ID') }}</span>
          </div>
        </div>

        <div class="summary-row subtotal">
          <span>Subtotal</span>
          <span>Rp {{ cartStore.totalPrice.toLocaleString('id-ID') }}</span>
        </div>

        <div class="summary-row shipping">
          <span>Ongkos Kirim</span>
          <span>Rp {{ shippingCost.toLocaleString('id-ID') }}</span>
        </div>

        <div class="summary-row total">
          <span>Total</span>
          <span>Rp {{ totalAmount.toLocaleString('id-ID') }}</span>
        </div>

        <button 
          class="btn btn-pay" 
          @click="processPayment"
          :disabled="!isFormValid"
        >
          Bayar Sekarang
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '../stores/cart';
import { addHistory } from '../firebaseService';

export default {
  name: 'Checkout',
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  data() {
    return {
      shippingCost: 25000,
      formData: {
        recipientName: '',
        phone: '',
        address: '',
        paymentMethod: ''
      }
    }
  },
  computed: {
    totalAmount() {
      return this.cartStore.totalPrice + this.shippingCost;
    },
    isFormValid() {
      return this.formData.recipientName &&
             this.formData.phone &&
             this.formData.address &&
             this.formData.paymentMethod;
    }
  },
  methods: {
    selectLocation() {
      // Placeholder for map selection
      // In real implementation, this would open a map modal
      alert('Fitur pemilihan lokasi akan segera hadir!');
    },
    async processPayment() {
      if (!this.isFormValid) return;

      try {
        // Get current user from localStorage
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (!currentUser || !currentUser.id) {
          alert('Silakan login terlebih dahulu');
          this.$router.push('/login');
          return;
        }

        // Create order history entry
      const orderHistory = {
      id: Date.now().toString(),
      userId: currentUser.id, // ✅ sudah dipastikan tidak undefined
      date: new Date().toISOString(),
      items: this.cartStore.items,
      shippingCost: this.shippingCost,
      totalAmount: this.totalAmount,
      recipientInfo: {
        name: this.formData.recipientName,
        phone: this.formData.phone,
        address: this.formData.address
      },
      paymentMethod: this.formData.paymentMethod,
      status: 'completed'
    };

        // Save order to Firebase
        await addHistory(orderHistory);

        // Clear cart
        this.cartStore.clearCart();

        // Show success message
        alert('Pembayaran berhasil! Pesanan Anda sedang diproses.');

        // Redirect to history page
        this.$router.push('/history');
      } catch (error) {
        console.error('Error processing payment:', error);
        alert('Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.');
      }
    }
  }
}
</script>

<style scoped>
.checkout-container {
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

.checkout-content {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  color: #666;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #333;
}

.form-input {
  color: #666;
  font-weight: bold;
  padding: 12px;
  border: 2px solid #e6b800;
  border-radius: 10px;
  background: white;
  font-size: 1em;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #ffcc00;
  box-shadow: 0 0 0 2px rgba(255, 204, 0, 0.2);
}

.address-input {
  resize: vertical;
  min-height: 80px;
}

.map-container {
  background: white;
  border: 2px solid #e6b800;
  border-radius: 10px;
  height: 200px;
  margin-bottom: 10px;
  overflow: hidden;
}

.map-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f8f8f8;
  color: #666;
}

.btn-map {
  margin-top: 10px;
  background-color: #e6b800;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
}

.order-summary {
  padding: 30px;
  height: fit-content;
  position: sticky;
  top: 20px;
}

.order-summary h2 {
  margin: 0 0 20px 0;
  color: #333;
  text-align: center;
}

.summary-items {
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  color: #666;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-weight: 500;
}

.subtotal {
  border-top: 1px solid #ddd;
}

.shipping {
  border-bottom: 1px solid #ddd;
}

.total {
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
}

.btn-pay {
  width: 100%;
  font-weight: bold;
  border-radius: 30px;
  background-color: white;
  color: #333;
  font-size: 1.2em;
  padding: 18px;
  margin-top: 20px;
  box-shadow: 6px 6px 12px #e6b800, -6px -6px 12px #ffdb4d;
  border: 2px solid #ffcc00;
  transition: all 0.3s ease;
}

.btn-pay:hover:not(:disabled) {
  background-color: #ffcc00;
  color: white;
  transform: translateY(-2px);
  box-shadow: 8px 8px 16px #e6b800, -8px -8px 16px #ffeb80;
}

.btn-pay:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #f0f0f0;
  border-color: #ddd;
  box-shadow: none;
}

.neumorphism-card {
  background: #f0f2f5;
  border-radius: 20px;
  box-shadow: 9px 9px 18px #d1d3d6, -9px -9px 18px #ffffff;
}

@media (max-width: 768px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }
  
  .order-summary {
    position: static;
    margin-top: 30px;
  }
}
</style>
