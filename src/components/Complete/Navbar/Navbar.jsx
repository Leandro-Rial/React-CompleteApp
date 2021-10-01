import React from 'react';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { logout } from '../../../actions/authActions';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
    title: {
      flexGrow: 1
    },
    name: {
        marginRight: '20px'
    },
    toolbar: theme.mixins.toolbar,
    '@media (max-width: 400px)': {
        name: {
            marginRight: '0',
            padding: "10px 0"
        },
    }
  }))

const Navbar = () => {

    const classes = useStyles();

    const dispatch = useDispatch();

    // Call the user's name

    const auth = useSelector(state => state.auth);

    // Logout Function

    const signOutUser = () => {
        try {
          
          dispatch(logout())
    
        } catch {
          Swal.fire('error', 'Oh oh we have a problem here.', 'error')
        }
      }

    return (
        <>
            <AppBar position="fixed" color="secondary" className={classes.appBar}>
                <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    CompleteApp
                </Typography>
                <Typography variant="body1" className={classes.name}>
                    {auth.name}
                </Typography>
                <Button variant="outlined" onClick={signOutUser}>
                    SignOut
                </Button>
                </Toolbar>
            </AppBar>
            <div className={classes.toolbar}></div>
        </>
    )
}

export default Navbar
