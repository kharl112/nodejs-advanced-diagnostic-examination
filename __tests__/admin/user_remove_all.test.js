const request = require('supertest');
const app = require("../../src/routes/app");
require("dotenv").config()

const removePayload = { ids: [17, 18] }
const loginPayload = { username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD };

describe('POST /api/admin/users/remove', () => {
    const url = `/api/admin/users/remove`

    it(`remove users with an id of :${removePayload.ids.toString()}`, async () => {
        try {
            const admin = await request(app).post("/api/admin/login").send(loginPayload);
            const response = await request(app).post(url).set({ Authorization: admin.body.token }).send(removePayload);
            const hasRemoved = response.body.message.includes("removed")
            expect(hasRemoved).toBeTruthy();
        } catch (error) {
            expect(error).toHaveProperty('message')
        }
    });
});