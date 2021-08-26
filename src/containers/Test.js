import React,{useEffect, useState} from 'react'
import { connect } from 'react-redux'; 

const Test = ({isAuthenticated}) => {
    const [profile,setProfile] = useState([]);
    const [uploads,setUploads] = useState([]);

        useEffect(() => {
            const fetchProfile = async () => {
              const res = await axios.get('http://localhost:8000/api/userdata/', { headers: {'Authorization': `JWT ${localStorage.getItem('access')}`} });
              setProfile(res.data);
              console.log("profile api data",res.data);
              console.log("profile const data",profile);
            };
        
            fetchProfile();
        }, []);

        useEffect(() => {
            const fetchUploads = async () => {
              const res = await axios.get('http://localhost:8000/api/uploadedfiles/', { headers: {'Authorization': `JWT ${localStorage.getItem('access')}`} });
              setUploads(res.data);
              console.log("upload api data",res.data);
              console.log("uploads const data",uploads);
            };
        
            fetchUploads();
        }, []);
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Test);