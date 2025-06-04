//migration for trabajador
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trabajador', {
      id_trabajador: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      apellido: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      secure_password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      telefono: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      direccion: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      puesto: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      fecha_contratacion: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('trabajador');
  }
};