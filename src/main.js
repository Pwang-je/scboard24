import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-blue/theme.css'; // theme
import 'primevue/resources/primevue.css'; // core CSS
import 'primeicons/primeicons.css'; // icons
import 'swiper/swiper-bundle.css';
import '@/assets/css/tailwind.css';
import '@/assets/css/fonts.css';

const app = createApp(App);

app.use(PrimeVue);

app.mount('#app');
