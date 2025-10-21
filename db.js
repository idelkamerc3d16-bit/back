// backend/db.js (MODIFICADO)

require('dotenv').config(); 
const { Sequelize } = require('sequelize'); 

// 💡 Variables de Entorno
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT || 5432; // Aseguramos el puerto 5432 por defecto
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// 1. Verificación básica (mejor no detener la ejecución, solo advertir)
if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
    console.warn("⚠️ ADVERTENCIA: Faltan variables esenciales de la base de datos.");
}

// 2. Construcción de la URL de conexión
const DATABASE_URL = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

// 🚨 DETERMINAR SI LA CONEXIÓN ES LOCAL
// Si el host es 'localhost', '127.0.0.1' o está vacío, asumimos que es local
const isLocalConnection = !DB_HOST || DB_HOST === 'localhost' || DB_HOST === '127.0.0.1';

// 🚨 CONFIGURACIÓN DE SSL DINÁMICA
const sslConfig = isLocalConnection ? false : {
    require: true,
    rejectUnauthorized: false
};

// Crea la INSTANCIA de conexión
const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    logging: false, 

    // Usamos la configuración de SSL/TLS basada en si es conexión local o remota
    dialectOptions: {
        ssl: sslConfig 
    }
});

// Nota: La lógica de autenticación y sincronización
// DEBERÍA estar en index.js antes de app.listen.
sequelize.authenticate()
    .then(() => console.log('✅ Conexión a la DB establecida con éxito.'))
    .catch(err => console.error('❌ No se pudo conectar a la DB. Verifica las variables. Error:', err.message));

module.exports = sequelize;