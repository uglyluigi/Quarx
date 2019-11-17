import React, {Component} from 'react';
import "../styles/music.component.css"
import {Row} from "react-bootstrap";
import SpotifyPlayer from 'react-spotify-player';

export default class Music extends Component {

    render() {
        return (
            <div className="container-fluid">
                <Row style={{
                    height: '81vh',
                    alignContent: 'center',
                }}>
                    <iframe width="1375" height="787" src="https://www.youtube.com/embed/fghUN5xnGAo"
                            frameBorder="1"
                            allow="accelerometer; encrypted-media; picture-in-picture"
                            allowFullScreen/>

                    <iframe width="1375" height="787" src="https://www.youtube.com/embed/wI5QQUsrlOY"
                            frameBorder="1"
                            allow="accelerometer; encrypted-media; picture-in-picture"
                            allowFullScreen/>

                    <SpotifyPlayer
                        uri={"spotify:artist:2IqQNFhbgFsccxMWoNpOWQ"}
                        size={{width: '100%', height: 300}}
                        view={'list'}
                        theme={'black'}

                    />
                </Row>
            </div>
        );
    }
}