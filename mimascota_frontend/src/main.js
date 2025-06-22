import { createApp } from 'vue';
/*import './style.css'; */// Si tienes un archivo CSS global para estilos generales
import App from './App.vue';
import router from './router'; // Importa la configuración de tu router

const app = createApp(App);

app.use(router); // Le decimos a Vue que use Vue Router
app.mount('#app');