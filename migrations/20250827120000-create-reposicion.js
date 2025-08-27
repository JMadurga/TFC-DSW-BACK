'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('reposicion', {
      id_reposicion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_trabajador: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'trabajador',          
          key: 'id_trabajador',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      creacion: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,    
      },
    });

    // Índices útiles
    await queryInterface.addIndex('reposicion', ['id_trabajador'], {
      name: 'ix_reposicion_id_trabajador',
    });
    await queryInterface.addIndex('reposicion', ['creacion'], {
      name: 'ix_reposicion_creacion',
    });
  },

  async down (queryInterface) {
    await queryInterface.removeIndex('reposicion', 'ix_reposicion_creacion').catch(()=>{});
    await queryInterface.removeIndex('reposicion', 'ix_reposicion_id_trabajador').catch(()=>{});
    await queryInterface.dropTable('reposicion');
  }
};
