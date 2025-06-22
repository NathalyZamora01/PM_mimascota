import { createRouter, createWebHistory } from 'vue-router';
import AuthPage from '../views/AuthPage.vue'; // La página que contendrá login/registro
import HomePage from '../components/HomePage.vue'; // La página "En Construcción"

const routes = [
  {
    path: '/',
    name: 'login',
    component: AuthPage // La ruta raíz mostrará el componente de autenticación (que por defecto es login)
  },
  {
    path: '/register', // Una ruta específica para el formulario de registro
    name: 'register',
    component: AuthPage // Reutilizamos AuthPage, y la lógica dentro de AuthPage decidirá si mostrar login o registro
  },
  {
    path: '/home', // O '/' si quieres que sea la página de inicio
    name: 'home', // O 'main', 'dashboard', etc.
    component: HomePage // La nueva página de "En Construcción"
  }
  // Puedes añadir más rutas aquí para futuras secciones de tu aplicación (ej. /dashboard, /pets, /profile)
];

const router = createRouter({
  history: createWebHistory(), // Usa el modo historial para URLs limpias (ej. /construction en lugar de /#construction)
  routes,
});

export default router;