const request = require('supertest');
const app = require("../../src/routes/app");
require("dotenv").config()

const loginPayload = { username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD };

describe(`GET /api/admin/users/`, () => {
    const url = `/api/admin/users/`

    it('get all users', async () => {
        try {
            expect.assertions(2);
            const admin = await request(app).post("/api/admin/login").send(loginPayload);
            if (!admin.body.token) throw new Error("unauthenticated");

            const response = await request(app).get(url).set({ Authorization: admin.body.token });
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(!!response.body.length).toBeTruthy();
        } catch (error) {
            expect.assertions(1);
            expect(error).toHaveProperty('message')
        }
    });
});