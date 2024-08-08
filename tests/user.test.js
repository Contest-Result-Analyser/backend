const request = require('supertest');
const app = require('../src');

describe('GET /api/user', () => {
    it('should return user details', async () => {
        const response = await request(app).get('/api/user');
        expect(response.status).toBe(200);
        expect(response.body.user).toBe('Alice (alice@example.com)');
    });
});
