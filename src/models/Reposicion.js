
module.exports = (sequelize, DataTypes) => {
  const Reposicion = sequelize.define('reposicion', {
    id_reposicion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_trabajador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { 
        model: 'trabajador', 
        key: 'id_trabajador' 
        },
    },
    creacion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'reposicion',
    timestamps: false,
  });

  return Reposicion;
};
