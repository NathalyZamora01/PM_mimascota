<template>
  <div class="auth-page-container">
    <div class="auth-form-section">
      <LoginForm v-if="currentView === 'login'" />
      <RegisterForm v-else-if="currentView === 'register'" />
    </div>

    <div class="auth-image-section">
      <img src="../assets/mascota_login.jpg" alt="Mascotas esperando adopción" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';

const route = useRoute();

const currentView = ref('login');

watch(
  () => route.name,
  (newName) => {
    if (newName === 'register') {
      currentView.value = 'register';
    } else if (newName === 'login') {
      currentView.value = 'login';
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.auth-page-container {
  display: flex;
  min-height: 100vh;
  width: 100vw; /* Asegura que ocupe el 100% del viewport */
  overflow: hidden; /* Oculta cualquier scrollbar inesperado en el contenedor principal */
}

.auth-form-section {
  flex: 1; /* Ocupa el espacio disponible */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: white;
  color: black;
  box-sizing: border-box;
  /* Eliminamos min-width para permitir que se encoja */
}

.auth-image-section {
  flex: 1; /* Ocupa el espacio disponible */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  overflow: hidden; /* Importante para que la imagen no se desborde */
  /* Eliminamos min-width para permitir que se encoja */
}

.auth-image-section img {
  max-width: 100%;
  height: auto;
  display: block;
  width: 100%;
  object-fit: cover;
  min-height: 100%; /* Para que cubra la altura de su contenedor flex */
}

/* Media Query para pantallas pequeñas: Apilar verticalmente */
@media (max-width: 768px) { /* Por ejemplo, para pantallas de tablet y móviles */
  .auth-page-container {
    flex-direction: column; /* Cambia a una columna vertical */
    overflow-y: auto; /* Permite scroll vertical si el contenido es demasiado largo */
  }

  .auth-form-section,
  .auth-image-section {
    width: 100%; /* Ocupa todo el ancho */
    min-height: auto; /* Altura automática */
  }

  .auth-image-section {
    min-height: 200px; /* Dale una altura mínima a la imagen en móviles */
    max-height: 300px; /* Y una altura máxima si es necesario */
  }
}
</style>