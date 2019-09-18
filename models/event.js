'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    sport: DataTypes.STRING
  }, {});
  Event.associate = function(models) {
    Event.belongsToMany(models.Olympian, {through: 'OlympianEvents', as: 'events', foreignKey: 'EventId'});
  };
  return Event;
};
