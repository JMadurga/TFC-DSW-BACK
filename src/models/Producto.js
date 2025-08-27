module.exports = (sequelize, DataTypes) => {
    const Producto = sequelize.define('productos', {
      id_producto: {
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
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      stock_minimo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10,
      },
      id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'categoria',
          key: 'id',
        },
      },
      id_clase_vino: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'clasesvino',
          key: 'id_clase_vino',
        },
      },
    }, {
      tableName: 'productos',
      timestamps: false,
    });
  
    return Producto;
  };