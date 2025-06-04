const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API La Despensa del Moncayo',
      version: '1.0.0',
      description: 'Documentación de la API con Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3300', 
      },
    ],
  },
  apis: ['../controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
