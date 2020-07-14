// Imported required packages.
const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose');

// MongoDB Database url.
var mongoDatabase = 'mongodb://localhost:27017/meandb';

// Created express server.
const app = express();
mongoose.Promise = global.Promise;

// Connect Mongodb database
mongoose.connect(mongoDatabase, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('There is problem while connecting database ' + err) }
);

// All the express routes.
const ownerRoutes = require('./routes/owner.route');

// Convert incoming data to JSON format.
app.use(bodyParser.json());

// Enabled CORS.
app.use(cors());

// Setup for the server port number.
const port = process.env.PORT || 8000;

// Routes configuration.
app.use('/api', ownerRoutes);

// Starting our express server.
const server = app.listen(port, function () {
    console.log('Server Lisening On Port : ' + port);
});

// MongoDB databse url.
var mongoDatabase = 'mongodb://localhost:27017/meandb';

// Connect Mongodb database.
mongoose.connect(mongoDatabase, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('There is problem while connecting database ' + err) }
);
