
module.exports = (sequelize, DataTypes) => {
  const ReposicionProducto = sequelize.define('reposicion_items', {
    id_reposicion_item: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_reposicion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'reposicion',
        key: 'id_reposicion'
        },
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { 
        model: 'productos', 
        key: 'id_producto' 
        },

    },
    unidades: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },
  }, {
    tableName: 'productoreposicion',
    timestamps: false,
  });

  return ReposicionProducto;
};
