'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Users', [{
        firstName: 'Kristell',
        lastName: "Lansonneur",
        username: "Admin",
        email:"test@test.fr",
        password:"12345fff",
        role:"admin",
        createdAt:"2022-01-17 04:33:12",
        updatedAt:"2022-01-18 04:33:12"
     }], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
