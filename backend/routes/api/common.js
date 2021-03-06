const ObjectId = require('mongodb').ObjectID;

module.exports = {
    /**
     * Function used to simplify responding to update/delete requests.
     * Takes the 'out' parameters from a mongoDB updateOnce requests and
     * responds to them in kind.
     *
     * @param response the Express response object.
     * @param out the 'out' parameters that contain the modified and matched counts for the DB query.
     * @param objectId the ID of the DB object, used only to tailor the response.
     */
    produce_update_response: function (response, out, objectId) {
        const {matchedCount, modifiedCount} = out;
        console.log(`Matched count: ${matchedCount} | Modified count: ${modifiedCount}`);

        if (modifiedCount == 1) {
            response.status(200).json({message: `Post with id ${objectId} has been modified.`});
        } else if (modifiedCount == 0 && matchedCount == 1) { //If it was matched but not updated
            response.status(304).json({message: `Post with id ${objectId} was not modified.`});
        } else { //If it wasn't even matched
            response.status(404).json({
                message: `Cannot modify post ${objectId}: it does not exist.`,
                sorry: false
            });
        }
    },

    /**
     * Function used to reduce boilerplate at endpoints that require a postId.
     * Verifies them using ObjectId.isValid.
     *
     * @param response the response object. Only modified if the given objectId is invalid.
     * @param objectId the objectId to attempt to validate.
     * @returns {boolean} true if the objectId is valid; false if it's not. The given response object's status
     * will be set to 400 when this function returns false.
     */
    validate_objid_and_respond: function (response, objectId) {
        if (!ObjectId.isValid(objectId)) {
            response.status(400).json({message: `The provided ID \'${objectId}\' is not a valid DB object ID.`});
            return false;
        } else {
            return true;
        }
    },

    /**
     * Function for handling mongo DB errors.
     * @param response the response to modify. Sets the status to 500
     * @param error the error provided by the mongo client.
     */
    handle_mongo_error: function (response, error) {
        console.log("The following error occurred with the MongoDB client:\n" + error);
        response.status(500).json({message: "An error occurred with the MongoDB client.", error: error});
    },

    /**
     * A function that logs each request to the console.
     * Called when any request is received (only called in server.js)
     *
     * @param request the request to log.
     * @param response this doesn't matter.
     * @param next the next middleware function.
     */
    log_request: function (request, response, next) {
        const method = request.method;
        const uri = request.path;
        console.log(`${method} request was received at ${uri}.`);

        next();
    },

    /**
     * Lazy, generic handler for errors I dont feel like dealing with.
     * Checks for null.
     *
     * @param err the error
     * @param response the response the error will be written to
     */
    go_away_err: function (err, response) {
        if (err) {
            response.status(500).json({err: err});
        }
    },

    /**
     *
     * @returns {string}
     */
    get_base_url_for_api_reqs: function () {
        return 'http://localhost:5000';
    }
}