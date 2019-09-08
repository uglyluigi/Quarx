import React, { Component } from 'react';
import {TwitterTimelineEmbed} from "react-twitter-embed";


class TwitterTimelineComponent extends React.Component {
    render() {
        return (<TwitterTimelineEmbed
            sourceType='profile'
            screenName="GamerPres2020"
            options={{height: 600, width: 500}}
            theme="dark"
            noScrollbar
            linkColor='#2bc29f'
        />);
    }
}

export default TwitterTimelineComponent;