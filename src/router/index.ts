import { createRouter, createWebHistory } from 'vue-router';
import MoviesCatalog from '../components/MoviesCatalog.vue';

const routes = [
  {
    path: '/',
    name: 'Catalog',
    component: MoviesCatalog,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
