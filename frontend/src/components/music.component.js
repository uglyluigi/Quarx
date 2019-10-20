import React, {Component} from 'react';
import "../styles/music.component.css"
import {Col, Container, Row} from "react-bootstrap";

export default class Music extends Component {

    render() {
        return (
            <Container>
                <Row>
                    <iframe width="1375" height="787" src="https://www.youtube.com/embed/fghUN5xnGAo"
                             frameBorder="1"
                             allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                             allowFullScreen/>

                        <iframe width="1375" height="787" src="https://www.youtube.com/embed/XrSKLibOw1g"
                                frameBorder="1"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen/>

                        <iframe width="1375" height="787" src="https://www.youtube.com/embed/0L7kVvJYdPE" 
                                frameBorder="1"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen/>
                </Row>


            </Container>
        );
    }
}