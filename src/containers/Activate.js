import React,{ useState } from 'react';
import { Redirect } from 'react-router-dom';
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
import { verify } from '../actions/auth';
import './login.css'


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
const Activate = ({verify,match}) => {
    const classes = useStyles();

    const [verified,setVerified] = useState(false);
    const verify_account = e => {
        const uid = match.params.uid;
        const token = match.params.token;

        //login function(email,password)
        verify(uid,token);
        setVerified(true);
    };

    //is user authenticated?
    //redirect to homepage

    if(verified){
        return <Redirect to='/' />
    }

    return(
        <Container component="main" maxWidth="xs" className="bakgroundimg">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Verify your Account
                </Typography>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={verify_account}
                >
                    Request
                </Button>
            </div>
        </Container>
    );
};

//const mapStateToProps = state => ({
    //is authenticated?
//});

export default connect(null, {verify}) (Activate);