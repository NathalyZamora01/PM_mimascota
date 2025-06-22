const pool = require('../db'); // Asegúrate que este archivo db.js existe y configura tu pool de conexión a PostgreSQL
const bcrypt = require('bcrypt'); // Necesitas tener bcrypt instalado (npm install bcrypt)

// Función de registro de usuario
const registerUser = async (req, res) => {
    // Extrae los datos del cuerpo de la solicitud
    const { nomb_usua, mail_usua, cont_usua, celu_usua } = req.body;

    // Validación básica de campos requeridos
    if (!nomb_usua || !mail_usua || !cont_usua) {
        return res.status(400).json({ message: 'Nombre, correo y contraseña son requeridos para el registro.' });
    }

    try {
        // 1. Verificar si el correo ya existe en la base de datos
        const userExists = await pool.query('SELECT * FROM usuarios WHERE mail_usua = $1', [mail_usua]);
        if (userExists.rows.length > 0) {
            return res.status(409).json({ message: 'El correo electrónico ya está registrado. Intenta con otro o inicia sesión.' });
        }

        // 2. Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(cont_usua, 10); // 10 es el costo del hash (número de rondas de salting)

        // 3. Insertar el nuevo usuario en la base de datos
        // NOTA: idxx_usua es SERIAL (autoincremental), por lo que no se incluye en el INSERT
        // admn_usua se establece a FALSE por defecto para nuevos registros
        const newUser = await pool.query(
            'INSERT INTO usuarios (nomb_usua, mail_usua, cont_usua, celu_usua, admn_usua) VALUES ($1, $2, $3, $4, FALSE) RETURNING idxx_usua, nomb_usua, mail_usua',
            [nomb_usua, mail_usua, hashedPassword, celu_usua]
        );

        // 4. Devolver una respuesta exitosa con los datos del usuario (sin la contraseña hasheada)
        res.status(201).json({
            message: 'Usuario registrado exitosamente. Ahora puedes iniciar sesión.',
            user: {
                id: newUser.rows[0].idxx_usua, // Corregido: usa idxx_usua como el nombre de la columna de ID
                nombre: newUser.rows[0].nomb_usua,
                email: newUser.rows[0].mail_usua
            }
        });

    } catch (error) {
        // Manejo de errores en caso de problemas con la base de datos o el hasheo
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor al intentar registrar el usuario.' });
    }
};

// Función de inicio de sesión de usuario
const loginUser = async (req, res) => {
    // Extrae el correo y la contraseña del cuerpo de la solicitud
    const { mail_usua, cont_usua } = req.body;

    // Validación básica de campos requeridos
    if (!mail_usua || !cont_usua) {
        return res.status(400).json({ message: 'Correo y contraseña son requeridos para iniciar sesión.' });
    }

    try {
        // 1. Buscar al usuario por su correo electrónico
        const result = await pool.query('SELECT * FROM usuarios WHERE mail_usua = $1', [mail_usua]);
        const user = result.rows[0];

        // Si no se encuentra el usuario, devuelve un error
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas.' }); // Mensaje genérico por seguridad
        }

        // 2. Comparar la contraseña proporcionada con la contraseña hasheada almacenada
        const isMatch = await bcrypt.compare(cont_usua, user.cont_usua);

        // Si las contraseñas no coinciden, devuelve un error
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas.' }); // Mensaje genérico por seguridad
        }

        // 3. Si las credenciales son correctas, devuelve una respuesta exitosa
        // En una aplicación real, aquí también se generaría y enviaría un token JWT
        res.status(200).json({
            message: 'Login exitoso',
            user: {
                id: user.idxx_usua, // Corregido: usa idxx_usua como el nombre de la columna de ID
                nombre: user.nomb_usua,
                email: user.mail_usua,
                admin: user.admn_usua // Incluir si es un usuario administrador
            }
        });

    } catch (error) {
        // Manejo de errores en caso de problemas con la base de datos o el proceso de login
        console.error('Error en el proceso de login:', error);
        res.status(500).json({ message: 'Error interno del servidor al iniciar sesión.' });
    }
};

// Exportar las funciones para que puedan ser utilizadas por las rutas
module.exports = {
    registerUser,
    loginUser
};