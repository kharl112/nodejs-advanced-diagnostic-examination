const request = require('supertest');
const app = require("../../src/routes/app");

const loginPayload = { username: "Cortez3", password: "helloworld" };
describe('POST /api/user/login', () => {
    const url = "/api/user/login"

    it('tests login for user', async () => {
        expect.assertions(1);
        try {
            const response = await request(app).post(url).send(loginPayload);
            expect(response.body).toHaveProperty('token');
        } catch (error) {
            expect(error).toHaveProperty('message')
        }
    });
});




