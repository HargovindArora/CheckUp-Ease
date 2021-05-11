import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function BetterAlert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Signup = (props)=> {
  const classes = useStyles();
  const [name, setName] = React.useState("");
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState(null);
  const [snackbar, setSnackbar] = React.useState(false);

  const signUpHandler = () => {
    setMessage(null);
    if (!name.length || !username.length || !password.length) {
      setMessage("Important fields missing!")
      return;
    }
      axios.post('/api/signup', {
        name: name,
        username: username,
        password: password
      }).then(response => {
        setSnackbar(true);
      }).catch(error => {
        console.log(error);
        setMessage("Oh, looks like someone has already registered with this Username. Please sign in");
        return;
      })
  }

  const handleCloseSnackBar = () => {
    setSnackbar(false);
    setTimeout(function () {
    }.bind(this, 2000))
  }

  const nameHandler = (event) => {
    setName(event.target.value);
    setMessage(null);
  }

  const userNameHandler = (event) => {
    setUserName(event.target.value);
    setMessage(null);
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value);
    setMessage(null);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Sign up
        </Typography>
        <div style={{ marginTop: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                value={name}
                id="name"
                label="name"
                onChange={nameHandler}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userName"
                value={username}
                label="username"
                name="username"
                onChange={userNameHandler}
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                value={password}
                type="password"
                id="password"
                onChange={passwordHandler}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              {message ? <Alert severity="error">{message}</Alert> : null}
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signUpHandler}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
          <Snackbar open={snackbar} autoHideDuration={3000} onClose={handleCloseSnackBar}>
            <BetterAlert onClose={handleCloseSnackBar} severity="success">
              Sign Up successful. Successfully registered!
            </BetterAlert>
          </Snackbar>
        </div>
      </div>
    </Container>
  );
}