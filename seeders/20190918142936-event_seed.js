'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [{
      id: 1,
      name: "Athletics Men's 4 x 100 metres Relay",
      sport: "Athletics",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 2,
      name: "Athletics Women's 4 x 100 metres Relay",
      sport: "Athletics",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 3,
      name: "Wrestling Men's Super-Heavyweight, Freestyle",
      sport: "Wrestling",
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  }
};
