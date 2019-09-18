var express = require('express');
var router = express.Router();
var defaultHeader = ["Content-Type", "application/json"]
const sequelize = require('sequelize');
const op = sequelize.Op;
var Event = require('../../../models').Event;
var Olympian = require('../../../models').Olympian;
var OlympianEvent = require('../../../models').OlympianEvent;

router.get('/', async function(req, res) {
  res.setHeader(...defaultHeader);
  try {
    let averageAge = await Olympian.findAll({
       attributes: [
         [sequelize.fn('AVG', sequelize.col('age')), 'avg_age']
       ]
     })
     .then(response => response[0].avg_age)
     .catch(error => error )

     let averageMaleWeight = await Olympian.findAll({
       where: {
         sex: 'M',
         [op.not]:[
           {weight: 'NA'}
         ]
       },
       attributes: [
         sequelize.fn('AVG',
         sequelize.col('weight')),
         'avg_male_weight'
       ]
     })
     .then(response => response)
     .catch(error => error)

    res.status(200).send(JSON.stringify(averageMaleWeight));
  } catch (error) {
    res.status(500).send({ error })
  }
});

 function averageAge() {
   Olympian.findAll({
    attributes: [
      [sequelize.fn('AVG', sequelize.col('age')), 'avg_age']
    ]
  })
  .then(response => response[0])
  .catch(error => error )
}

async function averageMaleWeight() {
  Olympian.findAll({
    where: {
      sex: 'M',
      [op.not]:[
        {weight: 'NA'}
      ]
    },
    attributes: [
      sequelize.fn('AVG',
      sequelize.col('weight')),
      'avg_male_weight'
    ]
  })
}
module.exports = router;
