'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('productoreposicion', {
      id_reposicion_item: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_reposicion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'reposicion',
          key: 'id_reposicion',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_producto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'productos',
          key: 'id_producto',
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
      },
      unidades: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });


    await queryInterface.addIndex('productoreposicion', ['id_reposicion', 'id_producto'], {
      unique: true,
      name: 'ux_repo_producto',
    });


    await queryInterface.addIndex('productoreposicion', ['id_reposicion'], { name: 'ix_repo_item_id_reposicion' });
    await queryInterface.addIndex('productoreposicion', ['id_producto'], { name: 'ix_repo_item_id_producto' });


    await queryInterface.addConstraint('productoreposicion', {
      fields: ['unidades'],
      type: 'check',
      where: { unidades: { [Sequelize.Op.gt]: 0 } },
      name: 'ck_repo_item_unidades_gt_0',
    });
  },

  async down (queryInterface) {
    await queryInterface.removeConstraint('productoreposicion', 'ck_repo_item_unidades_gt_0').catch(()=>{});
    await queryInterface.removeIndex('productoreposicion', 'ix_repo_item_id_producto').catch(()=>{});
    await queryInterface.removeIndex('productoreposicion', 'ix_repo_item_id_reposicion').catch(()=>{});
    await queryInterface.removeIndex('productoreposicion', 'ux_repo_producto').catch(()=>{});
    await queryInterface.dropTable('productoreposicion');
  }
};
