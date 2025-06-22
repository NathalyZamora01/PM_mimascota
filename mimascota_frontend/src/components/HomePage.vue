<template>
  <div class="Home-page-full">
    <h1>Página en Construcción</h1>
    <p>¡Gracias por iniciar sesión! Estamos trabajando en nuevas funcionalidades.</p>
    <p>Pronto podrás gestionar tus mascotas aquí.</p>
    <button @click="handleLogout">Cerrar Sesión</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'; // Necesitamos useRouter para volver al login

const router = useRouter();

const handleLogout = () => {
  // Aquí es donde, en una aplicación real, eliminarías cualquier token de autenticación
  // guardado en localStorage o sessionStorage para cerrar la sesión.
  // Ejemplo: localStorage.removeItem('userToken');

  router.push({ name: 'login' }); // Redirige a la página de login
};
</script>

<style scoped>
/* Estilos para que esta página ocupe toda la pantalla y esté centrada */
.Home-page-full { /* CAMBIO AQUI: Cambiado de .construction-page-full a .Home-page-full */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Ocupa toda la altura de la ventana */
  width: 100vw; /* Ocupa todo el ancho de la ventana */
  text-align: center;
  background-color: #f0f2f5; /* Un fondo suave */
  color: #333;
}

.Home-page-full h1 { /* CAMBIO AQUI */
  font-size: 3em;
  color: #2c3e50;
  margin-bottom: 20px;
}

.Home-page-full p { /* CAMBIO AQUI */
  font-size: 1.2em;
  color: #555;
  margin-bottom: 10px;
}

.Home-page-full button { /* CAMBIO AQUI */
  background-color: #007bff;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 30px;
  font-size: 1.1em;
  transition: background-color 0.3s ease;
}

.Home-page-full button:hover { /* CAMBIO AQUI */
  background-color: #0056b3;
}
</style>