'use strict';
// npx sequelize-cli seed:generate --name student
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tutorStudent', [
        { tutorId: 1, studentId: 1, createdAt: new Date(), updatedAt: new Date() },
        { tutorId: 1, studentId: 2, createdAt: new Date(), updatedAt: new Date() },
        { tutorId: 2, studentId: 1, createdAt: new Date(), updatedAt: new Date() },
        { tutorId: 3, studentId: 2, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tutorStudent', null, {});
  }
};
