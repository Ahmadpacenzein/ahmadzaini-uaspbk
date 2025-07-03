<template>
  <div class="product-page-container">
    <h2>Semua Produk Jamu Kami</h2>
    <p>Temukan ramuan tradisional terbaik untuk Anda.</p>
    
    <div class="filter-bar neumorphism-card-flat">
        <span>Filter:</span>
        <button 
          v-for="filter in filters" 
          :key="filter"
          class="btn-filter"
          :class="{ active: activeFilter === filter }"
          @click="setFilter(filter)"
        >
          {{ filter }}
        </button>
    </div>

    <div class="product-grid">
      <div 
        v-for="product in filteredProducts" 
        :key="product.id" 
        class="product-card neumorphism-card-small"
      >
        <img :src="product.image" :alt="product.name">
        <h3>{{ product.name }}</h3>
        <span class="price">Rp {{ formatPrice(product.price) }}</span>
        <button class="btn btn-add-cart" @click="addToCart(product)">Tambah</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '../stores/cart';

export default {
  name: 'Product',
  data() {
    return {
      products: [],
      activeFilter: 'Semua',
      filters: ['Semua', 'Penyegar', 'Penghangat', 'Stamina']
    }
  },
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  computed: {
    filteredProducts() {
      if (this.activeFilter === 'Semua') {
        return this.products
      }
      return this.products.filter(product => product.Filter === this.activeFilter)
    }
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch('http://localhost:3000/products')
        this.products = await response.json()
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },
    setFilter(filter) {
      this.activeFilter = filter
    },
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    addToCart(product) {
      this.cartStore.addToCart(product);
      alert(`${product.name} berhasil ditambahkan ke keranjang!`);
    }
  },
  mounted() {
    this.fetchProducts()
  }
}
</script>

<style scoped>
.product-page-container {
  padding: 20px 40px;
  background-color: #f0f2f5;
  text-align: center;
}

h2 {
    color: #333;
    margin-bottom: 5px;
}

p {
    color: #666;
    margin-bottom: 40px;
}

.filter-bar {
    margin-bottom: 40px;
    padding: 15px 30px;
    text-align: center;
}

.neumorphism-card-flat {
  background: #f0f2f5;
  border-radius: 20px;
  box-shadow: 10px 10px 20px #d1d3d6, -10px -10px 20px #ffffff;
}

.btn-filter {
  border: none;
  padding: 8px 18px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  background-color: #f0f2f5;
  box-shadow: 5px 5px 10px #d1d3d6, -5px -5px 10px #ffffff;
  margin: 0 10px;
  color: #555;
}
.btn-filter:hover {
    color: #e6b800;
}
.btn-filter.active {
  color: #e6b800; /* Aksen kuning */
  box-shadow: inset 4px 4px 8px #d1d3d6, inset -4px -4px 8px #ffffff;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 35px; /* Sedikit lebih besar */
}

.neumorphism-card-small {
  background: #f0f2f5;
  border-radius: 20px;
  padding: 25px;
  box-shadow: 9px 9px 18px #d1d3d6, -9px -9px 18px #ffffff;
  text-align: center;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.neumorphism-card-small:hover {
    transform: scale(1.03);
    box-shadow: 12px 12px 24px #d1d3d6, -12px -12px 24px #ffffff;
}

.product-card img {
  max-width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 15px;
  margin-bottom: 15px;
  box-shadow: 6px 6px 12px #d1d3d6, -6px -6px 12px #ffffff;
}

.product-card h3 {
  margin: 10px 0 5px 0;
  color: #333;
  font-size: 1.1em;
}

.product-card p {
  color: #666;
  font-size: 0.85em;
  margin-bottom: 15px;
  line-height: 1.4;
  flex-grow: 1; /* Agar deskripsi mengisi ruang */
}

.price {
  color: #e6b800;
  font-weight: bold;
  font-size: 1.2em;
  display: block;
  margin-bottom: 20px;
}

.btn {
  border: none;
  padding: 10px 20px;
  border-radius: 15px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  background-color: #f0f2f5;
  box-shadow: 6px 6px 12px #d1d3d6, -6px -6px 12px #ffffff;
  color: #555;
  width: 100%;
}
.btn:hover {
    box-shadow: inset 3px 3px 6px #d1d3d6, inset -3px -3px 6px #ffffff;
    color: #e6b800;
}
</style>
