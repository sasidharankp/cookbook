import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import RecipeGrid from './components/Layout/RecipeGrid';
import EditRecipeForm from './components/Form/EditRecipeForm';
import { getRecipes } from './actions/recipes';
import useStyles from './styles';
import cookBook from './images/cookbook.png';

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getRecipes());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="xl">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Cook Book</Typography>
        <img className={classes.image} src={cookBook} alt="icon" height="60" />
      </AppBar>
      <Grow in>
        <Container maxWidth="xl">
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={6} md={6} lg={8} xl={9}>
              <RecipeGrid setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
            <EditRecipeForm currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
