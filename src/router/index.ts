import { createRouter, createWebHistory } from 'vue-router';
import MoviesCatalog from './../components/MoviesCatalog.vue';

//'../components/MoviesCatalog.vue';

const routes = [
  {
    path: '/',
    name: 'Catalog',
    component: MoviesCatalog,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
