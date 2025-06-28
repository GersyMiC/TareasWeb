// app.js
require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
//const sequelize = require('./models/index');
const { sequelize } = require('./models');
const tareaRoutes = require('./routes/tareaRoutes');

const app = express();

// ----- Motor de vistas y layouts -----
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// ----- Middleware -----
app.use(express.urlencoded({ extended: true })); // para leer datos de formularios
app.use(express.static('public'));               // para servir CSS/JS/images

// ----- Rutas -----
app.use('/', tareaRoutes);

// ----- Sincronizar modelos y arrancar servidor -----
sequelize.sync()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor arrancado en http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });
