'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Activities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INT
      },
      title: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      startDate: {
        type: Sequelize.DATE,
        // allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        // allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT
      },
      phone: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      bookingEmail: {
        type: Sequelize.STRING,
        // allowNull: false,
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
    await queryInterface.dropTable('Activities');
  }
};