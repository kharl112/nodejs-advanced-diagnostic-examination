const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");

const createUserFactory = () => {
    const salt = bcrypt.genSaltSync(10);
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address: faker.address.city(),
        postCode: (Math.random() * (1000 - 9999) + 1000).toString(),
        contactPhoneNumber: faker.phone.number(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: bcrypt.hashSync(faker.word.adjective(), salt),
    }
}

const generateUsers = async (length) => {
    const users = [];
    Array.from({ length }).forEach(() => {
        users.push(createUserFactory());
    });
    return users;
}

module.exports = { generateUsers }