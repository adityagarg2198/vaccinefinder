import React from 'react';
import {makeStyles,Box,Typography} from '@material-ui/core';
import bg from '../images/bg.svg';
import {NavLink} from 'react-router-dom';

const useStyles = makeStyles({
    bar:{
        textAlign:'center',
    },
    root:{
     backgroundImage:`url(${bg})`,
     minHeight:`100vh`,
     backgroundRepeat: 'no-repeat',
     backgroundSize:'100%',
    },
     title:{
     color:'#ff3300',
     fontFamily:'Montserrat',
     fontSize:'4rem',
     '&:hover':{
        color:'#e62e00',
    },
   },
    link:{
        textDecoration:'none',  
    },
});

const Home = () => {
    const classes=useStyles();
    return (
        <>
          <Box className={classes.bar}>
            <NavLink className={classes.link} to="/find">
              <Typography variant="p" className={classes.title}>
                    Find Vaccine
               </Typography>
            </NavLink>
           </Box>
            
           <Box className={classes.root}>
           </Box>
           
        </>
           
    )
}

export default Home
