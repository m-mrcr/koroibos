const app = require('./app');
const shell = require('shelljs');
const request = require("supertest");

describe('Olympians Endpoints', () => {
  beforeAll(() => {
     shell.exec('npx sequelize db:create')
     shell.exec('npx sequelize db:migrate')
     shell.exec('npx sequelize db:seed:all')
   });
   afterAll(() => {
     shell.exec('npx sequelize db:seed:undo:all')
     shell.exec('npx sequelize db:migrate:undo:all')
   });

  it('should return a 200 status and all olympians', async () => {
    return await request(app)
    .get('/api/v1/olympians')
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.body.olympians.length).toBe(3)
      expect(Object.keys(response.body.olympians[0])).toContain('name')
      expect(Object.keys(response.body.olympians[0])).toContain('team')
      expect(Object.keys(response.body.olympians[0])).toContain('age')
      expect(Object.keys(response.body.olympians[0])).toContain('sport')
      expect(Object.keys(response.body.olympians[0])).toContain('total_medals_won')
    })
  });

    it('should return a 200 status and youngest olympians', async () => {
      return await request(app)
      .get('/api/v1/olympians?age=youngest')
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body.olympians.length).toBe(1)
        expect(Object.keys(response.body.olympians[0])).toContain('name')
        expect(Object.keys(response.body.olympians[0])).toContain('team')
        expect(Object.keys(response.body.olympians[0])).toContain('age')
        expect(Object.keys(response.body.olympians[0])).toContain('sport')
        expect(Object.keys(response.body.olympians[0])).toContain('total_medals_won')
      })
    });

    it('should return a 200 status and oldest olympians', async () => {
      return await request(app)
      .get('/api/v1/olympians?age=oldest')
      .then(response => {
          expect(response.status).toBe(200)
          expect(response.body.olympians.length).toBe(1)
          expect(Object.keys(response.body.olympians[0])).toContain('name')
          expect(Object.keys(response.body.olympians[0])).toContain('team')
          expect(Object.keys(response.body.olympians[0])).toContain('age')
          expect(Object.keys(response.body.olympians[0])).toContain('sport')
          expect(Object.keys(response.body.olympians[0])).toContain('total_medals_won')
        })
    })

})
