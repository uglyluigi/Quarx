const router = require('express').Router();
const EMSUser = require('../../models/ems-user.model');

/**
 * Mongoose things the 'unique' property is a joke only to be taken seriously
 * by some (but not itself) making this preflight DB check necessary.
 *
 * @param email eeeeeeeeee
 * @param phone_num ppppppppppp
 * @returns {boolean} booooooooooooooooooo
 */
function reg_preflight(email, phone_num) {
    let flag = false;

    for (let doc of [{email: email}, {phone_number: phone_num}]) {
        EMSUser
            .find(doc)
            .then(thing => {
                flag = thing.length > 0;
            } , err => console.log(err));
    }

    return flag;
}


router.post('/', (request, response, next) => {
    console.log("POST to /event-messenger");
    let new_user;
    let email_addr = request.body.email;
    let phone_num = request.body.phone_number;
    let register = false;

    if (request.body.phone_number) {
        new_user = new EMSUser({email: email_addr, phone_number: phone_num});
    } else {
        new_user = new EMSUser({email: request.body.email});
    }

    if (reg_preflight(email_addr, phone_num)) {
        return response.status(409).json({err: "That email address or phone number already exists in the DB."});
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
                    response.status(409).json({err: "That email address or phone number already exists in the DB."});
                } else {
                    error_msgs[2] = "MongoError: " + err.errmsg;
                    response.status(400).json({err: error_msgs.filter(x => x)});
                }
            }
        });

    return response;
});

router.get('/', (request, response, next) => {
   return response.status(200).json({message: "You are a gamer!"});
});

module.exports = router;