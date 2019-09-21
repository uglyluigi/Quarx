import {DB_URI, MDB_CLIENT_OPS, PORT} from './constants';
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const express_app = express();
const body_parser = require('body-parser');
const axiosDefaults = require('axios/lib/defaults');

axiosDefaults.baseURL = 'http://localhost:5000';

express_app.use(cors());
express_app.use(express.json());
express_app.use(body_parser.urlencoded({extended: true}));
express_app.use(body_parser.json());

express_app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

//Register blog post API endpoints
express_app.use('/', require('./routes/index'));

//--DB STUFF--

console.log(require('express-list-endpoints')(express_app));

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

mongoose.connect(DB_URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then(r =>{
    console.log(`Successfully connected to MONGODB @ ${DB_URI}`);
}).catch(err => console.log(`Failed to connect to MONGODB @ ${DB_URI}:\n${err}`));



