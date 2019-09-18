var app = require('../app');
var shell = require('shelljs');
var request = require('supertest');
var cleanup = require('./helper/testCleanup');

describe('Olympians Endpoints', () => {
  beforeEach(async () => {
    await cleanup()
  });

  it('GET request for all olympians', async () => {
    return await request(app)
    .get('/api/v1/olympians?age=youngest')
    .then(response => {
      console.log(response.body)
      expect(response.statusCode).toBe(200)
      expect(Object.keys(response.body[0])).toContain('name')
      expect(Object.keys(response.body[0])).toContain('team')
      expect(Object.keys(response.body[0])).toContain('age')
      expect(Object.keys(response.body[0])).toContain('sport')
      expect(Object.keys(response.body[0])).toContain('total_metals_won')
    })
  });

})
