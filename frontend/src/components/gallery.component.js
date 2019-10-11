import React, {Component} from 'react';
import {Col, Container, Row, Carousel} from "react-bootstrap";
import {get_base_url_for_api_reqs} from "../common";

export default class Gallery extends Component {
    constructor(props) {
        super(props);

        this.getPhotos.bind(this);
        this.factoryItems.bind(this);

        this.state = {
            images: [],
            children: []
        };
    }

    getPhotos() {
        let axios = require('axios');

        axios.get('http://localhost:5000/api/assets/carousel-images/')
            .then(response => {
                this.setState({images: response.data.images}, () => {
                    console.log(this.state.images);
                    this.factoryItems();
                });
            });
    }

    factoryItems() {
        let children = [];

        for (let i = 0; i < this.state.images.length; i++) {
            children[i] =

            <Carousel.Item>
                <img className={"d-block w-100"} src={this.state.images[i]} alt='Uhhh'/>
                <Carousel.Caption>
                    <h3>Yee haw</h3>
                    <p>Bepis</p>
                </Carousel.Caption>
            </Carousel.Item>;
        }

        console.log(children);
        this.setState({children: children});
    }

    componentDidMount() {
        this.getPhotos();
    }

    render() {
        return (
            <Container>
                <Carousel>
                    {this.state.children}
                </Carousel>
            </Container>
        )
    }
}