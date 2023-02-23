const request = require('supertest');
const app = require("../../src/routes/app");
require("dotenv").config()

const { generateUsers } = require('../../fakers/fake.users');
const id = "16";
const loginPayload = { username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD };

describe('POST /api/admin/users/update', () => {
    const url = `/api/admin/users/update/${id}`

    it(`update a user with id:${id}`, async () => {
        try {
            const [user] = await generateUsers(1);

            delete user.email;
            delete user.username;

            const admin = await request(app).post("/api/admin/login").send(loginPayload);
            const response = await request(app).post(url).set({ Authorization: admin.body.token }).send(user);
            expect(response.body.message).toMatch('user updated');
        } catch (error) {
            expect(error).toHaveProperty('message')
        }
    });
});