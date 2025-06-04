'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Hashear contraseñas manualmente
    const salt = await bcrypt.genSalt(10);
    const hashedPassword1 = await bcrypt.hash('password123', salt);
    const hashedPassword2 = await bcrypt.hash('admin123', salt);

    // Insertar categorías
    await queryInterface.bulkInsert('categoria', [
      { nombre: 'Vinos', descripcion: 'Productos relacionados con vinos.' },
      { nombre: 'Aceites', descripcion: 'Aceites de oliva, virgen extra, entre otros.' },
      { nombre: 'Embutidos', descripcion: 'Chorizos, jamones y otros embutidos artesanales.' },
      { nombre: 'Quesos', descripcion: 'Quesos artesanales y caseros de la zona.' },
      { nombre: 'Miel', descripcion: 'Mieles artesanales y recogidas en la zona del Moncayo.' },
      { nombre: 'Conservas', descripcion: 'Conservas artesanales' }
    ], {});

    // Insertar clases de vino
    await queryInterface.bulkInsert('clasesvino', [
      { nombre: 'Vino Tinto', descripcion: 'Vino elaborado principalmente con uvas tintas.' },
      { nombre: 'Vino Blanco', descripcion: 'Vino claro hecho generalmente con uvas blancas.' },
      { nombre: 'Vino Rosado', descripcion: 'Vino con tonos rosados y sabor suave.' }
    ], {});

    // Insertar productos
    await queryInterface.bulkInsert('productos', [
      {
        nombre: 'Palmeri Navalta',
        descripcion: 'Vino tinto con crianza de 12 meses en barrica de roble frances.',
        stock: 60,
        stock_minimo: 6,
        id_categoria: 1,
        id_clase_vino: 1
      },
      {
        nombre: 'Garnacha Centenaria',
        descripcion: 'Vino tinto hecho con uvas recogidas a mano, con crianza en barrica de roble.',
        stock: 60,
        stock_minimo: 6,
        id_categoria: 1,
        id_clase_vino: 1
      },
      {
        nombre: 'Roman Cepas Viejas',
        descripcion: 'Selección de los viñedos de Garnacha más antiguos de la familia (60-70 años). Cultivados a 700m de altitud. Elaborado durante 18 meses en barricas de roble francés',
        stock: 60,
        stock_minimo: 6,
        id_categoria: 1,
        id_clase_vino: 1
      }, 
      {
        nombre: 'Borsao Bole',
        descripcion: 'Este Vino es la ultima creacion de la bodega. Creado a partir de una nueva variedad de garnacha mezclada con un 30% de variedad syrah',
        stock: 60,
        stock_minimo: 6,
        id_categoria: 1,
        id_clase_vino: 1
      },     
      {
        nombre: 'Solo Tiólico',
        descripcion: 'Vino Blanco elaborado apartir de la variedad Moscatel de Alejandria. El cual le aporta diferentes aromas a citricos y frutas exoticas como el pomelo',
        stock: 60,
        stock_minimo: 6,
        id_categoria: 1,
        id_clase_vino: 2
      },
      {
        nombre: 'Coto de Hayas Verdejo',
        descripcion: 'Vino Blanco elaborado apartir de la variedad Verdejo. El cual se vendimia de madrugada para mantener el fruto lo ams fresco posible',
        stock: 60,
        stock_minimo: 6,
        id_categoria: 1,
        id_clase_vino: 2
      },
      {
        nombre: 'Solo Centifolia',
        descripcion: 'Solo Centifolia Rosado es un vino de color rosa palo y litchi muy pálico, con tonalidades salmón, muy atractivo a primera vista. El cual proviene de variedad Garnacha',
        stock: 60,
        stock_minimo: 6,
        id_categoria: 1,
        id_clase_vino: 3
      },
      {
        nombre: 'Rozzulo Rosado',
        descripcion: 'Vino Rosa dulce, el cual se elabora a partir de la variedades Garnacha y Merlot. Con aromas frutales',
        stock: 60,
        stock_minimo: 6,
        id_categoria: 1,
        id_clase_vino: 3
      },
      {
        nombre: 'Aceite de Oliva Virgen Extra',
        descripcion: 'Aceite 100% puro, prensado en frío.',
        stock: 100,
        stock_minimo: 20,
        id_categoria: 2,
        id_clase_vino: null
      },
      {
        nombre: 'Aceite de Oliva Virgen ',
        descripcion: 'Aceite natural con acidez menor al 1%',
        stock: 100,
        stock_minimo: 20,
        id_categoria: 2,
        id_clase_vino: null
      },
      {
        nombre: 'Chorizo Ibérico',
        descripcion: 'Embutido tradicional curado.',
        stock: 40,
        stock_minimo: 10,
        id_categoria: 3,
        id_clase_vino: null
      },
      {
        nombre: 'Longaniza Ibérica',
        descripcion: 'Embutido tradicional curado.',
        stock: 40,
        stock_minimo: 10,
        id_categoria: 3,
        id_clase_vino: null
      },
      {
        nombre: 'Butifarra',
        descripcion: 'Embutido tradicional catalán.',
        stock: 40,
        stock_minimo: 10,
        id_categoria: 3,
        id_clase_vino: null
      },

      {
        nombre: 'Queso Acebo del Moncayo',
        descripcion: 'Queso elaborados artesanalmente con leche cruda de cabra u oveja',
        stock: 35,
        stock_minimo: 10,
        id_categoria: 4,
        id_clase_vino: null
      },
      {
        nombre: 'Queso Picon de Cuenca',
        descripcion: 'Queso de oveja curado durante un año y recubierto de pimienta',
        stock: 30,
        stock_minimo: 10,
        id_categoria: 4,
        id_clase_vino: null
      }, 
      {
        nombre: 'Queso Servilleta de Cabra',
        descripcion: 'Queso elaborado con leche de cabra y curado durante 6 meses',
        stock: 35,
        stock_minimo: 10,
        id_categoria: 4,
        id_clase_vino: null
      },
      {
        nombre: 'Miel de tomillo',
        descripcion: 'La miel de Tomillo Apiambel está compuesta por el néctar extraído de las flores de la planta del Tomillo de la zona del Moncayo',
        stock: 35,
        stock_minimo: 10,
        id_categoria: 5,
        id_clase_vino: null
      },
      {
        nombre: 'Miel de encina',
        descripcion: 'La miel de Tomillo Apiambel está compuesta por el néctar extraído de las flores de la encina de la zona del Moncayo',
        stock: 35,
        stock_minimo: 10,
        id_categoria: 5,
        id_clase_vino: null
      },
      {
        nombre: 'Miel de romero',
        descripcion: 'La miel de Tomillo Apiambel está compuesta por el néctar extraído de las flores de la planta del romero de la zona del Moncayo',
        stock: 35,
        stock_minimo: 10,
        id_categoria: 5,
        id_clase_vino: null
      },  
    ], {});

    // Insertar trabajadores
    await queryInterface.bulkInsert('trabajador', [
      {
       
        nombre: 'Carlos',
        apellido: 'Pérez',
        email: 'carlos@example.com',
        secure_password: hashedPassword1,
        telefono: '123456789',
        direccion: 'Calle Falsa 123',
        puesto: 'administrador',
        fecha_contratacion: new Date()
      },
      {
        nombre: 'Lucía',
        apellido: 'Gómez',
        email: 'lucia@example.com',
        secure_password: hashedPassword2,
        telefono: '987654321',
        direccion: 'Avenida Siempre Viva 742',
        puesto: 'mozo-almacen',
        fecha_contratacion: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('trabajador', null, {});
    await queryInterface.bulkDelete('productos', null, {});
    await queryInterface.bulkDelete('clasesvino', null, {});
    await queryInterface.bulkDelete('categoria', null, {});
  }
};
