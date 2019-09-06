import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/music" className="nav-link">Music</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/merchandise" className="nav-link">Merchandise</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/mail" className="nav-link">Mail</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}