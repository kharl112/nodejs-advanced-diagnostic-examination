const request = require('supertest');
const app = require("../../src/routes/app");
require("dotenv").config()

const { generateUsers } = require('../../fakers/fake.users');
const loginPayload = { username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD };

describe('POST /api/admin/users/create', () => {
    const url = '/api/admin/users/create'

    it('create a user', async () => {
        try {
            const admin = await request(app).post("/api/admin/login").send(loginPayload);
            const response = await request(app).post(url).set({ Authorization: admin.body.token }).send(generateUsers(1)[0]);
            expect(response.body.message).toMatch('user registered');
        } catch (error) {
            expect(error).toHaveProperty('message')
        }
    });
});