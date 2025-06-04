
module.exports = (sequelize, DataTypes) => {
    const ClaseVino = sequelize.define('clasesvino', {
      id_clase_vino: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
      },
    }, {
      tableName: 'clasesvino',
      timestamps: false,
    });
  
    return ClaseVino;
  };
  