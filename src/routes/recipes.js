import express from 'express';
import { getAllRecipes, getRecipe, createRecipe, updateRecipe, likeRecipe, deleteRecipe} from '../controllers/recipes.js';

const router = express.Router();

router.get('/', getAllRecipes);
router.get('/:id', getRecipe);
router.post('/', createRecipe);
router.patch('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);
router.patch('/:id/likeRecipe', likeRecipe);

export default router;
