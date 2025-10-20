// backend/db.js (¡Usa la URL completa, más confiable!)

require('dotenv').config(); 
const { Sequelize } = require('sequelize'); 

// 💡 CLAVE: Usamos la variable única DATABASE_URL
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    console.error("🔴 ERROR: La variable DATABASE_URL no está definida.");
}

// Crea la INSTANCIA de conexión, usando la URL completa
const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    logging: false, 

    // Mantenemos la configuración SSL/TLS que es esencial
    dialectOptions: {
        ssl: {
            require: true, 
            rejectUnauthorized: false 
        }
    }
});

sequelize.authenticate()
    .then(() => console.log('✅ Conexión a la DB establecida con éxito.'))
    .catch(err => console.error('❌ No se pudo conectar a la DB. Verifica la variable DATABASE_URL. Error:', err.message));

module.exports = sequelize;