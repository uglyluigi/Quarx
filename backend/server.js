const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const connection = mongoose.connection;
const usersRouter = require('./routes/users');

require('dotenv').config();
const uri = process.env.ATLAS_URI;

app.use('/users', usersRouter);
app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true}).then(r =>{
    console.log("Mongoose.connect success");
} );




