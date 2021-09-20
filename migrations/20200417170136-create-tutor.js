'use strict';
// might need another migration for student
// npx sequelize-cli migration:generate --name create-student
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tutor', {
      tutorId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      email: { type: Sequelize.STRING, allowNull: false },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tutor');
  }
};
