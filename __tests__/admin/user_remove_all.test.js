const request = require('supertest');
const app = require("../../src/routes/app");
require("dotenv").config()

const removePayload = { ids: [4, 0, 3] }
const loginPayload = { username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD };

describe('POST /api/admin/users/remove', () => {
    const url = `/api/admin/users/remove`

    it(`remove users with an id of :${removePayload.ids ? removePayload.ids.toString() : null}`, async () => {
        try {
            expect.assertions(1);
            const admin = await request(app).post("/api/admin/login").send(loginPayload);
            if (!admin.body.token) throw new Error("unauthenticated");

            const response = await request(app).post(url).set({ Authorization: admin.body.token }).send(removePayload);
            const hasRemoved = response.body.message.includes("removed")
            expect(hasRemoved).toBeTruthy();
        } catch (error) {
            expect.assertions(1);
            expect(error).toHaveProperty('message')
        }
    });
});