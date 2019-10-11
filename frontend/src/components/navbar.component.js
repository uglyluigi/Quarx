import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import "../styles/navbar.component.css"

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark navbar-expand-lg">
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/music" className="nav-link">Music</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/mail" className="nav-link">Mail</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/gallery" className="nav-link">Gallery</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/merchandise" className="nav-link">Merchandise</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}