const router = require('express').Router();
const fs = require('fs');
import {get_base_url_for_api_reqs} from './common';

router.get('/carousel-images', (request, response) => {
    fs.readdir('./assets/carousel_images', (err, files) => {
        if (err) {
            console.log("Error reading carousel image directory: " + err);
            response.status(500).json({err: err});
        } else {
            let resp_files = [];

            for (let i = 0; i < files.length; i++) {
                resp_files[i] = get_base_url_for_api_reqs().concat('/api/assets/carousel-images/').concat(files[i]);
            }

            console.log(resp_files);
            response.status(200).json({images: resp_files});
        }
    });

   return response;
});

router.get('/carousel-images/:image', (request, response) => {
    const image = request.params.image;

    fs.readFile('./assets/carousel_images/'.concat(image), (err, content) => {
        if (err) {
            if (err.errno === -4058) {
                response.status(400).json({message: "That image does not exist."});
            } else {
                console.log('Error reading file in response to request:' + err);
                response.status(500).json({err: err});
            }
        } else {
            response.writeHead(200, {'Content-type': 'image/jepg'});
            response.end(content);
        }
    });

    return response;
});

module.exports = router;