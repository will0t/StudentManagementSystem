const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const constant = require('../config/constant.json');

//migration creates table, models create ORM objects
module.exports = (db) => {

  class Tutor extends Model {}
  Tutor.init({
    tutorId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: Sequelize.STRING, allowNull: false },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  }, {
    sequelize: db,
    freezeTableName: true,
    modelName: 'tutor',
    tableName: 'tutor'
  });

  class Student extends Model {}
  Student.init({
    studentId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: Sequelize.STRING, allowNull: false },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  }, {
    sequelize: db,
    freezeTableName: true,
    modelName: 'student',
    tableName: 'student'
  });

  class TutorStudent extends Model {}
  TutorStudent.init({
    tutorId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'tutor',
        key: 'tutorId'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    studentId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'student',
        key: 'studentId'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
    }, {
    sequelize: db,
    freezeTableName: true,
    modelName: 'tutorStudent',
    tableName: 'tutorStudent'
  });

  Tutor.belongsToMany(Student, { through: TutorStudent, foreignKey: "tutorId" });
  Student.belongsToMany(Tutor, { through: TutorStudent, foreignKey: "studentId" });

  return {
    db,
    TutorModel: Tutor,
    StudentModel: Student,
    TutorStudentModel: TutorStudent
  }
}
