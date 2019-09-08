import '../styles/material-fonts.css'
import '../styles/flex-column-layout.css'
import '../styles/style-home-component.css'
import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import TwitterTimelineComponent from './twitter.component'

export default class Home extends Component {

    render() {
        return (
            <div>
                <div>
                    <h3>Home</h3>

                    <p>Quarx is a band based in Baton Rouge, Louisiana.<br/>They make things like:<br/> </p>
                    <ul>
                        <li>Music</li>
                        <li>Friends</li>
                        <li>Music (mostly music)</li>
                    </ul>
                </div>

            <div className={'row'}>
                <div className={'column'}>
                    Pls
                </div>

                <div className={'column'}>
                    <TwitterTimelineComponent/>
                </div>
            </div>



            </div>

        );
    }
}