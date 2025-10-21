// Contenido para backend/index.js (FINAL)

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

// RUTA DE PRUEBA
app.get('/', (req, res) => {
    res.send('Backend vivo y Express funcionando.');
});

// RUTAS API FUNCIONALES:
app.post('/api/users', createUser); 
app.get('/api/users', getUsers);   

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
        });
    })
    .catch(err => {
        console.error('❌ No se pudo conectar a la DB. El servidor NO iniciará. Error:', err.message);
    });