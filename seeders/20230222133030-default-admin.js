'use strict';
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // /**
    //  * Add seed commands here.
    //  *
    //  * Example:
    const salt = bcrypt.genSaltSync(10);
    await queryInterface.bulkInsert('Admins', [{
      username: 'admin',
      password: bcrypt.hashSync("password", salt),
    }], {});

  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Admins', null, {});
  }
};
