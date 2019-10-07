import '../styles/material-fonts.css'
import '../styles/home-component.css'
import React, {Component} from 'react';
import TwitterTimelineComponent from "./twitter.component";
import {NavLink} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import image1 from '../assets/photos/31.jpg'
import image2 from '../assets/photos/2.jpeg'
import image3 from '../assets/photos/1.jpg'

const images = [
    {
        url: image1,
        link: '/music',
        title: 'Music',
        width: '80%',
    },
    {
        url: image2,
        link: '/mail',
        title: 'Mailing list',
        width: '80%',
    },
    {
        url: image3,
        link: '/merchandise',
        title: 'Merch',
        width: '80%',
    },
];

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        minWidth: 300,
        width: '100%',
    },
    image: {
        position: 'relative',
        height: 700,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important',
            height: '100% !important',
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
        backgroundSize: 'cover',
        backgroundPosition: 'center 100%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.6,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 90px)',
        transition: theme.transitions.create('opacity'),
    },
}));

export function ButtonBases() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {images.map(image => (
                <ButtonBase
                    focusRipple
                    key={image.title}
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    style={{
                        width: image.width,
                    }}
                >
                    <NavLink to={image.link} style={{textDecoration: 'none'}} activeStyle={{textDecoration: 'none'}}>
          <span
              className={classes.imageSrc}
              style={{
                  backgroundImage: `url(${image.url})`,
              }}
          />

                        <span className={classes.imageBackdrop}/>
                        <span className={classes.imageButton}>

            <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
            >
              {image.title}
                <span className={classes.imageMarked}/>
            </Typography>

          </span>
                    </NavLink>

                </ButtonBase>


            ))}
        </div>
    );
}

export default class Home extends Component {
    render() {
        return (
            <ButtonBases/>
        );
    }
}