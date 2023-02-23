const request = require('supertest');
const app = require("../../src/routes/app");
require("dotenv").config()

const { generateUsers } = require('../../fakers/fake.users');
const loginPayload = { username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD };

describe('POST /api/admin/users/create', () => {
    const url = '/api/admin/users/create'

    it('create a user', async () => {
        try {
            expect.assertions(1);
            const admin = await request(app).post("/api/admin/login").send(loginPayload);
            if (!admin.body.token) throw new Error("unauthenticated");

            const [user] = await generateUsers(1);
            const response = await request(app).post(url).set({ Authorization: admin.body.token }).send(user);

            expect(response.body.message).toMatch('user registered');
        } catch (error) {
            expect.assertions(1);
            expect(error).toHaveProperty('message')
        }
    });
});