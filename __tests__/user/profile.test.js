const request = require('supertest');
const app = require("../../src/routes/app");

const loginPayload = { username: "Cortez3", password: "helloworld" };

describe('GET /api/user/profile', () => {
    const url = "/api/user/profile"

    it('tests user profile', async () => {
        expect.assertions(1);
        try {
            const user = await request(app).post("/api/user/login").send(loginPayload);
            const response = await request(app).get(url).set({ Authorization: user.body.token });

            expect(response.body).toHaveProperty('id');
        } catch (error) {
            expect(error).toHaveProperty('message')
        }
    });
});