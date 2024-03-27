import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/arya-blue/theme.css';
import 'primevue/resources/primevue.css';

const app = createApp(App);

app.use(PrimeVue);

app.mount('#app');
