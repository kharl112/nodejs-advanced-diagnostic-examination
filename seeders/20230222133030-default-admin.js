'use strict';
const bcrypt = require("bcryptjs");
require("dotenv").config()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // /**
    //  * Add seed commands here.
    //  *
    //  * Example:
    const salt = bcrypt.genSaltSync(10);
    await queryInterface.bulkInsert('Admins', [{
      username: process.env.ADMIN_USERNAME,
      password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, salt),
    }], {});

  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Admins', null, {});
  }
};
