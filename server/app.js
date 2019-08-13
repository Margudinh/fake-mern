const express = require('express');
const db = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');


const PORT = process.env.PORT || 5000;

db.authenticate()
    .then(() =>{
        app = express();
        app.use(cors());
        app.use(bodyParser.json());
        app.use("/users", require('./routes/users'));
        
        
        app.listen(PORT);
        console.log(`Server running in http://localhost:${PORT}`);
    })
    .catch(err => console.log(err));