const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");

const createUserFactory = () => {
    const salt = bcrypt.genSaltSync(10);
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address: faker.address.city(),
        postCode: Math.floor((Math.random() * (999999 - 100000 + 1) + 100000)).toString(),
        contactPhoneNumber: faker.phone.number().slice(0, 12),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: bcrypt.hashSync(faker.word.adjective() + faker.word.noun(), salt),
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