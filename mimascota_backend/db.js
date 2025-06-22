const { Pool } = require('pg');

// Configuración de la conexión a la base de datos
const pool = new Pool({
    user: process.env.DB_USER || 'adminm',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'mimascota_db',
    password: process.env.DB_PASSWORD || '266453',
    port: process.env.DB_PORT || 5432,
    max: 10, // Número máximo de clientes inactivos en el pool
    idleTimeoutMillis: 30000, // Tiempo de espera antes de que un cliente inactivo se desconecte
    connectionTimeoutMillis: 2000 // Tiempo de espera para establecer una conexión
});

// Función para obtener un cliente del pool
const query = (text, params) => pool.query(text, params);

// Función para probar la conexión
const connect = async () => {
    const client = await pool.connect();
    client.release(); // Libera el cliente inmediatamente después de la prueba
    return true;
};

// Función para cerrar todas las conexiones del pool
const endConnection = () => {
    pool.end(() => {
        console.log('Pool de conexiones a PostgreSQL cerrado.');
    });
};

module.exports = {
    query,
    connect,
    endConnection,
    pool // También exportamos el pool directamente si se necesita para transacciones, etc.
};