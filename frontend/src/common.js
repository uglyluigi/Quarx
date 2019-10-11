function get_base_url_for_api_reqs() {
    return 'http://localhost:5000';
}

function runCallbackIfThere(callback, params) {
    if (callback) {
        callback(params);
    }
}

module.exports = {getBaseUrl: get_base_url_for_api_reqs, runCallbackIfThere};