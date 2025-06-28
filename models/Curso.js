// // models/Curso.js
// const { DataTypes } = require('sequelize');
// const sequelize = require('./index');

// const Curso = sequelize.define(
//   'Curso',
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     nombre: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//       unique: true,
//     },
//   },
//   {
//     tableName: 'cursos',
//     timestamps: true, // createdAt / updatedAt
//   }
// );

// module.exports = Curso;
