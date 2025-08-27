'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await queryInterface.sequelize.transaction();
    try {
     
      const existsBy = async (table, where, pkField) =>
        (await queryInterface.rawSelect(table, { where, transaction: t }, pkField)) ?? null;

      const insertIfMissing = async (table, where, data, pkField) => {
        const pk = await existsBy(table, where, pkField);
        if (pk) return pk;
        await queryInterface.bulkInsert(table, [data], { transaction: t });
        return await existsBy(table, where, pkField);
      };

   
      const categorias = [
        { nombre: 'Vinos',     descripcion: 'Productos relacionados con vinos.' },
        { nombre: 'Aceites',   descripcion: 'Aceites de oliva, virgen extra, entre otros.' },
        { nombre: 'Embutidos', descripcion: 'Chorizos, jamones y otros embutidos artesanales.' },
        { nombre: 'Quesos',    descripcion: 'Quesos artesanales y caseros de la zona.' },
        { nombre: 'Miel',      descripcion: 'Mieles artesanales y recogidas en la zona del Moncayo.' },
        { nombre: 'Conservas', descripcion: 'Conservas artesanales' },
      ];

      for (const c of categorias) {
        await insertIfMissing('categoria', { nombre: c.nombre }, c, 'id'); // PK de categoria = id
      }

  
      const clasesVino = [
        { nombre: 'Vino Tinto',  descripcion: 'Vino elaborado principalmente con uvas tintas.' },
        { nombre: 'Vino Blanco', descripcion: 'Vino claro hecho generalmente con uvas blancas.' },
        { nombre: 'Vino Rosado', descripcion: 'Vino con tonos rosados y sabor suave.' },
      ];
      for (const c of clasesVino) {
        await insertIfMissing('clasesvino', { nombre: c.nombre }, c, 'id_clase_vino'); // PK = id_clase_vino
      }

      
      const getCategoriaId  = (nombre) => existsBy('categoria', { nombre }, 'id');
      const getClaseVinoId  = (nombre) => existsBy('clasesvino', { nombre }, 'id_clase_vino');

    
      const productos = [
        { nombre:'Palmeri Navalta', descripcion:'Vino tinto con crianza de 12 meses en barrica de roble frances.', stock:60, stock_minimo:6, categoria:'Vinos', clase:'Vino Tinto' },
        { nombre:'Garnacha Centenaria', descripcion:'Vino tinto hecho con uvas recogidas a mano, con crianza en barrica de roble.', stock:60, stock_minimo:6, categoria:'Vinos', clase:'Vino Tinto' },
        { nombre:'Roman Cepas Viejas', descripcion:'Selección de viñedos antiguos; 18 meses en roble francés', stock:60, stock_minimo:6, categoria:'Vinos', clase:'Vino Tinto' },
        { nombre:'Borsao Bole', descripcion:'Este vino mezcla Garnacha con ~30% Syrah', stock:60, stock_minimo:6, categoria:'Vinos', clase:'Vino Tinto' },
        { nombre:'Solo Tiólico', descripcion:'Moscatel de Alejandría con aromas cítricos y fruta exótica', stock:60, stock_minimo:6, categoria:'Vinos', clase:'Vino Blanco' },
        { nombre:'Coto de Hayas Verdejo', descripcion:'Verdejo vendimiado de madrugada', stock:60, stock_minimo:6, categoria:'Vinos', clase:'Vino Blanco' },
        { nombre:'Solo Centifolia', descripcion:'Rosado de Garnacha, color rosa palo', stock:60, stock_minimo:6, categoria:'Vinos', clase:'Vino Rosado' },
        { nombre:'Rozzulo Rosado', descripcion:'Rosado dulce Garnacha/Merlot', stock:60, stock_minimo:6, categoria:'Vinos', clase:'Vino Rosado' },
        { nombre:'Aceite de Oliva Virgen Extra', descripcion:'Aceite 100% puro, prensado en frío.', stock:100, stock_minimo:20, categoria:'Aceites', clase:null },
        { nombre:'Aceite de Oliva Virgen', descripcion:'Aceite natural con acidez menor al 1%', stock:100, stock_minimo:20, categoria:'Aceites', clase:null },
        { nombre:'Chorizo Ibérico', descripcion:'Embutido tradicional curado.', stock:40, stock_minimo:10, categoria:'Embutidos', clase:null },
        { nombre:'Longaniza Ibérica', descripcion:'Embutido tradicional curado.', stock:40, stock_minimo:10, categoria:'Embutidos', clase:null },
        { nombre:'Butifarra', descripcion:'Embutido tradicional catalán.', stock:40, stock_minimo:10, categoria:'Embutidos', clase:null },
        { nombre:'Queso Acebo del Moncayo', descripcion:'Queso artesanal con leche cruda de cabra/oveja', stock:35, stock_minimo:10, categoria:'Quesos', clase:null },
        { nombre:'Queso Picon de Cuenca', descripcion:'Oveja curado 12 meses, recubierto de pimienta', stock:30, stock_minimo:10, categoria:'Quesos', clase:null },
        { nombre:'Queso Servilleta de Cabra', descripcion:'Curado 6 meses', stock:35, stock_minimo:10, categoria:'Quesos', clase:null },
        { nombre:'Miel de tomillo', descripcion:'Néctar de flores de tomillo', stock:35, stock_minimo:10, categoria:'Miel', clase:null },
        { nombre:'Miel de encina', descripcion:'Néctar de flores de encina', stock:35, stock_minimo:10, categoria:'Miel', clase:null },
        { nombre:'Miel de romero', descripcion:'Néctar de flores de romero', stock:35, stock_minimo:10, categoria:'Miel', clase:null },
      ];

      for (const p of productos) {
        const id_categoria  = await getCategoriaId(p.categoria);
        const id_clase_vino = p.clase ? await getClaseVinoId(p.clase) : null;

        const ya = await existsBy('productos', { nombre: p.nombre }, 'id_producto');
        if (!ya) {
          await queryInterface.bulkInsert('productos', [{
            nombre: p.nombre,
            descripcion: p.descripcion,
            stock: p.stock,
            stock_minimo: p.stock_minimo,
            id_categoria,
            id_clase_vino
          }], { transaction: t });
        }
      }

   
      const salt = await bcrypt.genSalt(10);
      const trabajadores = [
        { nombre:'Carlos', apellido:'Pérez', email:'carlos@example.com', pwd:'password123', telefono:'123456789', direccion:'Calle Falsa 123', puesto:'administrador', fecha_contratacion: new Date('2025-01-01') },
        { nombre:'Lucía',  apellido:'Gómez', email:'lucia@example.com',  pwd:'admin123',   telefono:'987654321', direccion:'Avenida Siempre Viva 742', puesto:'mozo-almacen', fecha_contratacion: new Date('2025-01-02') },
      ];

      for (const u of trabajadores) {
        const ex = await existsBy('trabajador', { email: u.email }, 'id_trabajador');
        if (!ex) {
          const hashed = await bcrypt.hash(u.pwd, salt);
          await queryInterface.bulkInsert('trabajador', [{
            nombre: u.nombre,
            apellido: u.apellido,
            email: u.email,
            secure_password: hashed,
            telefono: u.telefono,
            direccion: u.direccion,
            puesto: u.puesto,
            fecha_contratacion: u.fecha_contratacion,
          }], { transaction: t });
        }
      }

     
      const id_trabajador = await existsBy('trabajador', { email: 'carlos@example.com' }, 'id_trabajador');
      const fechaRepo = new Date('2025-08-27T10:00:00Z'); 

  
      let id_reposicion = await queryInterface.rawSelect('reposicion', {
        where: { id_trabajador, creacion: fechaRepo },
        transaction: t
      }, 'id_reposicion');

      if (!id_reposicion) {
        await queryInterface.bulkInsert('reposicion', [{
          id_trabajador,
          creacion: fechaRepo
        }], { transaction: t });

        id_reposicion = await queryInterface.rawSelect('reposicion', {
          where: { id_trabajador, creacion: fechaRepo },
          transaction: t
        }, 'id_reposicion');
      }

   
      const itemDefs = [
        { nombre: 'Palmeri Navalta', unidades: 10 },
        { nombre: 'Aceite de Oliva Virgen Extra', unidades: 20 },
        { nombre: 'Miel de romero', unidades: 15 },
      ];

      for (const it of itemDefs) {
        const id_producto = await existsBy('productos', { nombre: it.nombre }, 'id_producto');
        if (!id_producto) continue;

        const yaItem = await queryInterface.rawSelect('productoreposicion', {
          where: { id_reposicion, id_producto },
          transaction: t
        }, 'id_reposicion_item');

        if (!yaItem) {
          await queryInterface.bulkInsert('productoreposicion', [{
            id_reposicion,
            id_producto,
            unidades: it.unidades
          }], { transaction: t });
        }
      }

      await t.commit();
    } catch (e) {
      await t.rollback();
      throw e;
    }
  },

  async down (queryInterface) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('productoreposicion', null, { transaction: t });
      await queryInterface.bulkDelete('reposicion', null, { transaction: t });
      await queryInterface.bulkDelete('trabajador', null, { transaction: t });
      await queryInterface.bulkDelete('productos', null, { transaction: t });
      await queryInterface.bulkDelete('clasesvino', null, { transaction: t });
      await queryInterface.bulkDelete('categoria', null, { transaction: t });
      await t.commit();
    } catch (e) {
      await t.rollback();
      throw e;
    }
  }
};

