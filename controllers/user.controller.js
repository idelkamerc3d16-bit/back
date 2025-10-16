// backend/controllers/user.controller.js (FINAL)
const Boo = require('../models/Boo'); 

// Función para crear un nuevo registro
const createUser = async (req, res) => {
  try {
    const { usuario, nombre, apellido } = req.body;
    
    if (!usuario || !nombre || !apellido) {
      return res.status(400).json({ message: 'Usuario, nombre y apellido son requeridos.' });
    }

    const nuevoUsuario = await Boo.create({ usuario, nombre, apellido });

    res.status(201).json(nuevoUsuario);

  } catch (error) {
    console.error('Error al crear usuario:', error);
    
    if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ 
            message: 'El nombre de usuario ya existe. Por favor, elija otro.',
        });
    }

    res.status(500).json({ 
        message: 'Error interno del servidor al crear el usuario.',
        details: error.message
    });
  }
};

// Función para obtener todos los registros
const getUsers = async (req, res) => {
  try {
    const usuarios = await Boo.findAll({
        attributes: ['usuario', 'nombre', 'apellido'], 
        order: [['nombre', 'ASC']]
    });

    res.status(200).json(usuarios);

  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error interno del servidor al consultar usuarios.' });
  }
};

module.exports = {
  createUser,
  getUsers,
};