import React from 'react';
import {makeStyles,Box,Typography} from '@material-ui/core';
import bg from '../images/bg.svg';
import {NavLink} from 'react-router-dom';

const useStyles = makeStyles((theme)=>({
    bar:{
        textAlign:'center',
    },
    root:{
     backgroundImage:`url(${bg})`,
     minHeight:`100vh`,
     backgroundRepeat: 'no-repeat',
     backgroundSize:'100%',
    [theme.breakpoints.down('xs')]: {
        minHeight:`50vh`,
      },
    [theme.breakpoints.down('sm')]: {
        minHeight:`80vh`,
      },
    },
    title:{
     color:'#ff3300',
     fontFamily:'Montserrat',
     fontSize:'4rem',
     '&:hover':{
        color:'#e62e00',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize:'3rem',
      },
    [theme.breakpoints.down('xs')]: {
        fontSize:'2rem',
      },
    
   },
    link:{
        textDecoration:'none',  
    },
}));

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
