function getBaseUrl() {
    return 'http://localhost:5000'
}

function runCallbackIfThere(callback, params) {
    if (callback) {
        callback(params);
    }
}

module.exports = {getBaseUrl, runCallbackIfThere};