// // models/Tarea.js
// const { DataTypes } = require('sequelize');
// const sequelize = require('./index');

// const Tarea = sequelize.define(
//   'Tarea',
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     titulo: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     descripcion: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//     completada: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: false,
//     },
//     fecha_vencimiento: {
//       type: DataTypes.DATEONLY,
//       allowNull: false,
//     },
//     curso_id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       allowNull: true,
//     },
//   },
//   {
//     tableName: 'tareas',
//     timestamps: true, // createdAt / updatedAt
//   }
// );

// module.exports = Tarea;
