import React, {Component} from 'react';
import {MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavLink} from "mdbreact";
import Link from "@material-ui/core/Link";
import "../styles/navbar.component.css";
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';


class NavBar extends Component {
    render() {
        return (

            <MDBNavbar
                className="navbar fixed-top navbar-expand-lg navbar-dark"
                style={{
                    backgroundColor: '#171717',
                    maxHeight: '7vh',
                }}>
                <MDBNavbarNav left>
                    <MDBNavItem active>
                        <MDBNavLink to="/">Home</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem active>
                        <MDBNavLink to="/music">Music</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem active>
                        <MDBNavLink to="/mail">Mail</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem active>
                        <MDBNavLink to="/gallery">Gallery</MDBNavLink>
                    </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                    <MDBNavItem>
                        <Link
                            href={'https://www.facebook.com/Quarxband/'}>
                            <FacebookIcon className={"icon"}
                                          color='primary'
                                          style={{fontSize: '4.5vh'}}/>
                        </Link>
                        <Link
                            href={'https://twitter.com/quarxband?lang=en'}>
                            <TwitterIcon className={"icon"}
                                         color='primary'
                                         style={{fontSize: '4.5vh'}}/>
                        </Link>
                        <Link
                            href={'https://www.instagram.com/quarxband/'}>
                            <InstagramIcon className={"icon"}
                                           color='primary'
                                           style={{fontSize: '4.5vh'}}/>
                        </Link>
                    </MDBNavItem>
                </MDBNavbarNav>
            </MDBNavbar>
        );
    }
}

export default NavBar;