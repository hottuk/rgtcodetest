import { createRouter, createWebHistory } from 'vue-router';
import App from '../views/HomeView.vue';
import BookDetail from '../views/BookDetail.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App,
  },
  {
    path: '/book/:id',
    name: 'book-detail',
    component: BookDetail,
    props: true, // 라우터 파라미터를 props로 전달
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
