var express = require('express');
var router = express.Router();
var defaultHeader = ["Content-Type", "application/json"]
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var Olympian = require('../../../models').Olympian;
var OlympianEvent = require('../../../models').OlympianEvent;

router.get('/', async function(req, res) {
  try {
    // res.setHeader(...defaultHeader);
    if (req.query.age === 'youngest') {
      let age = await Olympian.min('age')
    } else if (req.query.age === 'oldest') {
      let age = await Olympian.max('age')
    }
    if (age) {
      let olympians = Olympian.findAll({
        attributes: ['name', 'team', 'age', 'sport'],
        where: {age: age},
        include: [{
          model: OlympianEvent,
          where: {
            medal: {[Op.not]: null}
          },
          required: false
        }]
      });
    } else {
      let olympians = Olympian.findAll({
        attributes: ['name', 'team', 'age', 'sport'],
        include: [{
          model: OlympianEvent,
          where: {
            medal: {[Op.not]: null}
          },
          required: false
        }]
      });
    }
    let response = serializeOlympians(olympians)
    console.log(olympians)
    res.status(200).send(JSON.stringify(`olympians: ${response}`));
  } catch (error) {
    res.status(500).send({ error })
  }
});

function serializeOlympians(olympians) {
  return olympians.map(function (olympian){
    let serializer = {
      name: olympian.name,
      team: olympian.team,
      age: olympian.age,
      sport: olympian.sport,
      total_medals_won: olympian.OlympianEvents.length
    }
    return serializer
  })
}

module.exports = router;
