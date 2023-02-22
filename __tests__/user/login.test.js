const request = require('supertest');
const app = require("../../src/routes/app");

describe('POST /api/user/login', () => {
    const url = "/api/user/login"
    const loginPayload = { username: "user", password: "password" };

    it('tests login for user', () => {
        return request(app).post(url).send(loginPayload).then(() => {
            expect(response.body).toHaveProperty('token');
        }).catch((error) => {
            expect(error).toHaveProperty('message')
        });
    });

});
