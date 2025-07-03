<template>
  <div class="history-container">
    <h1>Riwayat Pesanan</h1>
    
    <div v-if="!currentUser" class="no-user">
      <p>Silakan login untuk melihat riwayat pesanan</p>
      <button class="btn btn-cta" @click="goToLogin">Login</button>
    </div>

    <div v-else-if="userHistories.length === 0" class="empty-history">
      <p>Belum ada riwayat pesanan</p>
      <button class="btn btn-cta" @click="goToHome">Mulai Belanja</button>
    </div>

    <div v-else class="history-list">
      <div 
        v-for="order in userHistories" 
        :key="order.id" 
        class="history-item neumorphism-card"
      >
        <div class="order-header">
          <div class="order-info">
            <h3>Pesanan #{{ order.id }}</h3>
            <p class="order-date">{{ formatDate(order.date) }}</p>
            <span class="order-status" :class="order.status">{{ getStatusText(order.status) }}</span>
          </div>
          <div class="order-total">
            <p class="total-amount">Rp {{ order.totalAmount.toLocaleString('id-ID') }}</p>
          </div>
        </div>

        <div class="order-details">
          <div class="recipient-info">
            <h4>Informasi Penerima:</h4>
            <p><strong>Nama:</strong> {{ order.recipientInfo.name }}</p>
            <p><strong>Telepon:</strong> {{ order.recipientInfo.phone }}</p>
            <p><strong>Alamat:</strong> {{ order.recipientInfo.address }}</p>
          </div>

          <div class="payment-info">
            <h4>Pembayaran:</h4>
            <p><strong>Metode:</strong> {{ getPaymentMethodText(order.paymentMethod) }}</p>
          </div>

          <div class="items-list">
            <h4>Item Pesanan:</h4>
            <div class="order-items">
              <div v-for="item in order.items" :key="item.id" class="order-item">
                <img :src="item.image" :alt="item.name" class="item-image" />
                <div class="item-details">
                  <p class="item-name">{{ item.name }}</p>
                  <p class="item-quantity">{{ item.quantity }}x</p>
                  <p class="item-price">Rp {{ (item.price * item.quantity).toLocaleString('id-ID') }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="order-summary">
            <div class="summary-row">
              <span>Subtotal:</span>
              <span>Rp {{ (order.totalAmount - order.shippingCost).toLocaleString('id-ID') }}</span>
            </div>
            <div class="summary-row">
              <span>Ongkos Kirim:</span>
              <span>Rp {{ order.shippingCost.toLocaleString('id-ID') }}</span>
            </div>
            <div class="summary-row total">
              <span>Total:</span>
              <span>Rp {{ order.totalAmount.toLocaleString('id-ID') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "History",
  data() {
    return {
      histories: [],
      currentUser: null
    }
  },
  computed: {
    userHistories() {
      if (!this.currentUser) return [];
      return this.histories.filter(history => history.userId === this.currentUser.id)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  },
  mounted() {
    // Get current user
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUser = JSON.parse(user);
    }

    // Load histories
    this.loadHistories();
  },
  methods: {
    loadHistories() {
      try {
        const histories = JSON.parse(localStorage.getItem('orderHistories') || '[]');
        this.histories = histories;
      } catch (error) {
        console.error('Error loading histories:', error);
        this.histories = [];
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    getStatusText(status) {
      const statusMap = {
        'completed': 'Selesai',
        'processing': 'Diproses',
        'shipped': 'Dikirim',
        'delivered': 'Terkirim'
      };
      return statusMap[status] || status;
    },
    getPaymentMethodText(method) {
      const methodMap = {
        'transfer': 'Transfer Bank',
        'cod': 'Cash on Delivery (COD)',
        'ewallet': 'E-Wallet'
      };
      return methodMap[method] || method;
    },
    goToLogin() {
      this.$router.push('/login');
    },
    goToHome() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.history-container {
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

.no-user, .empty-history {
  text-align: center;
  padding: 60px 20px;
}

.no-user p, .empty-history p {
  font-size: 1.2em;
  color: #666;
  margin-bottom: 30px;
}

.history-list {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.history-item {
  padding: 30px;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e6b800;
}

.order-info h3 {
  margin: 0 0 5px 0;
  color: #333;
  font-size: 1.3em;
}

.order-date {
  color: #666;
  margin: 0 0 10px 0;
  font-size: 0.9em;
}

.order-status {
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.8em;
  font-weight: bold;
  text-transform: uppercase;
}

.order-status.completed {
  background-color: #4CAF50;
  color: white;
}

.order-status.processing {
  background-color: #FF9800;
  color: white;
}

.total-amount {
  font-size: 1.4em;
  font-weight: bold;
  color: #e6b800;
  margin: 0;
}

.order-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 25px;
}

.order-details h4 {
  color: #333;
  margin: 0 0 15px 0;
  font-size: 1.1em;
}

.recipient-info p, .payment-info p {
  margin: 5px 0;
  color: #555;
}

.items-list {
  grid-column: 1 / -1;
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: white;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-name {
  font-weight: 600;
  color: #333;
  margin: 0;
}

.item-quantity {
  color: #666;
  margin: 0;
}

.item-price {
  font-weight: bold;
  color: #e6b800;
  margin: 0;
}

.order-summary {
  grid-column: 1 / -1;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 5px 0;
}

.summary-row.total {
  border-top: 2px solid #e6b800;
  font-weight: bold;
  font-size: 1.1em;
  color: #333;
  margin-top: 15px;
  padding-top: 15px;
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

@media (max-width: 768px) {
  .order-header {
    flex-direction: column;
    gap: 15px;
  }
  
  .order-details {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .item-details {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
}
</style>
