const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Importa el controlador de autenticación

// Ruta para el registro de un nuevo usuario
router.post('/register', authController.registerUser);

// Ruta para el inicio de sesión de un usuario
router.post('/login', authController.loginUser);

module.exports = router;