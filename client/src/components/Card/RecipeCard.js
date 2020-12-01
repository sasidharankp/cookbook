import React from 'react';
import { Card, CardHeader,Collapse, Avatar,Chip,IconButton, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core/';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import cookBook from '../../images/defaultRecipeImage.png';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { likeRecipe, deleteRecipe } from '../../actions/recipes';
import useStyles from './styles';

const RecipeCard = ({ recipe, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
      <Card className={classes.card}>
        <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {(recipe.author).charAt(0)}
          </Avatar>
        }action={
          <IconButton aria-label="settings" onClick={() => setCurrentId(recipe._id)}>
            <EditIcon/>
            </IconButton>
        }
        title={recipe.author}
        subheader={moment(recipe.createdAt).fromNow()}
        />
        <CardMedia className={classes.media} image={recipe.selectedFile || cookBook} title={recipe.title} />
        <CardContent>
        {recipe.tags.map((tag) => {return <Chip variant="outlined" color="primary"  size="small" label={`#${tag}`} style={{margin: 1 }}/>})}
        {/* <Chip variant="outlined" color="primary" size="small" 
        label={recipe.tags.map((tag) => `#${tag} `)}
        /> */}
        </CardContent>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{recipe.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{recipe.notes}</Typography>
        </CardContent>

        <CardActions className={classes.cardActions}>
          <IconButton aria-label="like" size="small" color="primary" onClick={() => dispatch(likeRecipe(recipe._id))}><FavoriteIcon fontSize="small" /> Like {recipe.likeCount} </IconButton>
          <IconButton aria-label="share" size="small" color="primary"><ShareIcon /></IconButton>
          <IconButton aria-label="show more" color="primary" className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}><ExpandMoreIcon /></IconButton>
          <IconButton aria-label="delete" size="small" color="primary" onClick={() => dispatch(deleteRecipe(recipe._id))}><DeleteIcon fontSize="small" /> Delete</IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 
          </Typography>
          <Typography paragraph>
            Heat oil in a .
          </Typography>
          <Typography paragraph>
            Add rice 
          </Typography>
          <Typography>
            Set aside 
          </Typography>
        </CardContent>
      </Collapse>
      </Card>
  );
};

export default RecipeCard;
