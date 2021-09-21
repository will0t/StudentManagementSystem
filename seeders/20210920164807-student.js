'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('student', [
        { studentId: 1, email: 'student1@gmail.com', createdAt: new Date(), updatedAt: new Date() },
        { studentId: 2, email: 'student2@gmail.com', createdAt: new Date(), updatedAt: new Date() },
        { studentId: 3, email: 'student3@gmail.com', createdAt: new Date(), updatedAt: new Date() },
        { studentId: 4, email: 'student4@gmail.com', createdAt: new Date(), updatedAt: new Date() },
        { studentId: 5, email: 'student5@gmail.com', createdAt: new Date(), updatedAt: new Date() },
        { studentId: 6, email: 'student6@gmail.com', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('student', null, {});
  }
};
