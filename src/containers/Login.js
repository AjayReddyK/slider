import React,{ useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { InputAdornment } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { AccountCircle, PermIdentity, VpnKey, VpnKeyOutlined } from '@material-ui/icons';
import { login } from '../actions/auth';
import './login.css'
import axios from 'axios';
import GoogleSocialAuth from './GoogleSocialAuth';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

//curly braces if logic present else () to directly return
const Login = ({login, isAuthenticated}) => {
    const classes = useStyles();

    const [formData,setFormData] = useState({
        email:'',
        password:''
    });

    const {email,password} = formData;

    const onChange = e => setFormData({ ...formData,[e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        //login function(email,password)
        login(email,password);
    };

    // const continueWithGoogle = async() => {
    //     try{
    //         const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=http://localhost:8000`)
    //         window.location.replace(res.data.authorization_url);
    //     } catch(err){

    //     }
    // };

    //is user authenticated?
    //redirect to homepage
    if(isAuthenticated){
        return <Redirect to='/' />
    }

    return(
        <Container component="main" maxWidth="xs" className="bakgroundimg">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
            <Typography component="h1" variant="h5">
                Log In
            </Typography>
            <form onSubmit={e => onSubmit(e)} className={classes.form}>
                <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                className=" form-control inputcolor"
                placeholder="Username/Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <PermIdentity  className="icon"/>
                    </InputAdornment>
                    ),
                }}
                onChange={ e => onChange(e)}
                required
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    placeholder="Password"
                    type="password"
                    id="password"
                    className="form-control inputcolor"
                    autoComplete="current-password"
                    value={password}
                    minLength='6'
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <VpnKeyOutlined />
                        </InputAdornment>
                        ),
                    }}
                    onChange={ e => onChange(e)}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign In
                </Button>
            </form>
            {/* Continue with google */}
            <GoogleSocialAuth/>
            <Grid container>
                <Grid item xs>
                    <Link to="/reset-password" variant="body2">
                    Reset Password
                    </Link>
                </Grid>
                <Grid item>
                    <Link to="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
            </Grid>
            </div>
        </Container>
    );
};

//const mapStateToProps = state => ({
    //is authenticated?
//});

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, {login}) (Login);