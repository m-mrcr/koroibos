var Event = require('../models').Event
var Olympian = require('../models').Olympian
var OlympianEvent = require('../models').OlympianEvent
var csv = require('fast-csv')
var fs = require('fs');

let counter = 0;
let csvStream = csv.parseFile("./data/olympic_data_2016.csv", {headers: true})
  .on('data', function(record) {
    csvStream.pause();

    let name = record.Name;
    let sex = record.Sex;
    let age = record.Age;
    let weight = record.Weight;
    let height = record.Height;
    let team = record.Team;
    let sport = record.Sport;
    let event_record = record.Event;
    let medal = record.Medal;

    if (weight == 'NA') {
      weight = null
    }

    if (height == 'NA') {
      height = null
    }

    if (medal == 'NA') {
      metal = null
    }

    Event.findOrCreate({
      where: {
        name: event_record,
        sport: sport
      }
    })
    .then(event_record => {
      Olympian.findCreateFind({
        where: {
          name: name,
          age: age,
          sex: sex,
          weight: weight,
          height: height,
          team: team,
          sport: sport
        }
      })
      .then(olympian => {
        var olympianId = olympian[0].id;
        var eventId = event_record[0].id;
        OlympianEvent.findCreateFind({
          where: {
            EventId: eventId,
            OlympianId: olympianId,
            medal: medal
          }
        })
      })
    })
    counter ++;
    csvStream.resume();
  })
  .on("end", function(end){
    console.log(`Imported ${counter} files`);
  })
  .on("error", function(err){
    console.log(err);
  })

setTimeout(function() {
  process.exit();
}, 30000);
