import React, { Component } from 'react';

export default class Music extends Component {

    render() {
        return (
            <div style="text-align: center;">
                <iframe className="displayed" align="center"  width="1375" height="787" src="https://www.youtube.com/embed/fghUN5xnGAo" frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>

                <iframe width="1375" height="787" src="https://www.youtube.com/embed/XrSKLibOw1g" frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>

                <iframe width="1375" height="787" src="https://www.youtube.com/embed/0L7kVvJYdPE" frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
            </div>
        );
    }
}