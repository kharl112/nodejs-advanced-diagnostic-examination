const request = require('supertest');
const app = require("../../src/routes/app");
require("dotenv").config()

describe('POST /api/admin/login', () => {
    const url = "/api/admin/login"
    const loginPayload = { username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD };
    const nonExistentLoginPayload = { username: "wrongadmin", password: "password" };
    const invalidLoginPayload = { username: "admin", password: "wrongpassword" };

    it('responds with JSON', async () => {
        const response = await request(app).post(url).send(loginPayload).set('Content-Type', 'application/json').set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
    });

    it('responds with token:success', async () => {
        const response = await request(app).post(url).send(loginPayload).set('Content-Type', 'application/json').set('Accept', 'application/json');
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('token');
    });

    it('responds with does not exists:error', async () => {
        const response = await request(app).post(url).send(nonExistentLoginPayload).set('Content-Type', 'application/json').set('Accept', 'application/json');
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toMatch("username does not exists")
    });

    it('responds with invalid password:error', async () => {
        const response = await request(app).post(url).send(invalidLoginPayload).set('Content-Type', 'application/json').set('Accept', 'application/json');
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toMatch("invalid password")
    });
});
