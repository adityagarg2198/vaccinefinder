import React,{useState,} from 'react';
import {Box,Paper,makeStyles,Button,Grid} from '@material-ui/core';
import InputBox from './InputBox';
import {useHistory} from 'react-router-dom';

const array=["No","Data","Found"];
const useStyles=makeStyles((theme)=>({
    bg:{
        background: 'linear-gradient(to top, #FFFFFF 0%, #FF3300 40%)',
        minHeight:'100vh',
        
    },
    pin:{
        margin:'0 auto 2% auto',
        padding:'5% 5%',
        alignItems:'center',
    },
    btn:{
        backgroundColor:'#ff3300',
        color:'white',
        fontFamily:'Montserrat',
        fontSize:'1.2rem',
    },
    box:{
        padding:'3%',
    },
    outerbox:{
        width:'100%',
        margin:'0 auto 0 auto',
    },
    head:{
        textAlign:'center',
        color:'#FF3300',
        fontFamily:'Montserrat',
        fontSize:'2.7rem',
        marginBottom:'5%',
        [theme.breakpoints.down('sm')]: {
            fontSize:'2.5rem',
          },
        [theme.breakpoints.down('xs')]: {
            fontSize:'1.8rem',
          },
    },
    content:{
        textAlign:'left',
        color:'#4d0000',
        fontFamily:'Montserrat',
        fontSize:'1.8rem',
        marginLeft:'10%',
        marginBottom:'2%',
        [theme.breakpoints.down('sm')]: {
            fontSize:'1.5rem',
          },
        [theme.breakpoints.down('xs')]: {
            fontSize:'1rem',
          },
    },
    innerbox:{
        marginBottom:'2%',
    },
    span:{
        color:'#ff4d4d',
    },
    msg:{
        textAlign:'center',
        color:'white',
        fontFamily:'Montserrat',
        fontSize:'2.5rem',
        marginBottom:'2%',
        [theme.breakpoints.down('sm')]: {
            fontSize:'2rem',
          },
        [theme.breakpoints.down('xs')]: {
            fontSize:'1.5rem',
          },
    }
}));



const Find = () => {
    const history=useHistory();
  
    const classes=useStyles();
    const [inputdata,setInputData]=useState({
        pin:"",
        date:"",
    });
    const [vdata,setVdata]=useState([]);
    

    let name,value;
    const handledata=(e)=>{
        name=e.target.name;
        value=e.target.value;
        setInputData({
            ...inputdata,
            [name]:value
        })
    }
    

    const query=async()=>{
        try{
            if(!inputdata.pin||!inputdata.date)
            {
                window.alert("Enter Value");
                history.push('/find');
            }
            else{
                const url=`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${inputdata.pin}&date=${inputdata.date}`;
                const res=await fetch(url,{
                    method:"GET",
                    headers:{
                        Accept:"application/json",
                        "Content-Type":"application/json"
                    },

                })

                const data= await res.json();
                if(!res.status===200){
                    const error=new Error(res.error);
                    throw error;
                }
                setVdata(data.sessions);
                console.log(data);
            }
            
        }catch(err){
            console.log(err);
        }
    }
    let bool=true;
    if(vdata.length===0)
    {
        bool=false;
    }

    return (
        <>  
            <div className={classes.bg}>
            <Grid container >
                <Grid item xs={12} sm={12} md={6} className={classes.pin}>
                    <Paper className={classes.pin} >
                        <InputBox type="text" name="pin" value={inputdata.pin} func={handledata} title="Enter Pincode" req="true"/>
                        <InputBox type="text" name="date" value={inputdata.date} func={handledata} title="Enter Date in dd-mm-yyyy" req="true"/>
                        <Button onClick={query} className={classes.btn}>GO</Button>
                    </Paper>
                </Grid>
            </Grid>
            {  
                bool?vdata.map(session=>{
                        return <Grid container spacing={3} className={classes.outerbox}>
                                  <Grid item xs={12} className={classes.innerbox} >  
                                    <Paper>
                                        <Grid container>
                                        <Grid item xs={12} sm={12} md={7} className={classes.box} >
                                            <h2 className={classes.head}>Center Details</h2>
                                            <p className={classes.content}><span className={classes.span}>Center Name:</span> {session.name}</p>
                                            <p className={classes.content}><span className={classes.span}>Center Address:</span> {session.address}</p>
                                            <p className={classes.content}><span className={classes.span}>Available Capacity:</span> {session.available_capacity}</p>
                                            <p className={classes.content}><span className={classes.span}>Fee:</span> {session.fee}</p>
                                            <p className={classes.content}><span className={classes.span}>Age:</span> {session.min_age_limit}</p>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={5} className={classes.box}>
                                            <h2 className={classes.head}>Vaccine Details</h2>
                                            <p className={classes.content}><span className={classes.span}>Vaccine Name:</span> {session.vaccine}</p>
                                            {session.slots.map(slot=>{
                                                return <p className={classes.content}><span className={classes.span}>Slot:</span> {slot}</p>
                                            })}
                                        </Grid>
                                        </Grid>
                                    </Paper>
                                  </Grid>  
                               </Grid>
                    }):<p className={classes.msg}>No data</p>
                }
                
            </div>
        </>
    )
}

export default Find;
