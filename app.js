const express = require('express');

// create web app:
const app = express();

// load configurations:
require('./config')(app);


// Connect to the database:
const db = require('./models')(app);
db.sequelize.sync();


// listen to the port:
app.listen(app.configuration.port, () => {
    console.log('listening on port: ' + app.configuration.port + '...');
});