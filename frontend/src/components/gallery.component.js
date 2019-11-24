import React, {Component} from 'react';
import {Carousel, Container} from "react-bootstrap";
import "../styles/gallery.component.css"

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
                    <img src={this.state.images[i]}
                         style={{
                             height: '81vh',
                         }}/>
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
            <Container fluid style={{
                backgroundColor: 'black',
                minHeight: '81vh',
            }}>
                <Carousel>
                    {this.state.children}
                </Carousel>
            </Container>
        )
    }
}