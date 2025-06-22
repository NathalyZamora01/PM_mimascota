<template>
  <div class="register-container">
    <div class="register-header">
      <h2>Regístrate</h2>
    </div>
    <form @submit.prevent="handleRegister" class="register-form">
      <div class="form-group">
        <label for="reg-name">Nombre Completo</label>
        <input
          type="text"
          id="reg-name"
          v-model="name"
          placeholder="Tu nombre"
          required
        />
      </div>
      <div class="form-group">
        <label for="reg-email">Email</label>
        <input
          type="email"
          id="reg-email"
          v-model="email"
          placeholder="Tu correo electrónico"
          required
        />
      </div>
      <div class="form-group">
        <label for="reg-password">Contraseña</label>
        <input
          type="password"
          id="reg-password"
          v-model="password"
          placeholder="Crea tu contraseña"
          required
        />
      </div>
      <div class="form-group">
        <label for="reg-phone">Teléfono (opcional)</label>
        <input
          type="tel"
          id="reg-phone"
          v-model="phone"
          placeholder="Tu número de teléfono"
        />
      </div>
      <button type="submit" class="register-button">Registrarse</button>
    </form>
    <p v-if="message" :class="{ 'success-message': !isError, 'error-message': isError }">
      {{ message }}
    </p>
    <div class="register-footer">
      <p>¿Ya tienes cuenta? <a href="#" @click.prevent="router.push({ name: 'login' })">Inicia sesión</a></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'; // Importar useRouter

const router = useRouter(); // Inicializar router para la navegación

const name = ref('');
const email = ref('');
const password = ref('');
const phone = ref('');
const message = ref('');
const isError = ref(false);

const handleRegister = async () => {
  message.value = '';
  isError.value = false;

  try {
    const response = await axios.post('http://localhost:3000/register', {
      nomb_usua: name.value,
      mail_usua: email.value,
      cont_usua: password.value,
      celu_usua: phone.value
    });

    message.value = response.data.message + ' Ahora puedes iniciar sesión.';
    isError.value = false;
    console.log('Registro exitoso:', response.data);

    // Redirigir a la página de login después de un registro exitoso
    router.push({ name: 'login' });

    // Limpiar formulario
    name.value = '';
    email.value = '';
    password.value = '';
    phone.value = '';

  } catch (error) {
    message.value = error.response?.data?.message || 'Error al conectar con el servidor para el registro.';
    isError.value = true;
    console.error('Error durante el registro:', error);
  }
};
</script>

<style scoped>
/* Mantén todos los estilos del formulario de registro aquí. */
.register-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background-color: white;
  color: black;
  width: 100%;
  box-sizing: border;
}

.register-header {
  text-align: center;
  margin-bottom: 30px;
}

.register-header h2 {
  font-size: 2em;
  margin-bottom: 10px;
}

.register-header p {
  font-size: 1.1em;
  color: #555;
  font-family: 
}

.register-form {
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
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f5f5f5;
  color: black;
}

.register-button {
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.register-button:hover {
  background-color: #333;
}

.register-footer {
  margin-top: 30px;
  text-align: center;
  font-size: 0.9em;
}

.register-footer p {
  margin-bottom: 5px;
}

.register-footer a {
  color: black;
  text-decoration: none;
  font-weight: bold;
}

.register-footer a:hover {
  text-decoration: underline;
}

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