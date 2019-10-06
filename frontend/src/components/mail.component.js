import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider, withStyles} from "@material-ui/styles";
import {PropTypes} from 'prop-types';
import {getBaseUrl} from './../service';
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#171717',
        },
        secondary: {
            main: '#282c34',
        },
    },
    textPrimary: {
        main: 'white',
    },
    overrides: {
        MuiLink: {
            root: {
                color: 'white',
            }
        },
        MuiInputLabel: {
            root: {
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
        backgroundColor: theme.palette.secondary.main,
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
    notchedOutline: {
        borderWidth: '1px',
        borderColor: 'white !important'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: 'white'
    },
});

export class MailComponent extends React.Component {
    constructor (props) {
        super(props);

        this.handleUserInput = this.handleUserInput.bind(this);
        this.validateField = this.validateField.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.onLoseFocus = this.onLoseFocus.bind(this);

        this.state = {
            email: '',
            phoneNumber: '',
            emailValid: false,
            phoneNumberValid: false,
            phoneNumberError: false,
            emailError: false,
            formValid: false
        }
    }

    handleUserInput (e) {
        e.preventDefault();

        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]: value}, () => {
            this.validateField(name, value);
        })
    }

    validateField (name, value) {
        let emailValid = this.state.emailValid;
        let phoneValid = this.state.phoneNumberValid;

        console.log(`${name} => ${value}`);

        switch (name) {
            case "email":
                let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                emailValid = regex.test(value.toLowerCase());
                break;
            case "phoneNumber":
                let pn_obj;

                try {
                    pn_obj = phoneUtil.parse(value, 'US');
                } catch (e) {
                    phoneValid = false;
                    return;
                }

                phoneValid = phoneUtil.isValidNumber(pn_obj);
                break;
        }

        this.setState({emailValid: emailValid, phoneNumberValid: phoneValid}, () => this.validateForm());
    }

    onSubmit (e) {
        e.preventDefault();
        const axios = require('axios');

        axios.post(getBaseUrl() + "/api/event-messenger", {
            email: this.state.email,
            phone_number: this.state.phoneNumber,
        }).then(response => {
            console.log(response);
            //TODO add snackbar for various error cases
        })
    }

    onLoseFocus (e) {
        let emailError = this.state.emailError;
        let phoneNumberError = this.state.phoneNumberError;
        const target = e.target.name;

        switch (target) {
            case "email" :
                this.validateField(target, this.state.email);
                emailError = !this.state.emailValid;
                break;
            case "phoneNumber":
                this.validateField(target, this.state.phoneNumber);
                phoneNumberError = !this.state.phoneNumberValid;
                break;
        }

        this.setState({emailError: emailError, phoneNumberError: phoneNumberError});
    }

    validateForm () {
        this.setState({formValid: this.state.emailValid && this.state.phoneNumberValid})
    }

    render () {
        const {classes} = this.props;

        return (
            <Container maxWidth="xs">
                <div className={classes.alignment}>
                    <Avatar className={classes.avatar}>
                        <MailOutlineIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} onSubmit={this.onSubmit}>
                        <ThemeProvider theme={theme}>
                            <TextField
                                onChange={this.handleUserInput}
                                error={this.state.phoneNumberError}
                                onBlur={this.onLoseFocus}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="phoneNumber"
                                label="Phone Number"
                                name="phoneNumber"
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
                                        notchedOutline: classes.notchedOutline,
                                    }
                                }}
                            />
                            <TextField
                                onChange={this.handleUserInput}
                                error={this.state.emailError}
                                onBlur={this.onLoseFocus}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
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
                                        notchedOutline: classes.notchedOutline,
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
                                Sign Up
                            </Button>
                        </ThemeProvider>
                    </form>
                </div>
            </Container>
        );
    }
}

MailComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles(theme))(MailComponent);
