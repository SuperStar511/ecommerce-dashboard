import React, { Fragment } from "react";
import { Switch, Route, Link, BrowserRouter, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { userSignOutRequest } from './store/actions/auth';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import Avatar from '@material-ui/core/Avatar';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import Orders from './Orders/Orders';
import Home from './Home/Home';
import Inventory from './Inventory/Inventory';
import Settings from './Settings/Settings';
import Board from './Board/Board';
import Login from './Login/Login';
import PrivateRoute from './Common/PrivateRoute';

import './App.css';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    zIndex: 3000,
    boxShadow: '0 10px 20px rgba(0,0,0,0.025), 0 2px 2px rgba(0,0,0,0.05)',
    borderRadius: '0px',
  },
  tab: {
    fontFamily: 'ApercuMedium',
  },
  avatar: {
    position: 'absolute',
    top: '0.35rem',
    left: 'calc(100% - 50px)',
    width: 35,
    height: 35,
    backgroundColor: green[500],
    '&:hover': {
      cursor: 'pointer'
    },
  },
  paper: {
    backgroundColor: '#fff',
    // boxShadow: theme.shadows[5],
    boxShadow: '0 20px 60px -2px rgba(27,33,58,.4)',
    padding: '2em',
    outline: 'none',
    borderRadius: '8px'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'ApercuMedium',
    marginTop: '2em',
    marginBottom: '2em'
  },
  button: {
    boxShadow: 'none',
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700]
    }
  },
  typography: {
    fontFamily: [
      'Apercu',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          border: "2px solid",
          borderColor: blue[200]
        }
      }
    }
  }
});

function App(props) {
  const classes = useStyles();

  const { isAuthenticated } = props.auth;

  const [logoutModal, setLogoutModal] = React.useState(false);

  const RedirectToDashboard = () => (
    <Fragment>
      {isAuthenticated ? <Redirect to="/dashboard/home" /> : null}
    </Fragment>
  )

  const handleLogoutOpen = () => {
    setLogoutModal(true);
  }

  const handleLogoutClose = () => {
    setLogoutModal(false);
  }

  const logout = (e) => {
    e.preventDefault();
    handleLogoutClose();
    props.userSignOutRequest();
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <Route path="/" exact component={Login} />
          <RedirectToDashboard />
          <Route path="/dashboard" render={({ location }) => (
            <Fragment>
              <Paper className={classes.root}>
                <Tabs value={location.pathname} centered indicatorColor="primary" textColor="primary" >
                  <Tab label="Dashboards" value="/dashboard/home" component={Link} to="/dashboard/home" disableRipple className={classes.tab} />
                  <Tab label="Board" value="/dashboard/board" component={Link} to="/dashboard/board" disableRipple className={classes.tab} />
                  <Tab label="Orders" value="/dashboard/orders" component={Link} to="/dashboard/orders" disableRipple className={classes.tab} />
                  <Tab label="Inventory" value="/dashboard/inventory" component={Link} to="/dashboard/inventory" disableRipple className={classes.tab} />
                  <Tab label="Settings" value="/dashboard/settings" component={Link} to="/dashboard/settings" disableRipple className={classes.tab} />
                </Tabs>
              </Paper>
              <Switch>
                <Route path="/dashboard/settings" component={Settings} />
                <Route path="/inventory/wizard" exact render={() => <div>Inventory Wizard</div>} />
                <Route path="/dashboard/inventory" component={Inventory} />
                <Route path="/dashboard/board" component={Board} />
                <Route path="/dashboard/orders" component={Orders} />
                <PrivateRoute path="/dashboard/home" authed={isAuthenticated} component={Home} />
              </Switch>
            </Fragment>
          )}
          />
          {isAuthenticated ? <Avatar className={classes.avatar} onClick={handleLogoutOpen}>BC</Avatar> : null}

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={logoutModal}
            onClose={handleLogoutClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={logoutModal}>
              <div className={classes.paper}>
                <Typography variant="h5" className={classes.title}>Are you sure you want to sign out?</Typography>
                <Box display="flex" justifyContent="flex-end" style={{ marginTop: '2em' }}>
                  <Button color="primary" style={{ marginRight: 10 }} onClick={handleLogoutClose}>
                    Cancel
                  </Button>
                  <Button variant="contained" color="primary" className={classes.button} onClick={logout}>
                    Sign Out
                  </Button>
                </Box>
              </div>
            </Fade>
          </Modal>

        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
  userSignOutRequest: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { userSignOutRequest })(App);
