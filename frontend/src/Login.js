import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import {createMuiTheme} from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import {grey} from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette:{
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
        MuiLink:{
            root:{
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

const useStyles = makeStyles({
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
        color : 'grey',
    },
    inputColor: {
        color : 'grey',
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

export default function SignIn() {
    const classes = useStyles();
    return (
        <Container maxWidth="xs">
            <div className={classes.alignment}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form}>
                    <ThemeProvider theme={theme}>
                    <TextField
                        label="label"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
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
                            }}}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
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
                            }}}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid>
                            <Link href="#" color="secondary">
                                {"Sign Up"}
                            </Link>
                    </Grid>
                </ThemeProvider>
                </form>
            </div>
        </Container>
    );
}