
const {sequelize} = require('../config/config');
const { Sequelize, DataTypes } = require('sequelize');



const ClaseVino = require('./ClaseVino')(sequelize,DataTypes);
const Producto = require('./Producto')(sequelize, DataTypes);
const Trabajador = require('./Trabajador')(sequelize, DataTypes);
const Categoria = require('./Categoria')(sequelize, DataTypes);

Categoria.hasMany(Producto, { foreignKey: 'id_categoria' });
Producto.belongsTo(Categoria, { foreignKey: 'id_categoria' });


ClaseVino.hasMany(Producto, { foreignKey: 'id_clase_vino' });
Producto.belongsTo(ClaseVino, { foreignKey: 'id_clase_vino' });



module.exports = {
  sequelize,
  Categoria,
  ClaseVino,
  Producto,
  Trabajador,
};
