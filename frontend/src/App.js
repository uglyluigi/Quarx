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
import Gallery from "./components/gallery.component";
import {NavLink} from 'react-router-dom';
import {Card, createMuiTheme, makeStyles} from "@material-ui/core";
import {getBaseUrl} from "./common"
import Image from "react-bootstrap/Image";
import banner from './assets/photos/2.jpeg';
import banner2 from './assets/photos/banner.jpg';
import Container from "@material-ui/core/Container";

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
        MuiIcon: {
            root: {
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
    const axios = require('axios');
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
        }
    };

    return (
        <Router>
            <Navbar/>
            <div className={classes.alignment}>
            </div>
            <NavLink to="/" style={{textDecoration: 'none'}} activeStyle={{textDecoration: 'none'}}>
                <div className={"logo"} style={{backgroundColor: '#FFEDD5'}}>
                    <Image src={banner} fluid style={{
                        margin: '2vh',
                        height: '96vh',
                    }}>
                    </Image>
                </div>
                <div style={{
                    backgroundColor: 'black',
                }}>
                    <Image className={"logo"} src={banner2} fluid style={{
                        width: '100vw',
                        marginTop: '1vh',
                        marginBottom: '1vh',
                        opacity: .34,
                    }}>
                    </Image>
                </div>
            </NavLink>
            <Route path="/" exact component={Home}/>
            <Route path="/music" exact component={Music}/>
            <Route path="/merchandise" exact component={Merchandise}/>
            <Route path="/mail" exact component={Mail}/>
            <Route path="/gallery" exact component={Gallery}/>
            <Route path="/login" exact component={Login}/>
            <Route path='/control-panel' render={() => {
                    if (localStorage.token) {
                        let validToken = Promise.resolve(axios.get(`${getBaseUrl()}/api/login/login`, config).then(response => response.status === 200, err => false));

                        if (validToken) {
                            return <ControlPanel/>;
                        } else {
                            return <Redirect to={"/login"}/>;
                        }
                    } else {
                        return <Redirect to={"/login"}/>;
                    }
                }
            }/>
        </Router>
    );
}

export default App;
