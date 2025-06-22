<template>
  <div class="login-container">
    <div class="login-header">
      <h2>Inicio de Sesión</h2>
      
    </div>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Tu correo electrónico"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Tu contraseña"
          required
        />
      </div>
      <button type="submit" class="login-button">Iniciar Sesión</button>
    </form>
    <p v-if="message" :class="{ 'success-message': !isError, 'error-message': isError }">
      {{ message }}
    </p>
    <div class="login-footer">
      <p>¿Olvidaste tu contraseña?</p>
      <p>¿No tienes cuenta? <a href="#" @click.prevent="router.push({ name: 'register' })">Regístrate</a></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'; // Importar useRouter

const router = useRouter(); // Inicializar router para la navegación

const email = ref('');
const password = ref('');
const message = ref('');
const isError = ref(false);

const handleLogin = async () => {
  message.value = '';
  isError.value = false;

  try {
    const response = await axios.post('http://localhost:3000/login', {
      mail_usua: email.value,
      cont_usua: password.value
    });

    message.value = response.data.message;
    isError.value = false;
    console.log('Login exitoso:', response.data);

    // Redirigir a la página de construcción al éxito del login
    router.push({ name: 'home' });

    // Limpiar formulario (opcional, ya que se navega a otra página)
    email.value = '';
    password.value = '';

  } catch (error) {
    message.value = error.response?.data?.message || 'Error al conectar con el servidor para el login.';
    isError.value = true;
    console.error('Error durante el login:', error);
  }
};
</script>

<style scoped>
/* Mantén todos los estilos del formulario de login aquí. */
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background-color: white;
  color: black;
  width: 100%;
  box-sizing: border-box;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h2 {
  font-size: 2em;
  margin-bottom: 10px;
  color: black;
}

.login-header p {
  font-size: 1.1em;
  color: #555;
}

.login-form {
  width: 100%;
  max-width: 350px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f5f5f5;
  color: black;
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.login-button:hover {
  background-color: #333;
}

.login-footer {
  margin-top: 30px;
  text-align: center;
  font-size: 0.9em;
}

.login-footer p {
  margin-bottom: 5px;
}

.login-footer a {
  color: black;
  text-decoration: none;
  font-weight: bold;
}

.login-footer a:hover {
  text-decoration: underline;
}

/* Mensajes de feedback (con recuadro) - Estos también podrían ser globales en style.css si se usan mucho */
.success-message,
.error-message {
  margin-top: 15px;
  padding: 10px 15px;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 350px;
  box-sizing: border-box;
}

.success-message {
  color: #155724;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
}

.error-message {
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
}
</style>