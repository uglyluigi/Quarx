import React, {Component} from 'react';
import {Col, Container, Row, Carousel} from "react-bootstrap";

export default class Gallery extends Component {
    constructor(props) {
        super(props);

        this.getPhotos.bind(this);

        this.state = {
            num_photos: 0,
            photos: []
        };
    }

    getPhotos() {
        let axios = require('axios');

    }

    componentDidMount() {

    }

    render() {
        return (
            <Container>
                <Carousel>
                    <Carousel.Item>
                        <img className={"d-block w-100"} src={require('../assets/photos/1.jpg')} alt="First slide"/>
                        <Carousel.Caption>
                            <h3>Yeet haw</h3>
                            <p>EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className={"d-block w-100"} src={require('../assets/photos/2.jpeg')} alt="Second slide"/>
                        <Carousel.Caption>
                            <h3>Yeet haw</h3>
                            <p>EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Container>
        )
    }
}