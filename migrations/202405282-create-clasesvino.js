
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clasesvino', {
      id_clase_vino: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      descripcion: {
        type: Sequelize.STRING(255),
        allowNull: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('clasesvino');
  }
};
