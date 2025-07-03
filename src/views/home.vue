<template>
  <div class="home-container">
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>Rasakan Kekuatan Alam dalam Setiap Tetes Jamu</h1>
        <p>Kembali ke akar tradisi untuk kesehatan modern Anda. Temukan jamu favoritmu!</p>
        <p>"JamuGenji jamunya para Gen Z"</p>
        <button class="btn btn-cta"@click="goToProductPage">Jelajahi Produk</button>
      </div>
    </section>
    <section class="featured-products">
      <h2>Produk Unggulan</h2>
      <div class="product-grid">
        <div 
          v-for="product in products" 
          :key="product.id" 
          class="product-card neumorphism-card-small"
        >
          <img :src="product.image" :alt="product.name" />
          <h3>{{ product.name }}</h3>
          <p>Rp {{ product.price.toLocaleString('id-ID') }}</p>
          <button class="btn btn-add-cart" @click="addToCart(product)">Tambah</button>
        </div>
      </div>

    </section>
    <button class="btn btn-cta"@click="goToProductPage">Jelajahi Produk</button>

    <section class="featured-articles">
        <h2>Artikel Unggulan</h2>
        <div class="article-list">
            <div class="article-item neumorphism-card-small">
                <h3>Manfaat Kunyit Asam untuk Wanita</h3>
                <p>Kunyit asam bukan hanya menyegarkan, tapi juga menyimpan segudang...</p>
                <a href="https://www.sidomunculstore.com/blog/post/16-manfaat-jamu-kunyit-asam-untuk-wanita.html" class="read-more">Baca Selengkapnya</a>
            </div>
             <div class="article-item neumorphism-card-small">
                <h3>Beras Kencur: Penghangat Tubuh Alami</h3>
                <p>Saat cuaca dingin atau badan terasa pegal, segelas beras kencur bisa...</p>
                <a href="https://www.liputan6.com/feeds/read/5857139/resep-beras-kencur-minuman-tradisional-berkhasiat-untuk-kesehatan#:~:text=Beras%20Kencur%20dengan%20Jahe:%20*%20Manfaat:%20Meningkatkan,Meredakan%20masuk%20angin%20dan%20meningkatkan%20sirkulasi%20darah." class="read-more">Baca Selengkapnya</a>
            </div>
        </div>
    </section>

  </div>
</template>

<script>
import axios from 'axios';
import { useCartStore } from '../stores/cart';

export default {
    name: 'Home',
    data() {
        return {
            products: []
        }
    },
    setup() {
        const cartStore = useCartStore();
        return { cartStore };
    },
    async mounted() {
        try {
            const response = await axios.get('/db.json');
            this.products = response.data.products || [];
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    },
    methods: {
        goToProductPage() {
            this.$router.push('/product');
        },
        addToCart(product) {
            this.cartStore.addToCart(product);
            alert(`${product.name} berhasil ditambahkan ke keranjang!`);
        }
    }
}
</script>

<style scoped>
.home-container {
    padding: 0 40px;
    padding-bottom: 40px;
    background-color: #f0f2f5;
    /* Hapus border-radius dari container utama agar hero bisa full-width jika diinginkan, 
       atau sesuaikan jika container dibatasi lebarnya */
}

/* GAYA LAMA .neumorphism-card untuk hero DIHAPUS */

/* GAYA BARU UNTUK HERO SECTION */
.hero-section {
  position: relative; /* Diperlukan untuk positioning overlay dan content */
  height: 65vh; /* Tinggi section, sesuaikan sesuai selera */
  margin-bottom: 60px; /* Jarak ke section berikutnya */
  border-radius: 30px; /* Agar sudutnya tetap melengkung */
  overflow: hidden; /* Agar gambar tidak keluar dari border-radius */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  
  /* --- FIELD UNTUK GAMBAR LATAR --- */
  /* Ganti URL ini dengan path gambar Anda */
  background-image: url('https://awsimages.detik.net.id/community/media/visual/2025/02/08/jamu-2.jpeg?w=1200'); 
  background-size: cover; /* Agar gambar menutupi seluruh area */
  background-position: center; /* Posisi gambar di tengah */
  box-shadow: 15px 15px 30px #d1d3d6, -15px -15px 30px #ffffff; /* Shadow agar tetap neumorphism */
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(50, 50, 30, 0.45); /* Warna overlay (gelap kekuningan) - sesuaikan opacity */
  z-index: 1; /* Di bawah teks, di atas gambar */
}

.hero-content {
  position: relative; /* Agar di atas overlay */
  z-index: 2;
  color: #ffffff; /* Warna teks putih agar kontras */
  padding: 30px;
  max-width: 700px; /* Batasi lebar teks agar tidak terlalu panjang */
}

.hero-content h1 {
  font-size: 3em; /* Ukuran slogan lebih besar */
  margin-bottom: 15px;
  font-weight: 700;
  text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.6); /* Bayangan teks agar lebih terbaca */
  color: #fff; /* Pastikan H1 putih */
}

.hero-content p {
  font-size: 1.3em;
  margin-bottom: 40px;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5); /* Bayangan teks */
  color: #f0f0f0; /* Pastikan p putih kusam */
}
/* AKHIR GAYA BARU */


.neumorphism-card-small {
    background: #f0f2f5;
    border-radius: 20px;
    padding: 25px;
    box-shadow: 9px 9px 18px #d1d3d6, -9px -9px 18px #ffffff;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.neumorphism-card-small:hover {
    transform: translateY(-5px);
    box-shadow: 12px 12px 24px #d1d3d6, -12px -12px 24px #ffffff;
}

.btn {
  border: none;
  padding: 12px 25px;
  border-radius: 15px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  background-color: #f0f2f5;
  box-shadow: 6px 6px 12px #d1d3d6, -6px -6px 12px #ffffff;
}
.btn:hover {
    box-shadow: inset 3px 3px 6px #d1d3d6, inset -3px -3px 6px #ffffff;
}

.btn-cta {
  background-color: #e6b800;
  color: white;
  font-size: 1.1em;
  padding: 15px 35px;
  box-shadow: 8px 8px 16px #c49c00, -8px -8px 16px #fff488;
  /* Tambahkan text-shadow agar lebih kontras di atas gambar */
  text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
}
.btn-cta:hover {
  background-color: #cda500;
  box-shadow: inset 4px 4px 8px #b18e00, inset -4px -4px 8px #fffcb0;
}

h2 {
    text-align: center;
    margin-top: 50px; /* Beri jarak atas dari hero/section sebelumnya */
    margin-bottom: 30px;
    color: #444;
    font-weight: 600;
}

.featured-products, .featured-articles {
    margin-bottom: 50px;
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
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
}

.product-card p {
    color: #e6b800;
    font-weight: bold;
    margin-bottom: 15px;
    font-size: 1.1em; /* Sedikit lebih besar */
}

.btn-add-cart {
    background-color: #f0f2f5;
    color: #555;
    width: 80%;
}
.btn-add-cart:hover {
    color: #e6b800;
}

.article-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.article-item {
    text-align: left;
}

.article-item h3 {
    color: #333;
    margin-bottom: 10px;
}
.article-item p {
    color: #666;
    font-size: 0.9em;
    margin-bottom: 20px;
    line-height: 1.5;
}

.read-more {
    color: #e6b800;
    text-decoration: none;
    font-weight: bold;
}
.read-more:hover {
    text-decoration: underline;
}

</style>