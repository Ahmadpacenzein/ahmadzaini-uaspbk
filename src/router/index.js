import{createRouter, createWebHistory} from 'vue-router';
import home from '../views/home.vue';
import product from '../views/product.vue';
import footer from '../views/footer.vue';
import login from '../views/login.vue';
import signup from '../views/signup.vue';
import aboutus from '../views/aboutus.vue';
import artikel from '../views/artikel.vue';
import history from '../views/history.vue';
import keranjang from '../views/keranjang.vue';
import checkout from '../views/checkout.vue';


const routes =[
    {path:'/',component:home },
    {path:'/product',component:product },
    {path:'/footer',component:footer },
    {path:'/login',component:login },
    {path:'/signup',component:signup },
    {path:'/aboutus',component:aboutus },
    {path:'/artikel',component:artikel },
    {path:'/history',component:history },
    {path:'/keranjang',component:keranjang },
    {path:'/checkout',component:checkout },

]
const router = createRouter({
    history:createWebHistory(),
    routes:routes
});
export default router;