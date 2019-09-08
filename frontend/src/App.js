import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import "./styles/style-site-header.css"
import "./styles/anim-rainbow-text-effect.scss"

import Navbar from "./components/navbar.component"
import Home from "./components/home.component"
import Music from "./components/music.component"
import Merchandise from "./components/merchandise.component"
import Mail from "./components/mail.component"
import ReactDOM from 'react-dom';
import TwitterTimelineComponent from "./components/twitter.component";
import {TwitterTimelineEmbed} from "react-twitter-embed";

function App() {
    return (
        <Router>
            <div className="quarx-header-text">
                <h1 className={"animated"}>
                    Quarx
                </h1>

            </div>

            <div className="pt-under-logo">
                <Navbar className="pt-5"/>
                <br/>

                <Route path="/" exact component={Home}/>
                <Route path="/music" exact component={Music}/>
                <Route path="/merchandise" exact component={Merchandise}/>
                <Route path="/mail" exact component={Mail}/>

            </div>
        </Router>
    );
}

export default App;
