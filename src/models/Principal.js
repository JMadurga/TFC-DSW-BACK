
const { sequelize } = require('../config/config');
const { DataTypes } = require('sequelize');

const ClaseVino  = require('./ClaseVino')(sequelize, DataTypes);
const Producto   = require('./Producto')(sequelize, DataTypes);
const Trabajador = require('./Trabajador')(sequelize, DataTypes);
const Categoria  = require('./Categoria')(sequelize, DataTypes);
const Reposicion = require('./Reposicion')(sequelize, DataTypes);
const ReposicionProducto = require('./ReposicionProducto')(sequelize, DataTypes);


Categoria.hasMany(Producto, { foreignKey: 'id_categoria', as: 'productos' });
Producto.belongsTo(Categoria, { foreignKey: 'id_categoria', as: 'categoria' });

ClaseVino.hasMany(Producto, { foreignKey: 'id_clase_vino', as: 'productos' });
Producto.belongsTo(ClaseVino, { foreignKey: 'id_clase_vino', as: 'claseVino' });


Trabajador.hasMany(Reposicion, { foreignKey: 'id_trabajador', as: 'reposiciones' });
Reposicion.belongsTo(Trabajador, { foreignKey: 'id_trabajador', as: 'trabajador' });


Reposicion.hasMany(ReposicionProducto, { foreignKey: 'id_reposicion', as: 'items' });
ReposicionProducto.belongsTo(Reposicion, { foreignKey: 'id_reposicion', as: 'reposicion' });

Producto.hasMany(ReposicionProducto, { foreignKey: 'id_producto', as: 'reposicionItems' });
ReposicionProducto.belongsTo(Producto, { foreignKey: 'id_producto', as: 'producto' });


Reposicion.belongsToMany(Producto, {
  through: ReposicionProducto,
  foreignKey: 'id_reposicion',
  otherKey: 'id_producto',
  as: 'productos',
});
Producto.belongsToMany(Reposicion, {
  through: ReposicionProducto,
  foreignKey: 'id_producto',
  otherKey: 'id_reposicion',
  as: 'reposiciones',
});

module.exports = {
  sequelize,
  Categoria,
  ClaseVino,
  Producto,
  Trabajador,
  Reposicion,
  ReposicionProducto,
};
