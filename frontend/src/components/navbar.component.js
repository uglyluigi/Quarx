import React, {Component} from 'react';
import { MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBCollapse, MDBIcon } from "mdbreact";
import Link from "@material-ui/core/Link";
import "../styles/navbar.component.css";
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

class NavBar extends Component {
    render() {
        return (
                <MDBNavbar className="navbar fixed-top navbar-expand-lg navbar-dark ">
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
                                <MDBNavLink className="waves-effect waves-light" to="#!">
                                    <MDBIcon fab icon="twitter" />
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink className="waves-effect waves-light" to="#!">
                                    <MDBIcon fab icon="google-plus-g" />
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <Link
                                    href={'https://www.facebook.com/Quarxband/'}>
                                    <FacebookIcon
                                        color='secondary'
                                        style={{fontSize: "xx-large"}}/>
                                </Link>
                                <Link
                                    href={'https://twitter.com/quarxband?lang=en'}>
                                    <TwitterIcon
                                        color='secondary'
                                        style={{fontSize: "xx-large"}}/>
                                </Link>
                                <Link
                                    href={'https://www.instagram.com/quarxband/'}>
                                    <InstagramIcon
                                        color='secondary'
                                    style={{fontSize: "xx-large"}}/>
                                </Link>
                            </MDBNavItem>
                        </MDBNavbarNav>
                </MDBNavbar>
        );
    }
}

export default NavBar;