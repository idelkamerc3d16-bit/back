// backend/index.js (VERSIÓN FINAL Y ARREGLADA)

const express = require('express');
const cors = require('cors'); 
const sequelize = require('./db'); // Importa la instancia de Sequelize
// 🚨 Importa tus funciones del controlador
const { createUser, getUsers } = require('./controllers/user.controller'); 
require('dotenv').config();

const app = express();

// CONFIGURACIÓN CORS (Permite que el frontend se conecte)
const allowedOrigins = [
    'http://localhost:5173', 
    'http://localhost:3000',  
    // 💡 Añade aquí la URL de tu frontend de Render/producción
];

const corsOptions = {
    origin: allowedOrigins
};

const PORT = process.env.PORT || 3001; 

// Middlewares
app.use(cors(corsOptions)); 
app.use(express.json()); 

// 🚨 RUTA DE CONSULTA (GET): /consulta
// Usada para ver todos los datos (GET) tanto localmente como después del despliegue.
app.get('/consulta', getUsers); 


// RUTAS API FUNCIONALES:
// RUTA POST: Para agregar nuevos usuarios/datos.
app.post('/api/users', createUser); 
// 🚨 Se eliminó la ruta de prueba '/' y el GET '/api/users' para usar solo /consulta.


// 🚨 PASO CRÍTICO: CONEXIÓN A DB Y LUEGO INICIO DEL SERVIDOR

sequelize.authenticate()
    .then(() => console.log('✅ Conexión a la DB establecida con éxito.'))
    .then(() => {
        // Sincroniza el modelo con la base de datos (crea la tabla 'boo' si no existe)
        return sequelize.sync(); 
    })
    .then(() => {
        // SOLO iniciamos el servidor si la conexión a la DB fue exitosa
        app.listen(PORT, () => {
            console.log(`Backend escuchando en el puerto ${PORT}`);
            console.log(`Consulta (GET) en ruta: /consulta`);
            console.log(`Creación (POST) en ruta: /api/users`);
        });
    })
    .catch(err => {
        console.error('❌ No se pudo conectar a la DB. El servidor NO iniciará. Error:', err.message);
    });