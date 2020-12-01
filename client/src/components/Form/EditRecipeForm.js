import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createRecipe, updateRecipe } from '../../actions/recipes';

const EditRecipeForm = ({ currentId, setCurrentId }) => {
  const [recipeData, setRecipeData] = useState({ author: '', title: '', notes: '', tags: '', selectedFile: '' });
  const recipe = useSelector((state) => (currentId ? state.recipes.find((notes) => notes._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (recipe) setRecipeData(recipe);
  }, [recipe]);

  const clear = () => {
    setCurrentId(0);
    setRecipeData({ author: '', title: '', notes: '', tags: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createRecipe(recipeData));
      clear();
    } else {
      dispatch(updateRecipe(currentId, recipeData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${recipe.title}"` : 'Create a Recipe'}</Typography>
        <TextField name="author" variant="outlined" label="Author" fullWidth value={recipeData.author} onChange={(e) => setRecipeData({ ...recipeData, author: e.target.value })} />
        <TextField name="title" variant="outlined" label="Title" fullWidth value={recipeData.title} onChange={(e) => setRecipeData({ ...recipeData, title: e.target.value })} />
        <TextField name="notes" variant="outlined" label="Notes" fullWidth multiline rows={4} value={recipeData.notes} onChange={(e) => setRecipeData({ ...recipeData, notes: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={recipeData.tags} onChange={(e) => setRecipeData({ ...recipeData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}>
          <label htmlFor="contained-button-file">
            <Button startIcon={<PhotoCamera />} variant="outlined" color="primary" size="small"  className={classes.buttonSubmit}>
              <FileBase type="file" style={{display: "none"}} multiple={false} onDone={({ base64 }) => setRecipeData({ ...recipeData, selectedFile: base64 })} />
                Upload
            </Button>
          </label>
    </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default EditRecipeForm;
