import React, { Component } from 'react';
import {TwitterTimelineEmbed} from "react-twitter-embed";


class TwitterTimelineComponent extends React.Component {
    render() {
        return (<TwitterTimelineEmbed
            sourceType='profile'
            screenName="quarxband"
            options={{height: 1000, width: 1000}}
            theme="dark"
            noScrollbar
            transparent
            linkColor='#2bc29f'
        />);
    }
}

export default TwitterTimelineComponent;