function produce_update_response(response, out, postId) {
    const {matchedCount, modifiedCount} = out;
    console.log(`Matched count: ${matchedCount} | Modified count: ${modifiedCount}`);

    if (modifiedCount == 1) {
        response.status(200).json({message: `Post with id ${postId} has been modified.`});
    } else if (modifiedCount == 0 && matchedCount == 1) { //If it was matched but not updated
        response.status(304).json({message: `Post with id ${postId} was not modified.`});
    } else { //If it wasn't even matched
        response.status(404).json({
            message: `Cannot modify post ${postId}: it does not exist.`,
            sorry: false
        });
    }
}

function validate_objid_and_respond(response, objectId) {

}

module.exports = produce_update_response;