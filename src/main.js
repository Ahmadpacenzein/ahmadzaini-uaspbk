import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import eventBus from './eventBus';
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faLock, fas, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faLock, fas.faCartShopping, faSignOutAlt); // Menambahkan ikon cart-shopping dan sign-out

const app = createApp(App);
const pinia = createPinia();

app.component('font-awesome-icon', FontAwesomeIcon);//untuk fontawesome icon

app.config.globalProperties.$eventBus = eventBus;
app.use(pinia).use(router).mount('#app');
