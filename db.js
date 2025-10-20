// backend/db.js

require('dotenv').config(); 
const { Sequelize } = require('sequelize'); 
const sequelize = new Sequelize( 
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false,

        dialectOptions: {
            ssl: {
                require: true, 
                // Esto es necesario para evitar errores de certificado en entornos de nube
                rejectUnauthorized: false 
            }
        }
    }
);

sequelize.authenticate()
    .then(() => console.log('✅ Conexión a la DB establecida con éxito.'))
    .catch(err => console.error('❌ No se pudo conectar a la DB. Verifica las variables de entorno de Render. Error:', err.message));

module.exports = sequelize;