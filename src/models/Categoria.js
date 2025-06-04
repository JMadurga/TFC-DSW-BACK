
module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define('categoria', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
      },
    }, {
      tableName: 'categoria',
      timestamps: false,
    });
  
    return Categoria;
  };
  