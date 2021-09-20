'use strict';
// npx sequelize-cli seed:generate --name student
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tutor', [
        { tutorId: 1, email: 'tutor1@gmail.com', createdAt: new Date(), updatedAt: new Date() },
        { tutorId: 2, email: 'tutor2@gmail.com', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tutor', null, {});
  }
};
