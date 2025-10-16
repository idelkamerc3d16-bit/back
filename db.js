// backend/db.js (¡DEBE LUCIR ASÍ!)
require('dotenv').config(); 
const { Sequelize } = require('sequelize'); // Importa la clase Sequelize

// Crea la INSTANCIA de conexión, que tiene el método .define
const sequelize = new Sequelize( 
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, // CLAVE: Verificar este valor en .env
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false
    }
);

sequelize.authenticate()
    .then(() => console.log('Conexión a la DB establecida con éxito.'))
    .catch(err => console.error('No se pudo conectar a la DB:', err));

// EXPORTA LA INSTANCIA (la variable 'sequelize' que acabamos de crear)
module.exports = sequelize;