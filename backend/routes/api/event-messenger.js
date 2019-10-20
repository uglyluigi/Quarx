const router = require('express').Router();
const EMSUser = require('../../models/ems-user.model');
const is_empty = require('is-empty');

router.post('/', (request, response, next) => {
    let new_user;
    let email_addr = request.body.email;
    let phone_num = request.body.phone_number;

    if (phone_num) {
        new_user = new EMSUser({email: email_addr, phone_number: phone_num});
    } else {
        new_user = new EMSUser({email: email_addr});
    }

    new_user
        .save()
        .then(() => {
            response.status(201).json({message: "EMS User successfully registered."});
        }, (err) => {
            let error_msgs = [];

            if (err.errors) {
                let errors = err.errors;

                if (errors.email) {
                    error_msgs[0] = errors.email.message;
                }

                if (errors.phone_number) {
                    error_msgs[1] = errors.phone_number.message;
                }

                /**
                 * A quick explanation of .filter(x => x)
                 * I'm trying to exclude null elements from the error array when
                 * sending it back in the response. undefined, null, NaN, etc. are
                 * all falsey values when converted to booleans. The predicate
                 * passed to .filter will only succeed if 'x' is a truthy value,
                 * or basically any string value besides null or undefined
                 * (with negligible exceptions in this case).
                 */
                response.status(400).json({err: error_msgs.filter(x => x)});
            } else if (err.name === "MongoError") {
                if (err.code === 11000) {
                    //If the error has to do with a duplicate email.
                    //It could be someone trying to update it with their phone number.
                    //Observe.
                    if (err.errmsg.includes('email')) {
                        //Find the duplicate email DB document

                        if (is_empty(phone_num)) {
                            return response.sendStatus(409);
                        }

                        EMSUser
                            .find({email: email_addr})
                            .then(found1 => {
                                //Only allow phone number updates if the document associated with the email
                                //does not already contain one

                                if (!is_empty(found1[0].phone_number)) {
                                    response.send(304);
                                    return;
                                }

                                //If the duplicate email document was found
                                if (found1.length > 0) {
                                    //Now we're gonna make sure the phone number to be updated isn't already associated with another
                                    EMSUser
                                        .find({phone_number: phone_num})
                                        .then(found2 => {
                                            //Ensure the supplied phone number isn't in the DB already
                                            if (found2.length > 0) {
                                                response.status(409).json({message: "That phone number already exists in the DB."});
                                                return;
                                            }

                                            //If all is good, add it to the email document found earlier
                                            EMSUser
                                                .updateOne({_id: found1[0]._id}, {$set: {phone_number: phone_num}})
                                                .then(out => {
                                                    //If the document was modified
                                                    if (out.nModified === 1) {
                                                        response.status(200).json({message: "Your phone number has been associated with your email address."});
                                                    } else {
                                                        //If it wasn't for some odd reason
                                                        response.status(500).json({message: "Error achieved!"});
                                                    }
                                                }, err => {
                                                    response.status(500).json({
                                                        message: "Error occurred while updating item.",
                                                        err: err
                                                    });
                                                });
                                        }, err => {
                                            response.status(500).json({
                                                message: "Error occurred locating duplicate email document.",
                                                err: err
                                            });
                                        });

                                } else { //If it wasn't... well that's a really weird error state
                                    response.status(500).json({err: "A very odd error state has been achieved. Please slap uglyluigi across the face."})
                                }
                            }, err => {
                                response.status(500).json({
                                    message: "A mysterious error has occurred when trying to find the duplicate email document.",
                                    err: err
                                })
                            })
                    }

                } else {
                    error_msgs[2] = "MongoError: " + err.errmsg;
                    response.status(400).json({err: error_msgs.filter(x => x)});
                }
            }
        });

    return response;
});

module.exports = router;