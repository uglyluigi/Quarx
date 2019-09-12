import React, { Component } from 'react';
import {TwitterTimelineEmbed} from "react-twitter-embed";


class TwitterTimelineComponent extends React.Component {
    render() {
        return (<TwitterTimelineEmbed
            sourceType='profile'
            screenName="quarxband"
            options={{height: 1000, width: 700}}
            theme="dark"
            noScrollbar
            linkColor='#2bc29f'
        />);
    }
}

export default TwitterTimelineComponent;