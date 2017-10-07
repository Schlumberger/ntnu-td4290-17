const firebase = require('firebase');
const firebaseConfig = require('../configs/firebase');

const svgToJson = require('./svgToJSON');
const stackLayers = require('./stackLayers');

firebase.initializeApp(firebaseConfig);

// script that updates the database with new points
svgToJson()
  .then(json => stackLayers(json))
  .then(res => {
    let updates = {};
    updates['/datasets/newStacked'] = res;
    firebase
      .database()
      .ref()
      .update(updates);
  });

/*
stackLayers([
  {
    type: 'surface',
    points: [
      {
        x: 10,
        y: 10
      },
      {
        x: 200,
        y: 10
      }
    ]
  },
  {
    type: 'surface',
    points: [
      {
        x: 10,
        y: 20
      },
      {
        x: 200,
        y: 20
      }
    ]
  },
  {
    type: 'surface',
    points: [
      {
        x: 10,
        y: 30
      },
      {
        x: 100,
        y: 30
      }
    ]
  }
]);*/
