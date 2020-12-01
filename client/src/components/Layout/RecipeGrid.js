import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import RecipeCard from '../Card/RecipeCard';
import useStyles from './styles';

const RecipeGrid = ({ setCurrentId }) => {
  const recipes = useSelector((state) => state.recipes);
  const classes = useStyles();

  return (
    !recipes.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {recipes.map((recipe) => (
          <Grid key={recipe._id} item xs={12} sm={6} md={6} lg={4}>
            <RecipeCard recipe={recipe} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default RecipeGrid;
