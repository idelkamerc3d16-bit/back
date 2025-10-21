// backend/index.js

const express = require('express');
const cors = require('cors'); 
const sequelize = require('./db'); 
const { createUser, getUsers } = require('./controllers/user.controller'); 
require('dotenv').config();

const app = express();

// 🚨 CONFIGURACIÓN CORS (Permite que el frontend se conecte)
const allowedOrigins = [
    'http://localhost:5173', // Puerto de desarrollo local (Comprueba si tu frontend usa este)
    'http://localhost:3000',  // Otro puerto común de desarrollo
    // 💡 AÑADE LA URL DE PRODUCCIÓN DE TU FRONTEND AQUÍ cuando esté desplegado
];

const corsOptions = {
    origin: allowedOrigins
};

// Middlewares
app.use(cors(corsOptions)); // ⬅️ Este middleware debe estar activo
// ...
const PORT = process.env.PORT || 3001; 

// Middlewares
app.use(cors(corsOptions)); // ⬅️ Aplicación de CORS
app.use(express.json()); 

// RUTA DE PRUEBA
app.get('/', (req, res) => {
    res.send('Backend vivo y Express funcionando.');
});

// RUTAS API FUNCIONALES:
app.post('/api/users', createUser); 
app.get('/api/users', getUsers);   

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Backend escuchando en el puerto ${PORT}`);
});
// backend/db.js

// ... resto del código (hasta sequelize.authenticate().then()...)

sequelize.authenticate()
    .then(() => console.log('✅ Conexión a la DB establecida con éxito.'))
    .then(() => {
        // 🚨 PASO CRÍTICO: Sincroniza el modelo con la base de datos.
        // Esto crea la tabla 'boo' si no existe.
        return sequelize.sync(); 
    })
    .catch(err => console.error('❌ No se pudo conectar a la DB. Error:', err.message));

module.exports = sequelize;