import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import eventBus from './eventBus';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faLock, fas } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faLock,fas.faCartShopping); // Menambahkan ikon cart-shopping

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);//untuk fontawesome icon

app.config.globalProperties.$eventBus = eventBus;
app.use(router).mount('#app');
