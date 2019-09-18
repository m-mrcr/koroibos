var shell = require('shelljs');
var Event = require('../../models').Event;
var Olympian = require('../../models').Olympian;
var OlympianEvent = require('../../models').OlympianEvent;

module.exports = async function cleanup() {
  await OlympianEvent.destroy({ where: {} })
  await Olympian.destroy({ where: {} })
  await Event.destroy({ where: {} })
  shell.exec('npx sequelize db:seed:all');
}
