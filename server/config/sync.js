const db = require('./db');
const User = require('../models/User');

db.sync()
    .then(()=> {
        console.log("Sync changes from database");
    })
    .catch((err) => console.log(err));