import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../actions/auth';
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


const ResetPasswordConfirm = ({ match,reset_password_confirm }) => {
    const classes = useStyles();

    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        const uid = match.params.uid;
        const token = match.params.token;

        reset_password_confirm(uid,token,new_password,re_new_password);
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
                    Reset Password
                </Typography>
                <form onSubmit={e => onSubmit(e)} className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="new_password"
                        placeholder="New Password"
                        type="password"
                        id="new_password"
                        className="form-control inputcolor"
                        value={new_password}
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
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="re_new_password"
                        placeholder="Confirm New Password"
                        type="password"
                        id="re_new_password"
                        className="form-control inputcolor"
                        value={re_new_password}
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);