// backend/index.js (Versión final lista para Render)

const express = require('express');
const cors = require('cors'); 
const sequelize = require('./db'); // Asumo que './db' es tu objeto de conexión de Sequelize
const { createUser, getUsers } = require('./controllers/user.controller'); 
require('dotenv').config();

const app = express();

// 💡 ÚNICO CAMBIO: Añadir un valor de reserva (e.g., 3001) para desarrollo local
const PORT = process.env.PORT || 3001; 

// Middlewares
app.use(cors()); 
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
    // Cuando esté en Render, verás el puerto que Render asigna (e.g., 10000)
    console.log(`Backend escuchando en el puerto ${PORT}`);
});