// backend/db.js

require('dotenv').config(); 
const { Sequelize } = require('sequelize'); 

// CLAVE: Usamos la variable única DATABASE_URL. 
// Render debe tener esta variable configurada en su dashboard.
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    // Esto solo se verá si la variable no está configurada localmente o en Render
    console.error("🔴 ERROR: La variable DATABASE_URL no está definida.");
}

// Crea la INSTANCIA de conexión, usando la URL completa
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
    .catch(err => console.error('❌ No se pudo conectar a la DB. Verifica la variable DATABASE_URL. Error:', err.message));

module.exports = sequelize;