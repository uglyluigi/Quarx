const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const connection = mongoose.connection;
const list_endpoints = require('express-list-endpoints');

require('dotenv').config();

app.use(cors());

app.use(express.json());
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

//Register blog post API endpoints
app.use('/', require('./routes/index'));

//--DB STUFF--

console.log(list_endpoints(app));

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

mongoose.connect(process.env.MONGODB_CA_BLOG_URI, {useNewUrlParser: true, useCreateIndex: true}).then(r =>{
    console.log(`Successfully connected to MONGODB @ ${process.env.MONGODB_CA_BLOG_URI}`);
});




