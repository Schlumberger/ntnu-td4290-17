const firebaseConfig = require('../configs/firebase');

const svgToJson = require('./svgToJSON');
const stackLayers = require('./stackLayers');
const admin = require('firebase-admin');
const serviceAccount = require('../configs/serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ntnu-td4290-17.firebaseio.com'
});
// script that updates the database with new points
svgToJson()
  .then(json => stackLayers(json))
  .then(res => {
    let updates = {};
    updates['/datasets/newStacked'] = res;
    admin
      .database()
      .ref()
      .update(updates)
      .then(d => console.log(d));
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
]); */
