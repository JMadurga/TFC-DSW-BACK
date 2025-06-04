// models/Trabajador.js
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const Trabajador = sequelize.define('trabajador', {
      id_trabajador: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      secure_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telefono: {
        type: DataTypes.STRING(20),
      },
      direccion: {
        type: DataTypes.TEXT,
      },
      puesto: {
        type: DataTypes.ENUM('administrador',  'jefe-almacen', 'mozo-almacen'),
        allowNull: false,
        defaultValue: 'mozo-almacen',
      },
      fecha_contratacion: {
        type: DataTypes.DATEONLY,
      },

    }, {
      tableName: 'trabajador',
      timestamps: false,
    });
    
    Trabajador.beforeCreate(async (trabajador) => {
      const salt = await bcrypt.genSalt(10);
      trabajador.secure_password = await bcrypt.hash(trabajador.secure_password, salt);
    });

    // validacion de la contraseña 
    Trabajador.prototype.validPassword = async function (password) {
      return bcrypt.compare(password, this.secure_password);
    };
    
    return Trabajador;
  };
  