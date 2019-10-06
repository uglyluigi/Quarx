import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {createMuiTheme, makeStyles} from "@material-ui/core/styles";
import {ThemeProvider, withStyles} from "@material-ui/styles";
import {PropTypes} from 'prop-types';
import {getBaseUrl, runCallbackIfThere} from '../common';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import {amber, green} from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';

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

const useStyles1 = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

function SnackbarContentWrapper(props) {
    const classes = useStyles1();
    const {className, message, onClose, variant, open, ...other} = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={clsx(classes.icon, classes.iconVariant)}/>
                    {message}
                </span>
            }
            open={open}
            {...other}
        />
    );
}

SnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};

const useStyles2 = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

export function CustomizedSnackbars(props) {
    const classes = useStyles2();
    let {message, open, variant} = props;

    /**
     *  variant for snackbar = success, warning, error, or info
     */

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
            >
                <SnackbarContentWrapper
                    variant={variant}
                    message={message}
                />
            </Snackbar>
        </div>
    );
}

export class MailComponent extends React.Component {
    constructor(props) {
        super(props);

        this.handleUserInput = this.handleUserInput.bind(this);
        this.validateField = this.validateField.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.onLoseFocus = this.onLoseFocus.bind(this);
        this.flashSnackBar = this.flashSnackBar.bind(this);

        this.state = {
            email: '',
            phoneNumber: '',
            emailValid: false,
            phoneNumberValid: false,
            phoneNumberError: false,
            emailError: false,
            formValid: false,
            showSnackBar: false,
            snackBarMessage: '',
            snackBarVariant: 'info'
        }
    }

    handleUserInput(e) {
        e.preventDefault();

        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]: value}, () => {
            this.validateField(name, value);
        })
    }

    /**
     *
     * @param name
     * @param value
     * @param callback the function called with the result of the verification of whatever field is specified.
     */
    validateField(name, value, callback) {
        let emailValid = this.state.emailValid;
        let phoneValid = this.state.phoneNumberValid;

        console.log(`${name} => ${value}`);

        switch (name) {
            case "email":
                let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                emailValid = regex.test(value.toLowerCase());
                runCallbackIfThere(callback, emailValid);
                break;
            case "phoneNumber":
                if (value.length === 0) {
                    phoneValid = true;
                    runCallbackIfThere(callback, true);
                    return;
                }

                let pn_obj;

                try {
                    pn_obj = phoneUtil.parse(value, 'US');
                } catch (e) {
                    phoneValid = false;
                    runCallbackIfThere(callback, false);
                    return;
                }

                phoneValid = phoneUtil.isValidNumber(pn_obj);
                runCallbackIfThere(callback, phoneValid);
                break;
        }

        this.setState({emailValid: emailValid, phoneNumberValid: phoneValid}, () => this.validateForm());
    }

    flashSnackBar(variant, message, howLong = 5000) {
        console.log(`Flashing snackbar with variant ${variant}`);
        this.setState({snackBarVariant: variant, snackBarMessage: message, showSnackBar: true});
        setTimeout(() => {
            this.setState({showSnackBar: false});
        }, howLong);
    }

    onSubmit(e) {
        e.preventDefault();
        const axios = require('axios');

        axios.post(getBaseUrl() + "/api/event-messenger", {
            email: this.state.email,
            phone_number: this.state.phoneNumber,
        }).then(response => {
            switch (response.status) {
                case 201:
                    this.flashSnackBar("success", "Thanks for registering!");
                    break;
                case 400:
                    this.flashSnackBar("info", "You\'re already registered!");
                    break;
                default:
                    this.flashSnackBar("error", "An unknown error has occurred. For shame!");
                    break;
            }
        }, err => {
            this.flashSnackBar("error", "An unknown error has occurred. For shame!");
            console.log("Error occurred on submission: " + err);
        });
    }

    onLoseFocus(e) {
        let emailError = this.state.emailError;
        let phoneNumberError = this.state.phoneNumberError;
        const target = e.target.name;

        switch (target) {
            case "email" :
                this.validateField(target, this.state.email);
                emailError = !this.state.emailValid;
                break;
            case "phoneNumber":
                this.validateField(target, this.state.phoneNumber, result => {
                    if (!result) {
                        phoneNumberError = true;
                    }
                });
                break;
        }

        this.setState({emailError: emailError, phoneNumberError: phoneNumberError});
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && (this.state.phoneNumberValid || this.state.phoneNumber.length === 0)})
    }

    render() {
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
                        <ThemeProvider theme={theme} uiTheme={theme}>
                            <TextField
                                onChange={this.handleUserInput}
                                error={this.state.emailError}
                                onBlur={this.onLoseFocus}
                                autoFocus
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
                            <TextField
                                onChange={this.handleUserInput}
                                error={this.state.phoneNumberError}
                                onBlur={this.onLoseFocus}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="phoneNumber"
                                label="Phone Number"
                                name="phoneNumber"
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
                                onClick={this.handleClick}
                            >
                                Sign Up
                            </Button>
                            <CustomizedSnackbars variant={this.state.snackBarVariant}
                                                 message={this.state.snackBarMessage} open={this.state.showSnackBar}/>
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
