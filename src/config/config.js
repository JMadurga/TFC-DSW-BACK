
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,    
  process.env.DB_USER,  
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mssql',
    port: process.env.DB_PORT || 1433,
    logging: false, 
  }
);



const connectDB = async (retries = 10, delay = 5000) => {
  while (retries > 0) {
    try {
      await sequelize.authenticate();
      console.log(' Conexión establecida correctamente con SQL Server');
      return;
    } catch (error) {
      console.error(` No se pudo conectar a SQL Server. Reintentando en ${delay / 1000}s... (${retries} intentos restantes)`);
      retries--;
      await new Promise((res) => setTimeout(res, delay));
    }
  }

  console.error(' Error fatal.');
  process.exit(1);
};

module.exports = { sequelize, connectDB };


