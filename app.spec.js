const app = require('./app');
const shell = require('shelljs');
const request = require("supertest");

describe('testing', () => {
  beforeAll(() => {
     shell.exec('npx sequelize db:create')
     shell.exec('npx sequelize db:migrate')
     shell.exec('npx sequelize db:seed:all')
   });
   afterAll(() => {
     shell.exec('npx sequelize db:seed:undo:all')
     shell.exec('npx sequelize db:migrate:undo:all')
   });

  describe('Olympians Endpoints', () => {
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
    });
  });

  describe('Stats Endpoints', () => {
    it('should return a 200 status and olympian stats', async () => {
      return await request(app)
      .get('/api/v1/olympian_stats')
      .then(response => {
        expect(response.status).toBe(200)
        expect(Object.keys(response.body.olympian_stats)).toContain('total_competing_olympians')
        expect(Object.keys(response.body.olympian_stats)).toContain('average_weight')
        expect(Object.keys(response.body.olympian_stats.average_weight)).toContain('unit')
        expect(Object.keys(response.body.olympian_stats.average_weight)).toContain('male_olympians')
        expect(Object.keys(response.body.olympian_stats.average_weight)).toContain('female_olympians')
        expect(Object.keys(response.body.olympian_stats)).toContain('average_age')
      })
    });
  });

  describe('Events Endpoints', () => {
    it('should return a 200 status and events', async () => {
      return await request(app)
      .get('/api/v1/events')
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body.events.length).toBe(2)
        expect(Object.keys(response.body.events[0])).toContain('sport')
        expect(Object.keys(response.body.events[0])).toContain('events')
      })
    });

    it('should return a 200 status and metalists', async () => {
      return await request(app)
      .get('/api/v1/events/1/medalists')
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body.medalists.length).toBe(2)
        expect(Object.keys(response.body)).toContain('event')
        expect(Object.keys(response.body)).toContain('medalists')
        expect(response.body.medalists[0].name).toBe('Kelsey Paul')
        expect(response.body.medalists[1].name).toBe('Martin Mercer')
      })
    });
  });
})
