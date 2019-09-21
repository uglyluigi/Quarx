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
                         <NavLink to="/music" style={{textDecoration: 'none'}} activeStyle={{textDecoration: 'none'}}>
                         <Image thumbnail src={"https://scontent-dfw5-2.xx.fbcdn.net/v/t1.0-9/49948596_1951615218468461_8226089796183785472_o.jpg?_nc_cat=105&_nc_oc=AQk2eUL7LDAaFza_8iLSRL7cK2L0p6APN2fBRT9ru530Az_SZvN54uR867ro_ZfWJvU&_nc_ht=scontent-dfw5-2.xx&oh=c4e5b68dcb4196863f0037f07edee30a&oe=5E06D282"}></Image>
                         </NavLink>
                     </Col>
                    <Col>
                        <Jumbotron >
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
                </Row>
            </Container>
        );
    }
}