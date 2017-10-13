const firebaseConfig = require('../configs/firebase');
const svgToJson = require('./svgToJSON');
const stackLayers = require('./stackLayers');
const genSubareas = require('./genSubareasByFaults');
const admin = require('firebase-admin');
const serviceAccount = require('../configs/serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ntnu-td4290-17.firebaseio.com'
});
// script that updates the database with new points
svgToJson()
  .then(json => stackLayers(json))
  .then(json => genSubareas(json))
  .then(
    res =>
      new Promise((resolve, reject) => {
        let updates = {};

        updates['/datasets/mykey'] = res;
        admin
          .database()
          .ref()
          .update(updates)
          .then(resolve)
          .catch(reject);
      })
  )
  .then(process.exit);
