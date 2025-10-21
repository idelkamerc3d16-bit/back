// Contenido para backend/index.js (FINAL Y AJUSTADO PARA DEPLIEGUE/CONSULTA CLARA)

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
];

const corsOptions = {
    origin: allowedOrigins
};

const PORT = process.env.PORT || 3001; 

// Middlewares
app.use(cors(corsOptions)); 
app.use(express.json()); 

// 🚨 RUTA DE CONSULTA (GET): /consulta
// Esta ruta es la que usarás para ver todos los datos tanto localmente como después del despliegue.
// Reemplaza el antiguo '/api/users' GET.
app.get('/consulta', getUsers); 


// RUTAS API FUNCIONALES:
// Mantienes la ruta POST para agregar datos.
app.post('/api/users', createUser); 
// 🚨 Se elimina la ruta app.get('/api/users', getUsers); para usar solo /consulta
// 🚨 Se elimina la ruta de prueba app.get('/', (req, res) => { ... });


// 🚨 PASO CRÍTICO: CONEXIÓN A DB Y LUEGO INICIO DEL SERVIDOR

sequelize.authenticate()
    .then(() => console.log('✅ Conexión a la DB establecida con éxito.'))
    .then(() => {
        // Sincroniza el modelo con la base de datos (crea la tabla 'boo')
        return sequelize.sync(); 
    })
    .then(() => {
        // SOLO iniciamos el servidor si la conexión a la DB fue exitosa
        app.listen(PORT, () => {
            console.log(`Backend escuchando en el puerto ${PORT}`);
            // 💡 Notificación para la ruta de consulta
            console.log(`Consulta (GET) y Despliegue en ruta: /consulta`);
            console.log(`Creación (POST) en ruta: /api/users`);
        });
    })
    .catch(err => {
        console.error('❌ No se pudo conectar a la DB. El servidor NO iniciará. Error:', err.message);
    });