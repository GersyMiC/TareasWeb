// routes/tareaRoutes.js
const express = require('express');
const router = express.Router();
const tareaCtrl = require('../controllers/tareaController');

// Ruta para listar todas las tareas
router.get('/', tareaCtrl.list);

// Rutas para crear una nueva tarea
router.get('/add', tareaCtrl.showForm);
router.post('/add', tareaCtrl.add);

// Rutas para editar una tarea existente
router.get('/edit/:id', tareaCtrl.editForm);
router.post('/edit/:id', tareaCtrl.update);

// Ruta para eliminar una tarea
router.post('/delete/:id', tareaCtrl.remove);

module.exports = router;
