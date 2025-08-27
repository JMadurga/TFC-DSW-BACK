
const express = require('express');
const cors = require('cors');
const {connectDB} = require('./config/config'); 
const db = require('./models/Principal');
const authMiddleware = require('./middleware/auth')
const { swaggerUi, swaggerSpec } = require('./swagger/swagger');

const app = express();
const port = process.env.PORT || 3300;

app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/clasevino', authMiddleware, require('./controllers/claseVino'));
app.use('/productos', authMiddleware, require('./controllers/productos'));
app.use('/trabajadores', authMiddleware, require('./controllers/trabajadores'));
app.use('/categoria', authMiddleware , require('./controllers/categoria'));
app.use('/reposiciones', authMiddleware, require('./controllers/reposicion'));
app.use('/auth', require('./controllers/authController'));




connectDB().then(() => {
  app.listen(port, () => {
    console.log( `Servidor funcionando en http://localhost:${port}`);
  });
}).catch((error) => {
  console.error(' Error al  iniciar el servidor:', error);
});
