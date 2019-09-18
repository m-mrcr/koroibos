var express = require('express');
var router = express.Router();
var defaultHeader = ["Content-Type", "application/json"]
var Event = require('../../../models').Event;
var Olympian = require('../../../models').Olympian;
var OlympianEvent = require('../../../models').OlympianEvent;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', async function(req, res) {
  res.setHeader(...defaultHeader);
  try {
    if (req.query.age === 'youngest') {
      var age = await Olympian.min('age');
    }
    if (req.query.age === 'oldest') {
      var age = await Olympian.max('age');
    }

    if (age !== undefined) {
      Olympian.findAll({
        attributes: ['name', 'team', 'age', 'sport'],
        where: {age: age},
        include: [{
          model: OlympianEvent,
          where: {
            medal: {[Op.not]: 'NA'}
          },
          required: false
        }]
      })
      .then(olympians => {
        return olympianSerializer(olympians)
      })
      .then(serializedOlympians => {
        res.status(200).send({olympians: serializedOlympians})
      })
      .catch(error => {
        res.setHeader(...defaultHeader);
        res.status(404).send({error})
      })
    } else {
      Olympian.findAll({
        attributes: ['name', 'team', 'age', 'sport'],
        include: [{
          model: OlympianEvent,
          where: {
            medal: {[Op.not]: 'NA'}
          },
          required: false
          }
        ]
      })
      .then(olympians => {
        return olympianSerializer(olympians)
      })
      .then(serializedOlympians => {
        res.setHeader(...defaultHeader);
        res.status(200).send({olympians: serializedOlympians})
      })
      .catch(error => {
        res.setHeader(...defaultHeader);
        res.status(404).send({error})
      })
    }
  } catch (error) {
    res.status(500).send({ error })
  }
});

function olympianSerializer(olympians) {
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
