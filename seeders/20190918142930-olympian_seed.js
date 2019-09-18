'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Olympians', [{
      id: 1,
      name: 'Martin Mercer',
      age: 30,
      sex: 'M',
      weight: 83,
      team: "United States",
      sport: "Athletics",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      name: 'Kelsey Paul',
      age: 28,
      sex: 'F',
      weight: 63,
      team: "Cananda",
      sport: "Athletics",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 3,
      name: 'Allan Babcock',
      age: 32,
      sex: 'F',
      weight: 86,
      team: "United States",
      sport: "Wrestling",
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Olympians', null, {});
  }
};
