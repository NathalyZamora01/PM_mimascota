// Carga las variables de entorno desde el archivo .env
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db'); // Importa el módulo de conexión a la base de datos
const authRoutes = require('./routes/authRoutes'); // Importa las rutas de autenticación

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para habilitar CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware para parsear el cuerpo de las peticiones en formato JSON
app.use(express.json());

// Prueba de conexión a la base de datos al iniciar el servidor
db.connect()
    .then(() => {
        console.log('Conexión a PostgreSQL establecida con éxito.');
    })
    .catch(err => {
        console.error('Error al conectar a PostgreSQL:', err.message);
        // Opcional: Terminar la aplicación si la DB no está disponible
        // process.exit(1);
    });

// Monta las rutas de autenticación
app.use('/', authRoutes); // Todas las rutas definidas en authRoutes.js se prefijarán con '/' (es decir, no tendrán prefijo)

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API de Mi Mascota funcionando!');
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Manejo de apagado elegante (opcional, para cerrar la conexión a la DB)
process.on('SIGINT', () => {
    console.log('Cerrando servidor...');
    db.endConnection(); // Cierra la conexión a la base de datos
    process.exit(0);
});