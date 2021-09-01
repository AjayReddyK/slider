import React,{useEffect, useState} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import './navbar.css'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
paper1: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  
}));

const Profile = () => {

    const classes = useStyles();
    // APIS Testing
    const [profile,setProfile] = useState([]);    

        useEffect(() => {
            const fetchProfile = async () => {
              const res = await axios.get('http://localhost:8000/api/userdata/', { headers: {'Authorization': `JWT ${localStorage.getItem('access')}`} });
              setProfile(res.data);
              console.log("profile api data",res.data);
              console.log("profile const data",profile);
            };
        
            fetchProfile();
        }, []);        

        // apis test end

    return(
        <>
            
            <Container component="main" maxWidth="xs">
            <CssBaseline />
                <div className={classes.paper1}>
            <label className="p-2 mr-3 title text-center">Profile</label>
            <div className="contain">
            <div className="text-center profilecontainer">
                {/* <table>
                    <tr>
                        <td className="label">First Name :</td>
                        <td className="answer" key={profile.id}>{profile.first_name}</td>
                    </tr>
                    <tr>
                        <td className="label">Email :</td>
                        <td className="answer" key={profile.id}>{profile.email}</td>
                    </tr>
                </table> */}
                <div className="d-flex flex-row card">
                    <div className="label">
                        First Name :
                    </div>
                    <div className="answer" key={profile.id}>
                        {profile.first_name}
                    </div>
                </div>
                <div className="d-flex flex-row card">
                    <div className="label">
                        Last Name :
                    </div>  
                    <div className="answer" key={profile.id} >
                        {profile.last_name}
                    </div> 
                </div>
                <div className="d-flex flex-row card"> 
                    <div className="label">
                        Email :
                    </div> 
                    <div className="answer" key={profile.id}>
                        {profile.email}
                    </div> 
                </div>
                <div className="d-flex flex-row card">
                    <div className="label">
                        Phone :
                    </div>   
                    <div className="answer" key={profile.id}>
                        {profile.phone}
                    </div>
                </div>
                <div className="d-flex flex-row card">
                    <div className="label">
                        Country :
                    </div>
                    <div className="answer" key={profile.id}>
                        {profile.country}
                    </div>
                </div>
                <div className="d-flex flex-row card">
                    <div className="label">
                        Category :
                    </div>  
                    <div className="answer" key={profile.id}>
                        {profile.category}
                    </div>            
                </div>
            </div>
            </div>
            </div>
            </Container>
        </>
    );
}

export default Profile;