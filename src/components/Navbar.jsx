import React from 'react';
import {AppBar,Toolbar,Typography,makeStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
    root:{
     backgroundColor:'#ff3300',
     padding:'1%',
    },
     title:{
     fontFamily:'Montserrat',
     color:'white',
   },
   link:{
    textDecoration:'none',  
},
});
const Navbar = () => {
    const classes=useStyles();
    return (
        <>
            <AppBar position="static" className={classes.root}>
                <Toolbar variant="dense">
                    <Link to="/" className={classes.link}> 
                    <Typography className={classes.title}variant="h3" color="inherit">
                        Vaccine Tracker
                    </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
