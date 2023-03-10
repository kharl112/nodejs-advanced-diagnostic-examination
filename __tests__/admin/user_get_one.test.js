const request = require('supertest');
const app = require("../../src/routes/app");
require("dotenv").config()

const id = "10";
const loginPayload = { username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD };

describe(`GET /api/admin/users/${id}`, () => {
    const url = `/api/admin/users/${id}`

    it(`get all user id of:${id}`, async () => {
        try {
            expect.assertions(10);
            const admin = await request(app).post("/api/admin/login").send(loginPayload);
            if (!admin.body.token) throw new Error("unauthenticated");

            const response = await request(app).get(url).set({ Authorization: admin.body.token });
            if (!response.body.id) throw new Error("user not found");

            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("id");
            expect(response.body.id.toString()).toMatch(id);
            expect(response.body).toHaveProperty("firstName");
            expect(response.body).toHaveProperty("lastName");
            expect(response.body).toHaveProperty("address");
            expect(response.body).toHaveProperty("postCode");
            expect(response.body).toHaveProperty("contactPhoneNumber");
            expect(response.body).toHaveProperty("email");
            expect(response.body).toHaveProperty("username");

        } catch (error) {
            expect.assertions(1);
            expect(error).toHaveProperty('message')
        }
    });
});