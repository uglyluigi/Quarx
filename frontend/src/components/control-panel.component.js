import React from 'react';
import {EditorState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import {Redirect} from 'react-router-dom';
import {getBaseUrl} from "../common";

export default class ControlPanel extends React.Component {

    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);
        this.checkLogin = this.checkLogin.bind(this);

        this.state = {
            doLoad: false,
            checkDone: false,
        }
    }

    render() {
        if (this.state.checkDone) {
            if (this.state.doLoad) {
                return (
                    <div>Login success</div>
                );
            } else {
                return (<Redirect to={"/login"}/>);
            }
        } else {
            return (<div/>);
        }
    }

    componentDidMount() {
        console.log("CHECKING YEET");
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

            this.setState({checkDone: true});
        }, err => {
            this.setState({doLoad: false});
            console.log(err);
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    checkLogin() {

    }
}
