// backend/index.js

const express = require('express');
const cors = require('cors'); 
const sequelize = require('./db'); 
const { createUser, getUsers } = require('./controllers/user.controller'); 
require('dotenv').config();

const app = express();

// 🚨 CONFIGURACIÓN CORS CORREGIDA
const allowedOrigins = [
    'http://localhost:5173', // Puerto local de tu frontend (ej. Vite, React)
    'http://localhost:3000',  // Otro puerto común de desarrollo
    // 💡 AÑADE AQUÍ LA URL DE PRODUCCIÓN DE TU FRONTEND cuando la tengas (ej: 'https://mi-frontend-app.onrender.com')
];

const corsOptions = {
    origin: allowedOrigins
};

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