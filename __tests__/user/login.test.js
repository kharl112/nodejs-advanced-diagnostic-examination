const request = require('supertest');
const app = require("../../src/routes/app");

const loginPayload = { username: "Cortez3112", password: "foobarbaz" };
describe('POST /api/user/login', () => {
    const url = "/api/user/login"

    it('tests login for user', async () => {
        expect.assertions(1);
        try {
            const response = await request(app).post(url).send(loginPayload);
            if (response.statusCode === 200) expect(response.body).toHaveProperty('token');
            if (response.statusCode === 401) expect(response.body.message).toMatch(/username does not exists|invalid password/);
        } catch (error) {
            expect(error).toHaveProperty('message')
        }
    });
});




