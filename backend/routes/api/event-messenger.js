import {DB_URI, DB_CLUSTER_NAME, BLOG_COLLECTION_NAME, EMS_COLLECTION_NAME} from "../../constants";

const mongoose = require('mongoose');
const router = require('express').Router();
const EMSUser = require('../../models/ems-user.model');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;


router.post('/', (request, response, next) => {
    console.log("POST to /event-messenger");

    const email = request.body.email;
    const phone_number = request.body.phone_number;

    if (!email) {
        return response.status(400).json({message: "Event messenger entries must contain an email address."});
    }

    MongoClient.connect(DB_URI)
        .then(connection => {
            connection.db(DB_CLUSTER_NAME)
                .collection(EMS_COLLECTION_NAME)
                .insert({email: email, phone_number: phone_number})
                .then(out => {
                    response.status(201).json({message: "EMS User successfully registered"});
                })
                .then(() => connection.close());
        });

    return response;
});

router.get('/', (request, response, next) => {
   return response.status(200).json({message: "You are a gamer!"});
});

module.exports = router;