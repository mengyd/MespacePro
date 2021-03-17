'use strict';
const UtilService = require('../services/util.service');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const encryptedPassword = await UtilService.encryptPassword('root');
    await queryInterface.bulkInsert('User', [{
      email: 'test@test.com',
      firstname: 'Yidong',
      lastname: 'Meng',
      phone: '0612345678',
      password: encryptedPassword,
      isActive: true,
      role: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('User', null, {});
  }
};
