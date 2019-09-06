import React from 'react';
import {  BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component"
import Home from "./components/home.component"
import Music from "./components/music.component"
import Merchandise from "./components/merchandise.component"
import Mail from "./components/mail.component"

function App() {
    return (
        <Router>

        <div className="p-3 mb-2 bg-dark text-white ">

        <div className="p-3 mb-2 page-header">
        <h1>Quarx</h1>
        </div>


        <Navbar className="p-3 mb-2" />
        <br/>

        <Route path="/" exact component={Home} />
    <Route path="/music" exact component={Music} />
    <Route path="/merchandise" exact component={Merchandise} />
    <Route path="/mail" exact component={Mail} />
    </div>
    </Router>
);
}

export default App;
