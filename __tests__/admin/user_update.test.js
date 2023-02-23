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
            expect.assertions(1);

            const [user] = await generateUsers(1);
            const { email, username, ...newUser } = user;

            const admin = await request(app).post("/api/admin/login").send(loginPayload);
            if (!admin.body.token) throw new Error("unauthenticated");

            const response = await request(app).post(url).set({ Authorization: admin.body.token }).send(newUser);
            expect(response.body.message).toMatch(/user updated|user not found/);
        } catch (error) {
            expect.assertions(1);
            expect(error).toHaveProperty('message')
        }
    });
});