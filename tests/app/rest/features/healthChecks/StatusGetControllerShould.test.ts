import { ApplicationRestApp } from 'krisemm/app/rest/config/ApplicationRestApp';
import request from 'supertest';
import { expect } from '@jest/globals';

describe('StatusGetControllerShould', () => {
  it('Check if the rest app is working', async () => {
    const response = await request(ApplicationRestApp).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});
