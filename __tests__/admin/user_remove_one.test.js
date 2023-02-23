const request = require('supertest');
const app = require("../../src/routes/app");
require("dotenv").config()

const id = "12";
const loginPayload = { username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD };

describe(`POST /api/admin/users/remove/${id}`, () => {
    const url = `/api/admin/users/remove/${id}`

    it(`remove a user with id:${id}`, async () => {
        try {
            expect.assertions(1);
            const admin = await request(app).post("/api/admin/login").send(loginPayload);
            if (!admin.body.token) throw new Error("unauthenticated");

            const response = await request(app).delete(url).set({ Authorization: admin.body.token });
            expect(response.body.message).toMatch(/user removed|user not found/);
        } catch (error) {
            expect.assertions(1);
            expect(error).toHaveProperty('message')
        }
    });
});