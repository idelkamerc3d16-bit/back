// backend/models/Boo.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Importamos la instancia de conexión

// Usamos 'Boo' (PascalCase) para la variable y el nombre interno del modelo (convención de Sequelize)
const Boo = sequelize.define('Boo', {
    // ESTOS NOMBRES DEBEN COINCIDIR EXACTAMENTE
   usuario: { 
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        primaryKey: true // <-- OPCIONAL: Define 'usuario' como PK
    },
    nombre: { 
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    apellido: { 
        type: DataTypes.STRING(100),
        allowNull: false,
    }
}, {
    tableName: 'boo', 
    timestamps: false,
    // ¡AÑADIR ESTA LÍNEA ES CLAVE!
    freezeTableName: true, 
    // Indica que Sequelize NO debe esperar una columna 'id'
    hasPrimaryKeys: false 
});

module.exports = Boo;