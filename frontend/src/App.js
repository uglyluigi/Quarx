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
import {getBaseUrl} from "./service"
const axios = require('axios');

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#171717',
        },
        secondary: {
            main: '#282c34',
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
    }
});

const useStyles = makeStyles({
    '@global': {
        body: {
            backgroundColor: theme.palette.primary.main,
        },
    },
    alignment: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
            <NavLink to="/" style={{textDecoration: 'none'}} activeStyle={{textDecoration: 'none'}}>
                <div className="wrapper">
                    <div className={"title"} data-text={"Quarx"}>
                        Quarx
                    </div>
                </div>
            </NavLink>
            <Navbar/>
            <br/>
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
