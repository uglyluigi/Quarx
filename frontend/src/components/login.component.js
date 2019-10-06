import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import {withStyles} from '@material-ui/styles';
import {PropTypes} from 'prop-types';
import {getBaseUrl} from '../service';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#171717',
        },
        secondary: {
            main: '#2bc29f',
        },
    },
    overrides: {
        MuiLink: {
            root: {
                color: 'white',
            }
        },
        MuiInputLabel: {
            root: {
                color: 'white',

                "&$focused": {
                    color: 'white'
                }
            }
        },
    }
});
const useStyles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.primary.main,
        },
    },
    alignment: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#282c34",
    },
    form: {
        marginTop: theme.spacing(1),
    },
    labelColor: {
        color: 'grey',
    },
    inputColor: {
        color: 'grey',
    },
    focused: {
        color: 'white',
    },
    outline: {
        borderWidth: '1px',
        borderColor: 'white !important'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: 'white'
    },
});

export class LoginComponent extends React.Component {
    constructor (props) {
        super(props);

        this.handleUserInput = this.handleUserInput.bind(this);
        this.validateField = this.validateField.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            formErrors: {username: '', password: ''},
            usernameValid: false,
            passwordValid: false,
            formValid: false,
            goodResponse: true
        }
    }

    handleUserInput (e) {
        e.preventDefault();

        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]: value}, () => {
            this.validateField(name, value);
        });
    }

    validateField (name, value) {
        let fieldValidationErrors = this.state.formErrors;
        let usernameValid = this.state.usernameValid;
        let passwordValid = this.state.passwordValid;

        switch (name) {
            case 'username':
                usernameValid = true;
                break;

            case 'password':
                passwordValid = value.length > 0;
                if (value.length > 0) {
                    passwordValid = true;
                } else {
                    fieldValidationErrors.password = "You must type a password.";
                    passwordValid = false;
                }
                break;

            default:
                console.log("Something weird happened: " + name);
                break;
        }

        this.setState({formErrors: fieldValidationErrors, usernameValid: usernameValid, passwordValid: passwordValid}, () => this.validateForm());
    }

    validateForm () {
        this.setState({formValid: this.state.usernameValid && this.state.passwordValid});
    }

    errorClass (error) {
        return error.length === 0 ? '' : 'has-error';
    }

    onSubmit (event) {
        event.preventDefault();
        const axios = require('axios');

        axios.post(getBaseUrl() + "/api/login/login", {
            username: this.state.username,
            password: this.state.password,
        }).then(response => {
            if (response.status === 200) {
                this.setState({goodResponse: true});
                localStorage.setItem('token', response.data.token);
                this.props.history.push('/../control-panel');
                window.location.reload();
            }
        }, err => {
            if (err.response.status === 401) {
                this.setState({goodResponse: false});
            }
        });
    }

    render () {
        const {classes} = this.props;

        return (
            <Container maxWidth="xs">
                <div className={classes.alignment}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Typography component={'h1'} variant={'h5'} style={{visibility: this.state.goodResponse ? 'hidden' : 'visible'}}>
                        Invalid credentials.
                    </Typography>
                    <form className={classes.form} onSubmit={this.onSubmit}>
                        <ThemeProvider theme={theme}>
                            <TextField
                                onChange={this.handleUserInput}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoFocus
                                InputLabelProps={{
                                    classes: {
                                        root: classes.labelColor,
                                        focused: classes.focused,
                                    },
                                }}
                                InputProps={{
                                    classes: {
                                        root: classes.inputColor,
                                        focused: classes.focused,
                                        notchedOutline: classes.outline,
                                    }
                                }}
                            />
                            <TextField
                                onChange={this.handleUserInput}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                InputLabelProps={{
                                    classes: {
                                        root: classes.labelColor,
                                        focused: classes.focused,
                                    },
                                }}
                                InputProps={{
                                    classes: {
                                        root: classes.inputColor,
                                        focused: classes.focused,
                                        notchedOutline: classes.outline,
                                    }
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                                disabled={!this.state.formValid}
                            >
                                Sign In
                            </Button>
                        </ThemeProvider>
                    </form>
                </div>
            </Container>
        );
    }
}

LoginComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles(theme))(LoginComponent);