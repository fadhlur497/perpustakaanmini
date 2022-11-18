'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      code: {
        type: Sequelize.STRING
      },
      publishYear: {
        type: Sequelize.INTEGER
      },
      profileId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Profiles',
          key : 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Books');
  }
};