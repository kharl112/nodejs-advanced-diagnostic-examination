const request = require('supertest');
const app = require("../../src/routes/app");
require("dotenv").config()

const createPayload = {
    "firstName": "Mikael",
    "lastName": "turillo",
    "address": "North Helenberg",
    "postCode": "839263",
    "contactPhoneNumber": "1-533-3349",
    "email": "nickOR@gmail.com",
    "username": "nickoori",
    "password": "foobarbaz"
};
const loginPayload = { username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD };

describe('POST /api/admin/users/create', () => {
    const url = '/api/admin/users/create'

    it('create a user', async () => {
        expect.assertions(2);
        try {
            const admin = await request(app).post("/api/admin/login").send(loginPayload);
            const response = await request(app).post(url).set({ Authorization: admin.body.token }).send(createPayload);
            expect(response.body.message).toMatch('user registered');
        } catch (error) {
            expect(error).toHaveProperty('message')
        }
    });
});