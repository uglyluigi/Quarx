import '../styles/material-fonts.css'
import '../styles/home-component.css'
import React, { Component } from 'react';
import {Jumbotron, Container, Row, Image, Button, Col} from 'react-bootstrap';
import TwitterTimelineComponent from './twitter.component'
import { NavLink } from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                     <Col>
                         <Jumbotron>
                             <div>
                                <h2>Welcome!</h2>
                                    <p>Quarx is a band based in Baton Rouge, Louisiana.<br/>They make things like:<br/> </p>
                                        <ul>
                                            <li>Music</li>
                                            <li>Friends</li>
                                            <li>Music (mostly music)</li>
                                        </ul>
                             </div>
                         </Jumbotron>
                     </Col>
                    <Col>
                        <Jumbotron>
                        <TwitterTimelineComponent/>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        );
    }
}