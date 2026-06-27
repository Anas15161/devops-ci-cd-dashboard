const request = require('supertest');
const app = require('../src/app');

describe('Frontend Routes', () => {
  it('should return the dashboard HTML on GET /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('<!DOCTYPE html>');
    expect(res.text).toContain('DevOps Dashboard');
  });
});

describe('API Routes', () => {
  it('should return 200 and status UP on GET /api/health', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('UP');
  });

  it('should return 200 and metrics on GET /api/metrics', async () => {
    const res = await request(app).get('/api/metrics');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('uptime');
    expect(res.body).toHaveProperty('requests');
  });

  it('should return 200 and build info on GET /api/build-info', async () => {
    const res = await request(app).get('/api/build-info');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('version');
    expect(res.body).toHaveProperty('commit');
  });
});
