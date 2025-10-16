// backend/index.js

const express = require('express');
const cors = require('cors'); 
const sequelize = require('./db'); 
const { createUser, getUsers } = require('./controllers/user.controller'); 

const app = express();
const port = 3001; 

// Middlewares
app.use(cors()); // Permite a Vue comunicarse con este backend
app.use(express.json()); // Necesario para leer req.body en formato JSON

// RUTA DE PRUEBA (ruta raíz para verificar que el servidor esté vivo)
app.get('/', (req, res) => {
    // Si llegas aquí, Express está vivo.
    res.send('Base de datos conectada');
});

// RUTAS API FUNCIONALES:

// POST /api/users: Crea un nuevo usuario en la tabla 'boo'
app.post('/api/users', createUser); 

// GET /api/users: Obtiene todos los usuarios de la tabla 'boo'
app.get('/api/users', getUsers);   

// Iniciar servidor
app.listen(port, () => {
    console.log(`Backend escuchando en http://localhost:${port}`);
    
    // El resultado de la conexión a DB se mostrará en la consola desde db.js
});