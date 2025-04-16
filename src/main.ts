import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import moviesStore from './store/movies';
import router from './router/index';

const app = createApp(App);

app.use(moviesStore);
app.use(router);

app.mount('#app');
