import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import "./styles/Quarx-header.scss"
import "./App.css"
import Home from "./components/home.component"
import Music from "./components/music.component"
import Merchandise from "./components/merchandise.component"
import Mail from "./components/mail.component"
import Login from "./components/login.component"
import ControlPanel from "./components/control-panel.component";
import Navbar from "./components/navbar.component"
import {NavLink} from 'react-router-dom';
import {createMuiTheme, makeStyles} from "@material-ui/core";
import {getBaseUrl} from "./common"
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import Link from "@material-ui/core/Link";
import Image from "react-bootstrap/Image";
import banner from './assets/photos/2.jpeg'
const axios = require('axios');

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#171717',
        },
        secondary: {
            main: '#e46645',
        },
    },
    textPrimary: {
        main: 'white',
    },
    overrides: {
        MuiLink: {
            root: {
                color: 'white',
            }
        },
        MuiInputLabel: {
            root: {
                "&$focused": {
                    color: 'white'
                }
            }
        },
        MuiIcon:{
            root:{
                color: 'white !important'
            }
        },

    }
});

const useStyles = makeStyles({
    '@global': {
        body: {
            backgroundColor: theme.palette.primary.main,
        },

    },
    alignment: {
        display: 'flex',
        alignItems: 'left',
    },
});

function App() {
    const classes = useStyles();
    let loggedIn = false;

    if (localStorage.token) {
        loggedIn = axios.get(getBaseUrl() + '/api/login/login', {
            headers: {
                "Authorization": "Bearer " + localStorage.token,
            }
        }).then(response => {
            return response.status === 200;
        });
    }

    return (
        <Router>
            <div className={classes.alignment}>
            <Link
                href={'https://www.facebook.com/Quarxband/'}>
                <FacebookIcon
                    color='secondary'/>
            </Link>
            <Link
                href={'https://twitter.com/quarxband?lang=en'}>
                <TwitterIcon
                    color='secondary'/>
            </Link>
            <Link
                href={'https://www.instagram.com/quarxband/'}>
                <InstagramIcon
                    color='secondary'/>
            </Link>
        </div>
            <div className={"logo"} style={{
                backgroundColor: '#FFEDD5',
            }}>
                <NavLink to="/" style={{textDecoration: 'none'}} activeStyle={{textDecoration: 'none'}}>
                    <Image  src={banner} fluid style={{
                        height: '50vw',
                    }}>
                    </Image>
                </NavLink>
            </div>
            <Navbar/>
            <Route path="/" exact component={Home}/>
            <Route path="/music" exact component={Music}/>
            <Route path="/merchandise" exact component={Merchandise}/>
            <Route path="/mail" exact component={Mail}/>
            <Route path="/login" exact component={Login}/>
            <Route path='/control-panel' render={() => (
                loggedIn ? (<ControlPanel/>) : (<Redirect to={'/login'}/>)
            )}/>
        </Router>
    );
}

export default App;
