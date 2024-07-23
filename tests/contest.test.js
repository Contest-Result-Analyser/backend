const request = require('supertest');
const app = require('../src/index');

describe('GET /api/contest', () => {
    it('should return contest information', async () => {
        const response = await request(app).get('/api/contest');
        expect(response.status).toBe(200);
        expect(response.body.contest).toBe('Franken category 1');
    });
});
