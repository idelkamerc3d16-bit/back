// backend/db.js

require('dotenv').config(); 
const { Sequelize } = require('sequelize'); 

// 💡 CLAVE: Construimos la URL de conexión completa a partir de las 5 variables.
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// 1. Verificación básica para asegurar que las variables están definidas
if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
    console.error("🔴 ERROR: Faltan variables esenciales de la base de datos.");
    // Esto evita que intentemos construir una URL incompleta
}

// 2. Construcción de la URL de conexión
const DATABASE_URL = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

// Crea la INSTANCIA de conexión, usando la URL completa construida
const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    logging: false, 

    // Mantenemos la configuración SSL/TLS esencial para la conexión remota
    dialectOptions: {
        ssl: {
            require: true, 
            rejectUnauthorized: false 
        }
    }
});

sequelize.authenticate()
    .then(() => console.log('✅ Conexión a la DB establecida con éxito.'))
    .catch(err => console.error('❌ No se pudo conectar a la DB. Verifica las 5 variables de entorno de Render. Error:', err.message));

module.exports = sequelize;