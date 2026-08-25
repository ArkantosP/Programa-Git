import request from 'supertest';
import { createApp } from '../app.js';

describe('Backend API Tests', () => {
  const app = createApp();

  describe('GET /health', () => {
    it('should return status ok', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('status', 'ok');
      expect(res.body).toHaveProperty('service', 'michimochi-backend');
    });
  });

  describe('GET /docs/openapi.json & /docs (Scalar Documentation)', () => {
    it('should serve openapi.json with OpenAPI 3.1 spec', async () => {
      const res = await request(app).get('/docs/openapi.json');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('openapi', '3.1.0');
      expect(res.body.info).toHaveProperty('title', 'MichiMochi API — Dedicated Backend');
    });

    it('should serve Scalar HTML reference UI', async () => {
      const res = await request(app).get('/docs');
      expect(res.status).toBe(200);
      expect(res.text).toContain('scalar');
    });
  });

  describe('POST /api/auth/register (Validation)', () => {
    it('should reject registration with invalid email or missing fields', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          fullName: 'J',
          email: 'not-an-email',
          password: '123',
          acceptedTerms: false,
        });

      expect(res.status).toBe(400);
      expect(res.body.ok).toBe(false);
      expect(res.body).toHaveProperty('details');
      expect(res.body.details.length).toBeGreaterThan(0);
    });
  });

  describe('POST /api/auth/login (Validation & Integration)', () => {
    it('should reject login without required fields', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.ok).toBe(false);
    });

    it('should authenticate valid Firebase credentials and issue JWT token', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'juan.henao123@gmail.com',
          password: 'juanhenao123*',
        });

      expect(res.status).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.data).toHaveProperty('user');
      expect(res.body.data.user.email).toBe('juan.henao123@gmail.com');
      expect(res.body.data.user.uid).toBe('r2n8jY3gmPci6n4i1ZExBmubOhr1');
      expect(res.body.data).toHaveProperty('tokens');
      expect(res.body.data.tokens).toHaveProperty('accessToken');
    }, 10000);

    it('should reject incorrect password with 401', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'juan.henao123@gmail.com',
          password: 'wrongpassword123',
        });

      expect(res.status).toBe(401);
      expect(res.body.ok).toBe(false);
      expect(res.body.error).toBe('Correo o contraseña incorrectos.');
    }, 10000);
  });
});
