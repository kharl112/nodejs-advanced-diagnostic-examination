'use strict';

const { generateUsers } = require('../fakers/fake.users');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await generateUsers(10)
    return queryInterface.bulkInsert('Users', users);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
