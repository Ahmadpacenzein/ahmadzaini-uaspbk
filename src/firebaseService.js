import { database } from "./firebase.js";
import {
  ref,
  get,
  set,
  push,
  update,
  remove,
  query,
  orderByChild,
  equalTo
} from "firebase/database";

/* =========================
      🔐 USER SECTION
========================= */

// Ambil semua user
export async function getAllUsers() {
  const snapshot = await get(ref(database, "users"));
  return snapshot.exists() ? Object.values(snapshot.val()) : [];
}

// Login user (by email + password)
export async function loginUser(email, password) {
  const userRef = ref(database, "users");
  const emailQuery = query(userRef, orderByChild("email"), equalTo(email));
  const snapshot = await get(emailQuery);

  if (snapshot.exists()) {
    const users = snapshot.val();
    const userKey = Object.keys(users)[0];
    const user = users[userKey];
    if (user.password === password) {
      return { success: true, user };
    }
  }

  return { success: false };
}

// Tambah user baru
export async function createUser(userData) {
  const usersRef = ref(database, "users");
  const newRef = push(usersRef);
  await set(newRef, { ...userData, id: newRef.key }); // tambahkan id dari key
}

// Update user
export async function updateUser(userId, newData) {
  const userRef = ref(database, `users/${userId}`);
  await update(userRef, newData);
}

// Hapus user
export async function deleteUser(userId) {
  const userRef = ref(database, `users/${userId}`);
  await remove(userRef);
}


/* =========================
      🛍️ PRODUCT SECTION
========================= */

// Ambil semua produk
export async function getAllProducts() {
  const snapshot = await get(ref(database, "products"));
  return snapshot.exists() ? Object.values(snapshot.val()) : [];
}

// Tambah produk baru
export async function createProduct(productData) {
  const productRef = ref(database, "products");
  const newRef = push(productRef);
  await set(newRef, { ...productData, id: newRef.key });
}

// Update produk
export async function updateProduct(productId, newData) {
  const productRef = ref(database, `products/${productId}`);
  await update(productRef, newData);
}

// Hapus produk
export async function deleteProduct(productId) {
  const productRef = ref(database, `products/${productId}`);
  await remove(productRef);
}


/* =========================
      📦 HISTORY SECTION
========================= */

// Ambil semua riwayat transaksi
export async function getAllHistories() {
  const snapshot = await get(ref(database, "histories"));
  return snapshot.exists() ? Object.values(snapshot.val()) : [];
}

// Tambah riwayat transaksi
export async function addHistory(historyData) {
  const historyRef = ref(database, "histories");
  const newRef = push(historyRef);
  await set(newRef, { ...historyData, id: newRef.key });
}
