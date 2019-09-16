import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { } from '@material-ui/icons'

import LoginCard from './LoginCard';

const useStyles = makeStyles(theme => ({
  image: {
    width: '100%'
  },
}));

export default function Login() {
  const classes = useStyles();

  return (
    <Container style={{ height: '80vh' }}>
      <Grid container direction="row" justify="center" alignItems="center" style={{ height: '100%' }}>
        <Grid item xs={5}>
          <LoginCard />
        </Grid>
        <Grid item xs={7}>
          <img className={classes.image} src={process.env.PUBLIC_URL + 'img/welcome.png'} />
        </Grid>
      </Grid>
    </Container>
  )
}