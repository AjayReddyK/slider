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
import { InputAdornment,IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { CategoryOutlined,VisibilityOutlined, VisibilityOff,EmailOutlined, PermIdentity, PhoneIphoneOutlined, Public, VpnKeyOutlined, VisibilityOffOutlined, Check, Clear } from '@material-ui/icons';
import { AccountCircle, VpnKey} from '@material-ui/icons';
import Box from '@material-ui/core/Box';
import { signup } from '../actions/auth';
import './login.css'
import axios from 'axios';

import GoogleSocialAuth from './GoogleSocialAuth';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          SlideR
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

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
const Signup = ({signup, isAuthenticated}) => {
    const [accountCreated, setAccontCreated] = useState(false);

    const[show,setShow] = useState(false);
    const classes = useStyles();

    const [formData,setFormData] = useState({
        first_name:'',
        last_name:'',
        email:'',
        phone:'',
        country:'',
        category:'',
        password:'',
        re_password:'',
    });

    const {first_name,last_name,phone,country,category,email,password,re_password} = formData;

    const onChange = e => setFormData({ ...formData,[e.target.name]: e.target.value});

    const handleshoHide = ()  => {
        setShow(!show);
    }

    const onSubmit = e => {
        e.preventDefault();

        //signup function(email,password)
        if(password!=re_password)
        {
            window.alert("Please check password and re-password should be same");
        }
        if(password.length<8){
            window.alert("Min password length is 8 characters and should contain special char,uppercase,lowercase and a digit");
        }
        
        if((password == re_password) && (password.length>8)){
            signup(first_name,last_name,phone,country,category,email,password,re_password);
            setAccontCreated(true);
        }
    };

    // const continueWithGoogle = async() => {
    //     try{
    //         const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=http://slidertest321.com`)
    //         window.location.replace(res.data.authorization_url);
    //     } catch(err){

    //     }
    // };

    //is user authenticated?
    //redirect to homepage

    if(isAuthenticated){
        return <Redirect to='/' />
    }
    if(accountCreated){
        return <Redirect to='/login' />
    }

    return(
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form onSubmit={e => onSubmit(e)} className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                className="inputcolor"
                                autoComplete="fname"
                                name="first_name"
                                variant="outlined"
                                required
                                fullWidth
                                id="first_name"
                                placeholder="First Name*"
                                autoFocus
                                value={first_name}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <PermIdentity />
                                    </InputAdornment>
                                    ),
                                }}
                                onChange={ e => onChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                className="inputcolor"
                                variant="outlined"
                                required
                                fullWidth
                                id="last_name"
                                placeholder="Last Name*"
                                name="last_name"
                                autoComplete="lname"
                                value={last_name}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <PermIdentity />
                                    </InputAdornment>
                                    ),
                                }}
                                onChange={ e => onChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className="inputcolor"
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                placeholder="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailOutlined/>
                                    </InputAdornment>
                                    ),
                                }}
                                onChange={ e => onChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                className="inputcolor"
                                autoComplete="phone"
                                name="phone"
                                variant="outlined"
                                required
                                fullWidth
                                id="phone"
                                placeholder="Phone*"
                                value={phone}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneIphoneOutlined />
                                    </InputAdornment>
                                    ),
                                }}
                                onChange={ e => onChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            className="inputcolor"
                            autoComplete="country"
                            name="country"
                            variant="outlined"
                            required
                            fullWidth
                            id="country"
                            placeholder="Country*"
                            value={country}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <Public/>
                                </InputAdornment>
                                ),
                            }}
                            onChange={ e => onChange(e)}
                        />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className="inputcolor"
                                variant="outlined"
                                required
                                fullWidth
                                id="category"
                                placeholder="Category*"
                                name="category"
                                autoComplete="category"
                                value={category}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <CategoryOutlined/>
                                    </InputAdornment>
                                    ),
                                }}
                                onChange={ e => onChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className="inputcolor"
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                placeholder="Create Password*"
                                type="password"
                                id="password"
                                value={password}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKeyOutlined/>
                                    </InputAdornment>
                                    ),
                                    endAdornment:(
                                        <InputAdornment position="start">
                                            {/* {
                                                show ? (
                                                    <VisibilityOffOutlined onClick={handleshoHide} id="show_hide"/>
                                                ) :
                                                (
                                                    <VisibilityOutlined onClick={handleshoHide} id="show_hide"/>
                                                )
                                            } */}
                                        </InputAdornment>
                                    )
                                }}
                                onChange={ e => onChange(e)}
                            />
                            
                        </Grid>
                        {/* <div className="passvalidation">
                            <p id="capital" className="mt-2 mb-2">
                                <Check className="iconsize checkk icon"/>
                                <Clear className="iconsize clearr icon"/>
                                <span className="size">Capital Letters</span>
                            </p>
                            <p id="char" className=" mb-2">
                                <Check className="iconsize checkk icon"/>
                                <Clear className="iconsize clearr icon"/>
                                <span className="size">Special Characters</span>
                            </p>
                            <p id="num" className=" mb-2">
                                <Check className="iconsize checkk icon"/>
                                <Clear className="iconsize clearr icon"/>
                                <span className="size">Numbers</span>
                            </p>
                            <p id="more8" className=" mb-2">
                                <Check className="iconsize checkk icon"/>
                                <Clear className="iconsize clearr icon"/>
                                <span className="size">8+ Characters</span>
                            </p>
                        </div> */}
                        <Grid item xs={12}>
                            <TextField
                                className="inputcolor"
                                variant="outlined"
                                required
                                fullWidth
                                name="re_password"
                                placeholder="Confirm Password"
                                type="password"
                                id="password"
                                value={re_password}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKeyOutlined/>
                                    </InputAdornment>
                                    ),
                                }}
                                onChange={ e => onChange(e)}                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                </form>
                {/* Continue with google */}
                <GoogleSocialAuth/>                
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link to="/login" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
    </Container>
    );
};

//const mapStateToProps = state => ({
    //is authenticated?
//});

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, {signup}) (Signup);
