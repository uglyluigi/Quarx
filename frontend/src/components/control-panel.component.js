import React from 'react';
import {Container} from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';

export default class ControlPanel extends React.Component {
    render() {
        return (
            <Container maxWidth={"xs"}>
                <Typography>
                    <h1>Yeet haw</h1>
                </Typography>
            </Container>
        );
    }
}
