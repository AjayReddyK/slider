import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../actions/auth';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { InputAdornment } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle, PermIdentity, VpnKey, VpnKeyOutlined } from '@material-ui/icons';

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


const ResetPassword = ({ reset_password }) => {
    const classes = useStyles();

    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        reset_password(email);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Redirect to='/' />
    }

    return(
        <Container component="main" maxWidth="xs" className="bakgroundimg">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Request Reset Password
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Request
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default connect(null, { reset_password })(ResetPassword);