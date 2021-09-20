'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tutorStudent', {
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tutorStudent');
  }
};
