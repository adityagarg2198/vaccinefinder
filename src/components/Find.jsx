import React,{useState,} from 'react';
import {Box,Paper,makeStyles,Button,Grid} from '@material-ui/core';
import InputBox from './InputBox';
import {useHistory} from 'react-router-dom';


const useStyles=makeStyles({
    bg:{
        background: 'linear-gradient(to top, #FFFFFF 0%, #FF3300 80%)',
        minHeight:'100vh',
        
    },
    pin:{
        width:'20%',
        margin:'0 auto 2% auto',
        padding:'2% 5%',
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
        width:'90%',
        margin:'0 auto 0 auto',
    },
    head:{
        textAlign:'center',
        color:'#FF3300',
        fontFamily:'Montserrat',
        fontSize:'3rem',
    },
    content:{
        textAlign:'left',
        color:'#4d0000',
        fontFamily:'Montserrat',
        fontSize:'2rem',
        marginLeft:'10%',
        marginBottom:'2%',
    },
    innerbox:{
        marginBottom:'2%',
    }
})



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

    return (
        <>  
            <div className={classes.bg}>
            <Box >
                <Paper className={classes.pin}>
                    <InputBox type="text" name="pin" value={inputdata.pin} func={handledata} title="Enter Pincode" req="true"/>
                    <InputBox type="text" name="date" value={inputdata.date} func={handledata} title="Enter Date in dd-mm-yyyy" req="true"/>
                    <Button onClick={query} className={classes.btn}>GO</Button>
                </Paper>
            </Box>
            {
                
                vdata.map(session=>{
                    return <Grid container spacing={3} className={classes.outerbox}>
                                  <Grid item xs={12} className={classes.innerbox} >  
                                    <Paper>
                                        <Grid container >
                                        <Grid item xs={6} className={classes.box} >
                                            <h2 className={classes.head}>Center Details</h2>
                                            <p className={classes.content}>Center Name: {session.name}</p>
                                            <p className={classes.content}>Center Address: {session.address}</p>
                                            <p className={classes.content}>Available Capacity: {session.available_capacity}</p>
                                            <p className={classes.content}>Fee: {session.fee}</p>
                                            <p className={classes.content}>Age: {session.min_age_limit}</p>
                                        </Grid>
                                        <Grid item xs={6} className={classes.box}>
                                            <h2 className={classes.head}>Vaccine Details</h2>
                                            <p className={classes.content}>Vaccine Name: {session.vaccine}</p>
                                            {session.slots.map(slot=>{
                                                return <p className={classes.content}>Slot: {slot}</p>
                                            })}
                                        </Grid>
                                        </Grid>
                                    </Paper>
                                  </Grid>  
                               </Grid>
                        })
                }
                
            </div>
        </>
    )
}

export default Find;
