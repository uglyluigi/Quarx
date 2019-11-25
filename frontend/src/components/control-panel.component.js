import React from 'react';
import {EditorState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import {Redirect} from 'react-router-dom';
import {getBaseUrl} from "../common";

export default class ControlPanel extends React.Component {

    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);

        this.state = {
            doLoad: false
        }
    }

    render() {
        if (this.state.doLoad) {
            return (
                <Editor
                    editorState={EditorState.defaultEditorState}
                    toolbarClassName={"HTMLEditorToolbar"}
                    wrapperClassName={"HTMLEditorWrapper"}
                    editorClassName={"HTMLEditor"}/>
            );
        } else {
            return (<Redirect to={"/"}/>);
        }
    }

    componentDidMount() {
        const axios = require('axios');
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            }
        };

        axios.get(getBaseUrl() + "/api/login/login", config).then(response => {
            console.log(response);

            if (response.status === 200) {
                this.setState({doLoad: true});
            } else {
                this.setState({doLoad: false});
            }
        }, err => {
            this.setState({doLoad: false});
            console.log(err);
        });
    }
}
