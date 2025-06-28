// controllers/tareaController.js
const { Op } = require('sequelize');
const { Tarea, Curso } = require('../models');

exports.list = async (req, res) => {
  try {
    const filter = req.query.filter;   // 'pendientes', 'completadas', 'vencidas' o undefined
    const where = {};

    if (filter === 'pendientes') {
      where.completada = false;
    } else if (filter === 'completadas') {
      where.completada = true;
    } else if (filter === 'vencidas') {
      where.completada = false;
      where.fecha_vencimiento = { [Op.lt]: new Date() };
    }

    const tareas = await Tarea.findAll({
      where,
      include: [{ model: Curso, as: 'curso' }],
      order: [['fecha_vencimiento', 'ASC']],
    });

    res.render('index', { tareas, filter });
  } catch (error) {
    console.error('Error al listar tareas:', error);
    res.status(500).send('Error al obtener tareas');
  }
};

exports.showForm = async (req, res) => {
  try {
    // Cargar lista de cursos para el <select> del formulario
    const cursos = await Curso.findAll({ order: [['nombre', 'ASC']] });
    res.render('form', {
      tarea: {},         // objeto vacío para el formulario de creación
      cursos,
      action: '/add',    // ruta a la que se enviará el POST
    });
  } catch (error) {
    console.error('Error al mostrar formulario:', error);
    res.status(500).send('Error al cargar formulario');
  }
};

exports.add = async (req, res) => {
  try {
    const { titulo, descripcion, fecha_vencimiento, curso_id } = req.body;
    await Tarea.create({
      titulo,
      descripcion,
      fecha_vencimiento,
      completada: false,
      curso_id: curso_id || null,
    });
    res.redirect('/');
  } catch (error) {
    console.error('Error al crear tarea:', error);
    res.status(500).send('Error al crear tarea');
  }
};

exports.editForm = async (req, res) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (!tarea) return res.status(404).send('Tarea no encontrada');

    const cursos = await Curso.findAll({ order: [['nombre', 'ASC']] });
    res.render('form', {
      tarea,
      cursos,
      action: `/edit/${tarea.id}`,  // ruta para el POST de actualización
    });
  } catch (error) {
    console.error('Error al cargar formulario de edición:', error);
    res.status(500).send('Error al cargar formulario');
  }
};

exports.update = async (req, res) => {
  try {
    const { titulo, descripcion, fecha_vencimiento, curso_id, completada } = req.body;
    await Tarea.update(
      {
        titulo,
        descripcion,
        fecha_vencimiento,
        curso_id: curso_id || null,
        completada: completada === 'on'  // checkbox devuelve "on" si está marcado
      },
      { where: { id: req.params.id } }
    );
    res.redirect('/');
  } catch (error) {
    console.error('Error al actualizar tarea:', error);
    res.status(500).send('Error al actualizar tarea');
  }
};

exports.remove = async (req, res) => {
  try {
    await Tarea.destroy({ where: { id: req.params.id } });
    res.redirect('/');
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    res.status(500).send('Error al eliminar tarea');
  }
};
